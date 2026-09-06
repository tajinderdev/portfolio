import type { PortfolioData } from './models';
import { profileData } from './data/profile';
import { skillPillarsData } from './data/skills';
import { experienceData } from './data/experience';
import { projectsData, publicReferencesData } from './data/projects';
import { domainsData } from './data/domains';
import { aiEngineeringData } from './data/aiEngineering';
import { achievementsData } from './data/achievements';
import { educationData } from './data/education';

export * from './models';
export {
  profileData,
  skillPillarsData,
  experienceData,
  projectsData,
  publicReferencesData,
  domainsData,
  aiEngineeringData,
  achievementsData,
  educationData,
};

export const portfolioContent: PortfolioData = {
  profile: profileData,
  skillPillars: skillPillarsData,
  experiences: experienceData,
  projects: projectsData,
  publicReferences: publicReferencesData,
  domains: domainsData,
  aiEngineering: aiEngineeringData,
  achievements: achievementsData,
  education: educationData,
};

export const getPortfolioContent = (): PortfolioData => portfolioContent;
