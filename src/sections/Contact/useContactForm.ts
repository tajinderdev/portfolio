import { useState, useCallback, useRef } from 'react';
import {
  defaultContactClient,
  type ContactClient,
} from '@/services/contact/contactClient';

export interface ContactFormValues {
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
  readonly _hp_verify: string;
}

export type ContactFormStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface UseContactFormReturn {
  readonly values: ContactFormValues;
  readonly errors: Partial<Record<keyof ContactFormValues, string>>;
  readonly status: ContactFormStatus;
  readonly statusMessage: string;
  readonly isSubmitting: boolean;
  readonly isSuccess: boolean;
  readonly handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  readonly handleBlur: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  readonly handleSubmit: (e: React.FormEvent) => Promise<void>;
  readonly resetForm: () => void;
}

const INITIAL_VALUES: ContactFormValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
  _hp_verify: '',
};

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function useContactForm(
  client: ContactClient = defaultContactClient
): UseContactFormReturn {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormValues, string>>
  >({});
  const [status, setStatus] = useState<ContactFormStatus>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');

  // Track initial mount time to calculate interaction duration for bot defense
  const mountTimeRef = useRef<number>(Date.now());

  const validateField = useCallback(
    (name: keyof ContactFormValues, value: string): string | undefined => {
      const trimmed = value.trim();

      switch (name) {
        case 'name':
          if (!trimmed) return 'Please provide your name.';
          if (trimmed.length < 2) return 'Name must be at least 2 characters long.';
          if (trimmed.length > 100) return 'Name cannot exceed 100 characters.';
          return undefined;

        case 'email':
          if (!trimmed) return 'Please provide a valid email address.';
          if (trimmed.length > 254) return 'Email address cannot exceed 254 characters.';
          if (!EMAIL_REGEX.test(trimmed))
            return 'Please provide a valid email address.';
          return undefined;

        case 'subject':
          if (trimmed.length > 150) return 'Subject cannot exceed 150 characters.';
          return undefined;

        case 'message':
          if (!trimmed) return 'Please provide a message.';
          if (trimmed.length < 10)
            return 'Message must be at least 10 characters long.';
          if (trimmed.length > 3000)
            return 'Message cannot exceed 3,000 characters.';
          return undefined;

        default:
          return undefined;
      }
    },
    []
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));

      // Clear field error if previously set
      if (errors[name as keyof ContactFormValues]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[name as keyof ContactFormValues];
          return next;
        });
      }
    },
    [errors]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      const fieldError = validateField(name as keyof ContactFormValues, value);
      if (fieldError) {
        setErrors((prev) => ({ ...prev, [name]: fieldError }));
      }
    },
    [validateField]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Validate all required fields
      const newErrors: Partial<Record<keyof ContactFormValues, string>> = {};
      const nameError = validateField('name', values.name);
      if (nameError) newErrors.name = nameError;

      const emailError = validateField('email', values.email);
      if (emailError) newErrors.email = emailError;

      const subjectError = validateField('subject', values.subject);
      if (subjectError) newErrors.subject = subjectError;

      const messageError = validateField('message', values.message);
      if (messageError) newErrors.message = messageError;

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setStatus('idle');
        const firstField = Object.keys(newErrors)[0];
        if (typeof document !== 'undefined' && firstField) {
          const el = document.getElementById(`contact-${firstField}`);
          el?.focus();
        }
        return;
      }

      setStatus('submitting');
      setStatusMessage('');

      try {
        const response = await client.sendContactMessage({
          name: values.name.trim(),
          email: values.email.trim(),
          subject: values.subject.trim() || undefined,
          message: values.message.trim(),
          _hp_verify: values._hp_verify,
          _hp_time: mountTimeRef.current,
        });

        if (response.success) {
          setStatus('success');
          setStatusMessage(response.message);
        } else {
          setStatus('error');
          setStatusMessage(response.message);
          if (response.errors) {
            setErrors(response.errors as Partial<Record<keyof ContactFormValues, string>>);
          }
        }
      } catch {
        setStatus('error');
        setStatusMessage('Unable to send message at this time. Please try again later.');
      }
    },
    [client, validateField, values]
  );

  const resetForm = useCallback(() => {
    setValues(INITIAL_VALUES);
    setErrors({});
    setStatus('idle');
    setStatusMessage('');
    mountTimeRef.current = Date.now();
  }, []);

  return {
    values,
    errors,
    status,
    statusMessage,
    isSubmitting: status === 'submitting',
    isSuccess: status === 'success',
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  };
}
