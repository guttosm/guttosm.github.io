// Facts that are the same in every language. Translated text lives in src/i18n/messages,
// keyed by the ids below, so each list is defined once and translated per language.
import type { Job, SkillGroup } from './types';

export const profile = {
  name: 'Gustavo Simões de Moraes',
  firstName: 'Gustavo Simões',
  lastName: 'de Moraes',
  shortName: 'Gustavo Moraes',
  initials: 'GSM',
  email: 'gsimoes.shark@gmail.com',
  phone: '+55 (11) 99554-9317',
  linkedin: {
    url: 'https://www.linkedin.com/in/guttosm/',
    label: '/in/guttosm',
  },
  github: {
    url: 'https://github.com/guttosm',
    label: '/guttosm',
  },
  cvUrl: `${import.meta.env.BASE_URL}Gustavo-Simoes-de-Moraes-CV.pdf`,
} as const;

export const FOCUS_AREA_IDS = ['backends', 'identity', 'cloud'] as const;
export type FocusAreaId = (typeof FOCUS_AREA_IDS)[number];

const LINKEDIN = 'https://www.linkedin.com/company';
/** Company icons in public/logos, taken from each company's official website */
const logo = (file: string) => `${import.meta.env.BASE_URL}logos/${file}`;
const CASAS_BAHIA = { name: 'Grupo Casas Bahia', url: `${LINKEDIN}/2977558/`, logo: logo('grupo-casas-bahia.png') };

const JOBS = [
  // TODO: add Jumbo's tech tags together with its description
  {
    id: 'jumbo',
    company: { name: 'Jumbo', logo: logo('jumbo.png') },
    start: '2025-03',
    end: '2026-10',
    tags: [],
  },
  {
    id: 'ambush',
    company: { name: 'Ambush', url: `${LINKEDIN}/10438515/`, logo: logo('ambush.png') },
    start: '2023-12',
    end: '2025-02',
    tags: ['Go', 'Java', 'Kafka', 'REST APIs', 'Microservices'],
  },
  {
    id: 'clara',
    company: { name: 'Clara', url: `${LINKEDIN}/67103310/`, logo: logo('clara.ico') },
    start: '2021-11',
    end: '2023-11',
    tags: ['Go', 'Kafka', 'Terraform', 'AWS', 'Jenkins', 'GitHub Actions'],
  },
  {
    id: 'picpay',
    company: { name: 'PicPay', url: `${LINKEDIN}/2716944/`, logo: logo('picpay.png') },
    start: '2020-04',
    end: '2021-11',
    tags: ['Java 11', 'Spring', 'Kafka', 'Docker', 'Terraform', 'AWS'],
  },
  {
    id: 'casas-bahia-ewave',
    company: CASAS_BAHIA,
    // Ewave's icon is white, so it needs a dark tile
    via: { name: 'Ewave', url: `${LINKEDIN}/14036/`, logo: logo('ewave.png'), logoBackground: '#1e293b' },
    start: '2019-04',
    end: '2020-03',
    tags: ['Go', 'Kafka', 'Kubernetes', 'OpenShift', 'Terraform', 'Prometheus'],
  },
  {
    id: 'spc-brasil-taking',
    company: { name: 'SPC Brasil', url: `${LINKEDIN}/227255/`, logo: logo('spc-brasil.svg') },
    via: { name: 'Taking', logo: logo('taking.png') },
    start: '2018-08',
    end: '2019-03',
    tags: ['Java', 'Spring', 'React', 'Angular', 'Microservices'],
  },
  {
    id: 'casas-bahia-people-pro',
    company: CASAS_BAHIA,
    via: { name: 'People Pro', logo: logo('people-pro.png') },
    start: '2017-08',
    end: '2018-08',
    tags: ['Spring Boot', 'Spring Cloud', 'AWS', 'Jenkins', 'TDD'],
  },
  {
    id: 'engineering-do-brasil',
    company: { name: 'Engineering do Brasil', url: `${LINKEDIN}/3712367/`, logo: logo('engineering-do-brasil.png') },
    start: '2015-10',
    end: '2017-08',
    tags: ['J2EE', 'SOA', 'JSF', 'PrimeFaces', 'BPM', 'SQL'],
  },
  {
    id: 'smart-staff',
    company: { name: 'Smart Staff', url: `${LINKEDIN}/24794707/`, logo: logo('smart-staff.png') },
    start: '2015-04',
    end: '2015-09',
    tags: ['Java EE', 'JSF', 'PrimeFaces', 'JUnit', 'Scrum'],
  },
] as const satisfies readonly Job[];

export type JobId = (typeof JOBS)[number]['id'];
export const jobs: readonly (Job & { id: JobId })[] = JOBS;

const SKILL_GROUPS = [
  { id: 'languages', items: ['Java 17', 'Go', 'Spring Boot', 'Spring Cloud', 'Spring Security', 'Maven', 'Gradle'] },
  { id: 'identity', items: ['Okta', 'Duo', 'OAuth', 'SAML', 'JWT', 'SCIM', 'AWS IAM'] },
  { id: 'aws', items: ['EKS', 'ECR', 'Lambda', 'S3', 'SQS', 'SNS', 'Route 53', 'CloudFormation', 'X-Ray'] },
  { id: 'gcp', items: ['GKE', 'Cloud Run', 'Cloud Build', 'BigQuery', 'Pub/Sub', 'Dataflow'] },
  { id: 'devops', items: ['Docker', 'Kubernetes', 'Helm', 'Terraform', 'GitHub Actions', 'Tekton', 'Jenkins', 'Prometheus', 'Grafana'] },
  { id: 'data', items: ['Kafka', 'RabbitMQ', 'PostgreSQL', 'MySQL', 'Oracle', 'MongoDB', 'Kong', 'Swagger', 'SonarCloud'] },
] as const satisfies readonly SkillGroup[];

export type SkillGroupId = (typeof SKILL_GROUPS)[number]['id'];
export const skillGroups: readonly (SkillGroup & { id: SkillGroupId })[] = SKILL_GROUPS;
