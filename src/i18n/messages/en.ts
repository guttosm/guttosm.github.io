import type { Messages } from '../types';

export const en: Messages = {
  meta: {
    title: 'Gustavo Simões de Moraes · Software Engineer',
    description:
      'Software engineer specialized in event-driven backends, cloud and identity: Java, Go, Kafka, Okta, AWS and GCP.',
  },
  a11y: {
    skipToContent: 'Skip to content',
    mainNav: 'Main',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    switchToLight: 'Switch to light mode',
    switchToDark: 'Switch to dark mode',
    language: 'Language',
  },
  nav: {
    about: 'About',
    experience: 'Experience',
    skills: 'Skills',
    contact: 'Contact',
  },
  intro: { skip: 'Skip intro' },
  hero: {
    eyebrow: 'Software Engineer · Backend, Cloud & Identity',
    intro:
      'I build event-driven microservices in Java and Go, and the identity and cloud foundations that keep them secure. 11+ years, from São Paulo to the Netherlands.',
    viewExperience: 'View experience',
    downloadCv: 'Download CV',
    location: 'São Caetano do Sul, SP, Brazil · Portuguese and English (C1)',
    stackChart: {
      label: 'Technologies in my stack, year by year',
      count: (count) => `${count} technologies`,
    },
  },
  stats: [
    { value: '11+ years', label: 'building backend systems since 2015' },
    { value: 'Java · Go', label: 'event-driven microservices' },
    { value: 'AWS · GCP', label: 'Kubernetes, Terraform, IAM' },
  ],
  about: {
    title: 'Secure systems, built to scale',
    lead: "I'm a software engineer with 11+ years of experience building event-driven microservices in Java and Go. I specialize in identity and access management with Okta, SAML, OAuth and SCIM, cloud infrastructure on AWS and GCP, and Kubernetes-based delivery.",
    body: [
      "Most recently I was a Senior Software Engineer at Jumbo in the Netherlands, after roles at Ambush, working on Binance's Wallet, and at the fintechs Clara and PicPay.",
      'Away from the keyboard: behavioral economics, dog training, the gym and anime.',
    ],
    focus: {
      backends: {
        title: 'Event-driven backends',
        text: 'Java 17, Go and Spring services on Kafka and RabbitMQ, with Saga orchestration for distributed transactions.',
      },
      identity: {
        title: 'Identity and access',
        text: 'SSO, MFA and user lifecycle with Okta and Duo; SAML, OAuth, JWT and SCIM integrations; AWS IAM policies.',
      },
      cloud: {
        title: 'Cloud and delivery',
        text: 'EKS and GKE clusters, Terraform, Helm, GitHub Actions with canary releases, and Prometheus and Grafana monitoring.',
      },
    },
  },
  experience: {
    title: 'Experience',
    lead: 'Nine roles, from Java EE in 2015 to Go and Kubernetes today.',
    present: 'Present',
    via: 'via',
    showMore: 'Show more',
    showLess: 'Show less',
    jobs: {
      jumbo: {
        role: 'Senior Software Engineer',
        place: 'Veghel, Netherlands',
        // TODO: replace with the real Jumbo description (also in pt.ts and nl.ts)
        text: ['[Add your Jumbo description here]'],
      },
      ambush: {
        role: 'Back End Developer Specialist · Binance Wallet',
        place: 'São Paulo, Brazil · Remote',
        text: [
          "Developing and modernizing the internal wallet service, a core component of the platform's financial infrastructure. I led the migration from a monolithic, Java-based architecture to a modern, event-driven microservices approach using Go (Golang), significantly improving scalability, fault tolerance, and service isolation. I designed and implemented new RESTful APIs and event workflows, integrating technologies such as Kafka to enable reliable and asynchronous processing of high-volume transactions. My focus on clean architecture, testing (unit, integration, regression), and cross-team collaboration ensured high code quality and consistent delivery of business-critical features.",
        ],
      },
      clara: {
        role: 'Software Development Specialist',
        place: 'São Paulo, Brazil · Remote',
        text: [
          'I developed microservices in Go (Golang) following an event-driven architecture, leveraging Kafka as the message broker to orchestrate communication and data flow across distributed services. Beyond backend service implementation, I utilized Go to build automation tools and scripts that streamlined infrastructure provisioning, environment configuration, and deployment tasks. I designed and maintained CI/CD pipelines using Git for version control, integrated with Jenkins and GitHub Actions for build and deployment automation, while ensuring code quality and test coverage through SonarCloud. I also applied Infrastructure as Code (IaC) practices with Terraform to provision and configure AWS resources, enabling scalable, reproducible cloud environments. Additionally, I contributed to diagnosing and resolving production issues, reinforcing my hands-on expertise in both development and infrastructure operations.',
        ],
      },
      picpay: {
        role: 'Platform Specialist',
        place: 'São Paulo, Brazil · Remote',
        text: [
          'Application development for a microservice architecture following the SOLID principles based on DDD using Java 11 with Spring Framework modules such as Spring Batch, Spring Boot, Spring Data, and Spring Security, working with the pub/sub concept of Kafka topics, centralizing project dependencies on GitHub Packages, and measuring code quality and test coverage with SonarCloud. Utilizing the Atlassian ecosystem, with Confluence for process documentation and Jira for squad tasks, and GitHub as a remote repository. We used Agile methodology with Scrum, alongside others such as Kanban and XP.',
          'CI/CD process design using various technologies: Git to control source versioning, making the repository available for Jenkins, GitHub Actions or Drone (depending on the kind of project) to build, inspected by SonarCloud to ensure the integrity of the unit tests and the quality of the application code, and Harness to deploy the application. Docker for image generation and container management, and Terraform to automate the creation and configuration of AWS resources such as EC2, EKS, MSK, ElastiCache, ECR, RDS, S3, Route 53, VPC, SNS, IAM, and SQS. Troubleshooting with monitoring tools such as New Relic, Grafana, and Prometheus. Finally, use and administration of Kafka brokers.',
        ],
      },
      'casas-bahia-ewave': {
        role: 'Senior Software Engineer · SRE/DevOps',
        place: 'São Caetano do Sul · On-site',
        text: [
          'I designed and implemented robust microservices in Go (Golang), adopting an event-driven architecture powered by Kafka to ensure reliable and scalable communication between services. My work extended beyond application development; I also engineered automation tools in Go to manage infrastructure tasks, ensure environment consistency, and streamline deployment operations. I built CI/CD pipelines using Git for version control, integrating them with Jenkins and GitHub Actions to streamline build and deployment processes. I also enforced high standards of code quality and test coverage through SonarCloud analysis. Leveraging Terraform and AWS, I applied Infrastructure as Code (IaC) principles to provision cloud infrastructure, manage service configurations, and maintain scalable production environments. My end-to-end involvement from coding core business logic to automating and troubleshooting distributed systems reflects deep expertise in building high-performance backend systems with Go.',
          'We monitored the operation in the production environment, troubleshooting with monitoring tools such as Dynatrace, Grafana, and Prometheus. Development of pipelines with Jenkins, and administration and orchestration of containers with Kubernetes through OpenShift.',
        ],
      },
      'spc-brasil-taking': {
        role: 'Java Software Engineer',
        place: 'Greater São Paulo Area · On-site',
        text: [
          'Analysis, documentation, and development of POCs to meet customer requirements. We used design sprints most of the time to guide us and achieve the expected result. Development of back-end demands using Spring Framework modules (Boot, Cloud, Data, JDBC, and Security) and front-end requests using JavaScript frameworks such as React and Angular. On both fronts of development, the architecture focused on microservices, following good implementation practices and scalability.',
        ],
      },
      'casas-bahia-people-pro': {
        role: 'Analyst and Systems Developer',
        place: 'Greater São Paulo Area · On-site',
        text: [
          'We use Spring Framework modules such as Spring Boot, Spring Data, Spring Security, and Spring Cloud based on Netflix OSS to develop microservices in the AWS environment. We design the architecture for the chosen solution during this process, documented in Confluence. Version control is done with Git and applications are deployed with Jenkins, with project dependencies centralized in Nexus, and code quality and test coverage measured with SonarQube. We follow TDD to minimize bugs and keep the applications consistent without breaking any part of the code. For application lifecycle management, we chose the Scrum framework.',
        ],
      },
      'engineering-do-brasil': {
        role: 'Analyst and Systems Developer',
        place: 'Greater São Paulo Area · On-site',
        text: [
          'Requirements analysis, preparation of flowcharts, and documentation following the demands sent by the client. Development of applications on the J2EE platform with an emphasis on SOA architecture, also working with web applications using the following frameworks: JPA 2, JSF 2.2, and PrimeFaces 5.0. XML transformations with XSL and validation with XSD, and creation and configuration of BPM processes.',
          'We support existing legacy systems, resolving critical calls with high impact on the application, debugging to track data processing, and correcting queries and stored procedures. We use Git to centralize code in GitLab repositories, and automated tests with JUnit 4 to ensure the integrity of each project feature.',
        ],
      },
      'smart-staff': {
        role: 'Java Developer',
        place: 'São Caetano do Sul, Brazil · On-site',
        text: [
          "Requirements analysis, flowcharts, and documentation following the demands sent by the client. Development of new applications and support of existing legacy ones on the Java EE platform with the following frameworks: JPA 2, JSF 2, and PrimeFaces, following the Agile Scrum and XP development methodologies. System source code management using Git through GitHub repositories. Unit testing with JUnit 4 to ensure the integrity of each project's functionality.",
        ],
      },
    },
  },
  skills: {
    title: 'Stack',
    clusterLoad: 'cluster load · 7 days',
    groups: {
      languages: 'Languages and frameworks',
      identity: 'Identity and security',
      aws: 'AWS',
      gcp: 'GCP',
      devops: 'DevOps and observability',
      data: 'Messaging, data and tools',
    },
    facts: [
      {
        label: 'Education',
        title: 'FIAP University',
        text: "Bachelor's in Analysis and Software Development · Dec 2014",
      },
      { label: 'Languages', title: 'Portuguese, native', text: 'English, C1 (advanced)' },
      {
        label: 'Practices',
        title: 'TDD, SOLID, 80%+ test coverage',
        text: 'Code review, interviewing, architecture docs',
      },
    ],
  },
  contact: {
    title: { before: "Let's build something ", highlight: 'secure' },
    lead: "Hiring for backend, cloud or identity work? Send me a message and I'll get back to you.",
    emailMe: 'Email me',
    linkedIn: 'Connect on LinkedIn',
    gitHub: 'View on GitHub',
    fields: { email: 'Email', phone: 'Phone', linkedin: 'LinkedIn', github: 'GitHub', location: 'Based in' },
    location: 'São Caetano do Sul, Brazil',
    copyField: (field) => `Copy ${field.toLowerCase()}`,
    copied: 'Copied to clipboard',
  },
  notFound: {
    title: 'Page not found',
    text: "The page you're looking for doesn't exist or has moved.",
    home: 'Back to home',
  },
};
