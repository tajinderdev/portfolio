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
  { id: 'hero', label: 'Home', href: '/' },
  { id: 'portfolio', label: 'Portfolio', href: '/portfolio' },
  { id: 'about', label: 'About', href: '#about' },
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
    href: 'https://www.linkedin.com/in/tajinder-developer/',
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
    href: 'mailto:imtj.human@gmail.com',
    isExternal: true,
  },
];
