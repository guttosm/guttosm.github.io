// All site content lives here, so updating the portfolio never means touching components.

export type Accent = 'purple' | 'cyan' | 'magenta';

export const profile = {
  name: 'Gustavo Simões de Moraes',
  firstName: 'Gustavo Simões',
  lastName: 'de Moraes',
  shortName: 'Gustavo Moraes',
  initials: 'GM',
  title: 'Software Engineer · Backend, Cloud & Identity',
  intro:
    'I build event-driven microservices in Java and Go, and the identity and cloud foundations that keep them secure. 11+ years, from São Paulo to the Netherlands.',
  location: 'São Caetano do Sul, SP, Brazil',
  languagesLine: 'Portuguese and English (C1)',
  email: 'gsimoes.shark@gmail.com',
  phone: '+55 (11) 99554-9317',
  linkedin: 'https://linkedin.com/in/gustavo-simoes-moraes',
  linkedinLabel: '/in/gustavo-simoes-moraes',
  cvUrl: `${import.meta.env.BASE_URL}Gustavo-Simoes-de-Moraes-CV.pdf`,
};

export const stats = [
  { value: '11+ years', label: 'building backend systems since 2015' },
  { value: '9 companies', label: 'fintech, retail and consulting' },
  { value: 'Java · Go', label: 'event-driven microservices' },
  { value: 'AWS · GCP', label: 'Kubernetes, Terraform, IAM' },
];

export const work = [
  {
    where: 'Ambush · client Binance · 2023–2025',
    metric: 'Java → Go',
    title: 'Binance Wallet platform migration',
    text: 'Drove the migration of a business-critical financial platform from Java to Go, and re-architected a monolith into event-driven services on Kafka with Saga orchestration.',
    tags: ['Go', 'Kafka', 'Saga', 'AWS EKS'],
  },
  {
    where: 'Ewave · 2019–2020',
    metric: '−40% auth issues',
    title: 'Legacy auth to cloud IAM',
    text: 'Migrated legacy authentication systems to cloud-based IAM, cutting authentication issues by 40% and making sign-on 30% faster.',
    tags: ['IAM', 'Kubernetes', 'Grafana'],
  },
  {
    where: 'Clara · 2021–2023',
    metric: 'AI risk scoring',
    title: 'Adaptive authentication',
    text: 'Introduced adaptive authentication using AI-driven risk assessment, reducing false positives while strengthening security, on top of Okta SSO and MFA.',
    tags: ['Okta', 'MFA', 'Java 17', 'Go'],
  },
  {
    where: 'Ambush · 2023–2025',
    metric: 'Canary releases',
    title: 'CI/CD and AWS from scratch',
    text: 'Designed GitHub Actions pipelines from the ground up with canary deployments, and provisioned the full AWS stack: EKS, load balancing and Route 53.',
    tags: ['GitHub Actions', 'EKS', 'Route 53'],
  },
];

export const focusAreas: { icon: 'flow' | 'shield' | 'cloud'; accent: Accent; title: string; text: string }[] = [
  {
    icon: 'flow',
    accent: 'purple',
    title: 'Event-driven backends',
    text: 'Java 17, Go and Spring services on Kafka and RabbitMQ, with Saga orchestration for distributed transactions.',
  },
  {
    icon: 'shield',
    accent: 'cyan',
    title: 'Identity and access',
    text: 'SSO, MFA and user lifecycle with Okta and Duo; SAML, OAuth, JWT and SCIM integrations; AWS IAM policies.',
  },
  {
    icon: 'cloud',
    accent: 'magenta',
    title: 'Cloud and delivery',
    text: 'EKS and GKE clusters, Terraform, Helm, GitHub Actions with canary releases, and Prometheus and Grafana monitoring.',
  },
];

