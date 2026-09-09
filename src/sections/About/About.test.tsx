import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { About } from './About';
import { ProfileCard } from './ProfileCard';
import { CorePrinciples } from './CorePrinciples';
import { SystemThinkingTrace } from './SystemThinkingTrace';
import { EngineeringPillars } from '../Approach/EngineeringPillars';
import { getPortfolioContent } from '@/content';

describe('About & Engineering Philosophy Section', () => {
  const content = getPortfolioContent();

  it('renders the complete composite About section within an anchored section', () => {
    const { container } = render(<About profile={content.profile} />);
    const section = container.querySelector('section#about');
    expect(section).toBeInTheDocument();

    expect(screen.getByText('01 / ENGINEERING PHILOSOPHY')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /systems over silos\. root causes over symptoms\./i,
      }),
    ).toBeInTheDocument();
  });

  describe('ProfileCard Component', () => {
    it('renders Tajinder Singh identity, senior title, and approved portrait', () => {
      render(<ProfileCard profile={content.profile} />);

      expect(screen.getByRole('heading', { name: 'Tajinder Singh' })).toBeInTheDocument();
      expect(screen.getByText('7+ EXP')).toBeInTheDocument();

      const image = screen.getByRole('img', {
        name: /tajinder singh - senior software engineer/i,
      });
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', '/images/face.webp');

      // International delivery presence
      ['US', 'UK', 'Canada', 'Australia', 'Europe'].forEach((country) => {
        expect(screen.getByText(country)).toBeInTheDocument();
      });

      // Engineering perspective
      expect(
        screen.getByText(/AI improves speed and capability, while architecture/i),
      ).toBeInTheDocument();
    });

    it('renders cross-functional delivery disciplines', () => {
      render(<ProfileCard profile={content.profile} />);
      expect(screen.getByText('Developers and technical leads')).toBeInTheDocument();
      expect(screen.getByText('UI/UX designers')).toBeInTheDocument();
      expect(screen.getByText('QA engineers and SDETs')).toBeInTheDocument();
      expect(screen.getByText('Infrastructure and DevOps teams')).toBeInTheDocument();
    });
  });

  describe('CorePrinciples Component', () => {
    it('renders all 8 engineering principles with indices', () => {
      render(<CorePrinciples principles={content.profile.principles} />);

      expect(screen.getByText('[ 01 — 08 ]')).toBeInTheDocument();
      expect(screen.getByText('Understand deeply.')).toBeInTheDocument();
      expect(screen.getByText('Design deliberately.')).toBeInTheDocument();
      expect(screen.getByText('Build cleanly.')).toBeInTheDocument();
      expect(screen.getByText('Test thoroughly.')).toBeInTheDocument();
      expect(screen.getByText('Collaborate openly.')).toBeInTheDocument();
      expect(screen.getByText('Automate intelligently.')).toBeInTheDocument();
      expect(screen.getByText('Modernize pragmatically.')).toBeInTheDocument();
      expect(screen.getByText('Keep learning.')).toBeInTheDocument();
    });
  });

  describe('SystemThinkingTrace Component', () => {
    it('renders interactive 6-node architectural trace pipeline and default tab panel', () => {
      render(<SystemThinkingTrace systemThinking={content.profile.systemThinking} />);

      const tablist = screen.getByRole('tablist', { name: /architectural trace layers/i });
      expect(tablist).toBeInTheDocument();

      const tabs = within(tablist).getAllByRole('tab');
      expect(tabs).toHaveLength(6);

      // Default active tab is Frontend (stage 1)
      expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Client & UI Layer')).toBeInTheDocument();
      expect(
        screen.getByText(
          /State synchronization, render lifecycle, network latency perception/i,
        ),
      ).toBeInTheDocument();
    });

    it('switches diagnostic focus and considerations when clicking another node in the pipeline', () => {
      render(<SystemThinkingTrace systemThinking={content.profile.systemThinking} />);

      const tablist = screen.getByRole('tablist', { name: /architectural trace layers/i });
      const tabs = within(tablist).getAllByRole('tab');

      // Click Database node (index 3)
      const dbTab = tabs[3];
      expect(dbTab).toBeDefined();
      fireEvent.click(dbTab!);
      expect(dbTab).toHaveAttribute('aria-selected', 'true');
      expect(tabs[0]).toHaveAttribute('aria-selected', 'false');

      expect(screen.getByText('STAGE 04')).toBeInTheDocument();
      expect(screen.getByText('Persistence & Data Integrity')).toBeInTheDocument();
      expect(
        screen.getByText(
          /Query efficiency, index utilization, connection pool saturation/i,
        ),
      ).toBeInTheDocument();
      expect(screen.getByText('Targeted composite indexing')).toBeInTheDocument();

      // Click Infrastructure node (index 5)
      const infraTab = tabs[5];
      expect(infraTab).toBeDefined();
      fireEvent.click(infraTab!);
      expect(infraTab).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('STAGE 06')).toBeInTheDocument();
      expect(screen.getByText('Runtime, Cloud & DevOps')).toBeInTheDocument();
      expect(screen.getByText('Dockerized environments')).toBeInTheDocument();
    });
  });

  describe('EngineeringPillars Component', () => {
    it('renders all 7 engineering philosophy pillars with summaries and key practices', () => {
      render(<EngineeringPillars themes={content.profile.philosophyThemes} />);



      // Check titles of themes
      expect(
        screen.getByRole('heading', {
          level: 4,
          name: 'Problem Understanding Before Implementation',
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', {
          level: 4,
          name: 'Architecture & System-Level Thinking',
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', {
          level: 4,
          name: 'Full-Stack Ownership & Reliability',
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', {
          level: 4,
          name: 'Resilient Third-Party Integrations',
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', {
          level: 4,
          name: 'Security & Pragmatic Modernization',
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', {
          level: 4,
          name: 'Cross-Functional & Agile Delivery',
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('heading', {
          level: 4,
          name: 'AI-Augmented Engineering',
        }),
      ).toBeInTheDocument();

      // Check specific practice items
      expect(screen.getByText('Domain requirement mapping')).toBeInTheDocument();
      expect(screen.getByText('Layered fault isolation')).toBeInTheDocument();
      expect(screen.getByText('CRM data sync (Zoho & HubSpot)')).toBeInTheDocument();
      expect(screen.getByText('Role-Based Access Control (RBAC)')).toBeInTheDocument();
    });
  });
});
