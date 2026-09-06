/**
 * Global Navigation Configuration
 *
 * Primary navigation items matching .agents/DESIGN_DIRECTION.md
 */

export interface NavigationItem {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly isExternal?: boolean;
}

export const navigationItems: readonly NavigationItem[] = [
  { id: 'work', label: 'Work', href: '#work' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'engineering', label: 'Engineering', href: '#engineering' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export interface SocialLink {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly isExternal: boolean;
}

export const socialLinks: readonly SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/tajinderdev',
    isExternal: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/tajinderdev',
    isExternal: true,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/tajindr_singh_',
    isExternal: true,
  },
  {
    id: 'email',
    label: 'Email',
    href: '#contact',
    isExternal: false,
  },
];