export const jobs = [
  {
    company: 'Jumbo',
    role: 'Senior Software Engineer',
    dates: 'Mar 2025 – Oct 2026',
    place: 'Veghel, Netherlands',
    // TODO: replace with real Jumbo highlights
    points: ['[Add your Jumbo highlights here]'],
    tags: ['Java', 'Go', 'Kubernetes'],
  },
  {
    company: 'Ambush',
    role: 'Specialist Software Engineer · Binance Wallet',
    dates: 'Dec 2023 – Feb 2025',
    place: 'Remote',
    points: [
      'Led the Wallet codebase migration from Java to Go.',
      'Re-architected a monolith into Kafka event-driven services with Saga orchestration.',
      'Built CI/CD with canary releases and provisioned the AWS infrastructure.',
    ],
    tags: ['Go', 'Kafka', 'AWS', 'GitHub Actions'],
  },
  {
    company: 'Clara',
    role: 'Software Engineer',
    dates: 'Nov 2021 – Nov 2023',
    place: 'Remote',
    points: [
      'Built event-driven microservices in Java 17 and Go, deployed to Kubernetes.',
      'Integrated Okta SSO, MFA and lifecycle; added AI-driven adaptive authentication.',
    ],
    tags: ['Java 17', 'Go', 'Okta', 'Terraform'],
  },
  {
    company: 'PicPay',
    role: 'Software Engineer',
    dates: 'Apr 2020 – Oct 2021',
    place: 'Remote',
    points: [
      'Implemented SAML, JWT and SCIM for secure integrations.',
      'Defined AWS IAM roles and policies; automated delivery with Terraform and GitHub Actions.',
    ],
    tags: ['SAML', 'SCIM', 'AWS IAM', 'Helm'],
  },
  {
    company: 'Ewave',
    role: 'Site Reliability Engineer',
    dates: 'Apr 2019 – Mar 2020',
    place: 'São Paulo',
    points: [
      'Migrated legacy auth to cloud IAM: 40% fewer issues, 30% faster sign-on.',
      'Built Prometheus and Grafana dashboards and Jenkins pipelines.',
    ],
    tags: ['Kubernetes', 'Prometheus', 'Jenkins'],
  },
  {
    company: 'Taking',
    role: 'Java Developer',
    dates: 'Aug 2018 – Mar 2019',
    place: 'São Paulo',
    points: ['Backend tech lead in the innovation lab, building Java 11 microservices and proofs of concept.'],
    tags: ['Java 11', 'Okta', 'Jenkins'],
  },
  {
    company: 'People Pro',
    role: 'Analyst and Systems Developer',
    dates: 'Aug 2017 – Aug 2018',
    place: 'São Paulo',
    points: ['Designed Java middleware keeping identity data consistent across multiple IAM solutions.'],
    tags: ['Java 11', 'Spring', 'TDD'],
  },
  {
    company: 'Engineering do Brasil',
    role: 'Analyst and Systems Developer',
    dates: 'Oct 2015 – Aug 2017',
    place: 'São Paulo',
    points: ['Developed J2EE applications on a SOA architecture with XSL, XSD and BPM.'],
    tags: ['J2EE', 'SOA', 'SQL'],
  },
  {
    company: 'Smart Staff',
    role: 'Java Developer',
    dates: 'Apr 2015 – Oct 2015',
    place: 'São Paulo',
    points: ['Built new Java EE applications and maintained legacy ones, with JUnit 4 tests.'],
    tags: ['Java EE', 'JUnit'],
  },
];

export const skills: { name: string; accent: Accent; items: string[] }[] = [
  { name: 'Languages and frameworks', accent: 'purple', items: ['Java 17', 'Go', 'Spring Boot', 'Spring Cloud', 'Spring Security', 'Maven', 'Gradle'] },
  { name: 'Identity and security', accent: 'cyan', items: ['Okta', 'Duo', 'OAuth', 'SAML', 'JWT', 'SCIM', 'AWS IAM'] },
  { name: 'AWS', accent: 'magenta', items: ['EKS', 'ECR', 'Lambda', 'S3', 'SQS', 'SNS', 'Route 53', 'CloudFormation', 'X-Ray'] },
  { name: 'GCP', accent: 'purple', items: ['GKE', 'Cloud Run', 'Cloud Build', 'BigQuery', 'Pub/Sub', 'Dataflow'] },
  { name: 'DevOps and observability', accent: 'cyan', items: ['Docker', 'Kubernetes', 'Helm', 'Terraform', 'GitHub Actions', 'Tekton', 'Jenkins', 'Prometheus', 'Grafana'] },
  { name: 'Messaging, data and tools', accent: 'magenta', items: ['Kafka', 'RabbitMQ', 'PostgreSQL', 'MySQL', 'Oracle', 'MongoDB', 'Kong', 'Swagger', 'SonarCloud'] },
];

export const facts = [
  { label: 'Education', title: 'FIAP University', text: "Bachelor's in Analysis and Software Development · Dec 2014" },
  { label: 'Languages', title: 'Portuguese, native', text: 'English, C1 (advanced)' },
  { label: 'Practices', title: 'TDD, SOLID, 80%+ test coverage', text: 'Code review, interviewing, architecture docs' },
];

export const navLinks = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];
