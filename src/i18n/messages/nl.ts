import type { Messages } from '../types';

export const nl: Messages = {
  meta: {
    title: 'Gustavo Simões de Moraes · Software Engineer',
    description:
      'Software engineer gespecialiseerd in event-driven backends, cloud en identity: Java, Go, Kafka, Okta, AWS en GCP.',
  },
  a11y: {
    skipToContent: 'Naar de inhoud',
    mainNav: 'Hoofdmenu',
    openMenu: 'Menu openen',
    closeMenu: 'Menu sluiten',
    switchToLight: 'Lichte modus inschakelen',
    switchToDark: 'Donkere modus inschakelen',
    language: 'Taal',
  },
  nav: {
    about: 'Over mij',
    experience: 'Ervaring',
    skills: 'Vaardigheden',
    contact: 'Contact',
  },
  intro: { skip: 'Intro overslaan' },
  hero: {
    eyebrow: 'Software Engineer · Backend, Cloud en Identity',
    intro:
      'Ik bouw event-driven microservices in Java en Go, en de identity- en cloudbasis die ze veilig houdt. 11+ jaar, van São Paulo tot Nederland.',
    viewExperience: 'Bekijk ervaring',
    downloadCv: 'Download cv',
    location: 'São Caetano do Sul, SP, Brazilië · Portugees en Engels (C1)',
    stackChart: {
      label: 'Technologieën in mijn stack, per jaar',
      count: (count) => `${count} technologieën`,
    },
  },
  stats: [
    { value: '11+ jaar', label: 'backendsystemen bouwen sinds 2015' },
    { value: 'Java · Go', label: 'event-driven microservices' },
    { value: 'AWS · GCP', label: 'Kubernetes, Terraform, IAM' },
  ],
  about: {
    title: 'Veilige systemen, gebouwd om te schalen',
    lead: 'Ik ben software engineer met 11+ jaar ervaring in het bouwen van event-driven microservices in Java en Go. Ik ben gespecialiseerd in identity- en accessmanagement met Okta, SAML, OAuth en SCIM, cloudinfrastructuur op AWS en GCP, en delivery op basis van Kubernetes.',
    body: [
      'Mijn laatste rol was Senior Software Engineer bij Jumbo in Nederland, na functies bij Ambush, waar ik aan de Wallet van Binance werkte, en bij de fintechs Clara en PicPay.',
      'Buiten het werk: gedragseconomie, hondentraining, sporten en anime.',
    ],
    focus: {
      backends: {
        title: 'Event-driven backends',
        text: 'Java 17-, Go- en Spring-services op Kafka en RabbitMQ, met Saga-orkestratie voor gedistribueerde transacties.',
      },
      identity: {
        title: 'Identity en toegang',
        text: 'SSO, MFA en gebruikersbeheer met Okta en Duo; SAML-, OAuth-, JWT- en SCIM-integraties; AWS IAM-policy’s.',
      },
      cloud: {
        title: 'Cloud en delivery',
        text: 'EKS- en GKE-clusters, Terraform, Helm, GitHub Actions met canary releases, en monitoring met Prometheus en Grafana.',
      },
    },
  },
  experience: {
    title: 'Ervaring',
    lead: 'Negen functies, van Java EE in 2015 tot Go en Kubernetes vandaag.',
    present: 'heden',
    via: 'via',
    showMore: 'Meer tonen',
    showLess: 'Minder tonen',
    jobs: {
      jumbo: {
        role: 'Senior Software Engineer',
        place: 'Veghel, Nederland',
        // TODO: vervangen door de echte beschrijving van Jumbo
        text: ['[Voeg hier de beschrijving van Jumbo toe]'],
      },
      ambush: {
        role: 'Back End Developer Specialist · Binance Wallet',
        place: 'São Paulo, Brazilië · Op afstand',
        text: [
          'Ontwikkeling en modernisering van de interne walletservice, een kernonderdeel van de financiële infrastructuur van het platform. Ik leidde de migratie van een monolithische, op Java gebaseerde architectuur naar moderne, event-driven microservices in Go (Golang), wat de schaalbaarheid, fouttolerantie en isolatie van services aanzienlijk verbeterde. Ik ontwierp en bouwde nieuwe RESTful API’s en eventworkflows, met technologieën zoals Kafka voor betrouwbare, asynchrone verwerking van grote aantallen transacties. Mijn focus op clean architecture, testen (unit-, integratie- en regressietests) en samenwerking tussen teams zorgde voor hoge codekwaliteit en een consistente oplevering van bedrijfskritische functionaliteit.',
        ],
      },
      clara: {
        role: 'Software Development Specialist',
        place: 'São Paulo, Brazilië · Op afstand',
        text: [
          'Ik ontwikkelde microservices in Go (Golang) volgens een event-driven architectuur, met Kafka als message broker voor de communicatie en datastromen tussen gedistribueerde services. Naast de backendservices gebruikte ik Go voor automatiseringstools en scripts die het inrichten van infrastructuur, het configureren van omgevingen en deployments versnelden. Ik ontwierp en onderhield CI/CD-pipelines met Git voor versiebeheer, gekoppeld aan Jenkins en GitHub Actions voor geautomatiseerde builds en deployments, en bewaakte de codekwaliteit en testdekking met SonarCloud. Daarnaast paste ik Infrastructure as Code (IaC) toe met Terraform om AWS-resources in te richten en te configureren, voor schaalbare en reproduceerbare cloudomgevingen. Ook hielp ik productieproblemen te analyseren en op te lossen, wat mijn praktijkervaring in zowel development als infrastructuurbeheer versterkte.',
        ],
      },
      picpay: {
        role: 'Platform Specialist',
        place: 'São Paulo, Brazilië · Op afstand',
        text: [
          'Ontwikkeling van applicaties in een microservicesarchitectuur volgens de SOLID-principes en DDD, met Java 11 en Spring Framework-modules zoals Spring Batch, Spring Boot, Spring Data en Spring Security. We werkten met pub/sub op Kafka-topics, beheerden projectdependencies centraal in GitHub Packages en maten codekwaliteit en testdekking met SonarCloud. We gebruikten het Atlassian-ecosysteem, met Confluence voor procesdocumentatie en Jira voor de taken van het squad, en GitHub als remote repository. We werkten agile met Scrum, aangevuld met onder meer Kanban en XP.',
          'Ontwerp van het CI/CD-proces met verschillende technologieën: Git voor versiebeheer, met de repository beschikbaar voor Jenkins, GitHub Actions of Drone (afhankelijk van het type project) om te builden, controle door SonarCloud op de integriteit van de unittests en de kwaliteit van de code, en Harness om de applicatie te deployen. Docker voor images en containerbeheer, en Terraform om AWS-resources zoals EC2, EKS, MSK, ElastiCache, ECR, RDS, S3, Route 53, VPC, SNS, IAM en SQS automatisch aan te maken en te configureren. Troubleshooting met monitoringtools zoals New Relic, Grafana en Prometheus. Tot slot gebruik en beheer van Kafka-brokers.',
        ],
      },
      'casas-bahia-ewave': {
        role: 'Senior Software Engineer · SRE/DevOps',
        place: 'São Caetano do Sul · Op locatie',
        text: [
          'Ik ontwierp en bouwde robuuste microservices in Go (Golang), met een event-driven architectuur op basis van Kafka voor betrouwbare en schaalbare communicatie tussen services. Mijn werk ging verder dan applicatieontwikkeling: ik bouwde ook automatiseringstools in Go om infrastructuurtaken te beheren, omgevingen consistent te houden en deployments te stroomlijnen. Ik bouwde CI/CD-pipelines met Git voor versiebeheer, gekoppeld aan Jenkins en GitHub Actions om builds en deployments te stroomlijnen, en hield de codekwaliteit en testdekking hoog met analyses in SonarCloud. Met Terraform en AWS paste ik Infrastructure as Code (IaC) toe om cloudinfrastructuur in te richten, serviceconfiguraties te beheren en schaalbare productieomgevingen te onderhouden. Mijn betrokkenheid van begin tot eind, van de kernlogica tot het automatiseren en troubleshooten van gedistribueerde systemen, laat brede ervaring zien met het bouwen van snelle backendsystemen in Go.',
          'We monitorden de productieomgeving en losten problemen op met monitoringtools zoals Dynatrace, Grafana en Prometheus. Ontwikkeling van pipelines met Jenkins, en beheer en orkestratie van containers met Kubernetes via OpenShift.',
        ],
      },
      'spc-brasil-taking': {
        role: 'Java Software Engineer',
        place: 'Regio São Paulo · Op locatie',
        text: [
          'Analyse, documentatie en ontwikkeling van POC’s om aan de eisen van klanten te voldoen. Meestal gebruikten we design sprints om ons te sturen en het verwachte resultaat te bereiken. Ontwikkeling van back-endfunctionaliteit met Spring Framework-modules (Boot, Cloud, Data, JDBC en Security) en front-endfunctionaliteit met JavaScript-frameworks zoals React en Angular. Aan beide kanten lag de nadruk op een microservicesarchitectuur, met goede implementatiepraktijken en schaalbaarheid.',
        ],
      },
      'casas-bahia-people-pro': {
        role: 'Analist en systeemontwikkelaar',
        place: 'Regio São Paulo · Op locatie',
        text: [
          'We gebruiken Spring Framework-modules zoals Spring Boot, Spring Data, Spring Security en Spring Cloud (Netflix OSS) om microservices te ontwikkelen in de AWS-omgeving. We ontwerpen de architectuur van de gekozen oplossing en documenteren die in Confluence. Versiebeheer gebeurt met Git en deployments met Jenkins, met projectdependencies centraal in Nexus en codekwaliteit en testdekking gemeten met SonarQube. We werken volgens TDD om bugs te beperken en de applicaties consistent te houden zonder bestaande code te breken. Voor het beheer van de applicatielevenscyclus kozen we voor Scrum.',
        ],
      },
      'engineering-do-brasil': {
        role: 'Analist en systeemontwikkelaar',
        place: 'Regio São Paulo · Op locatie',
        text: [
          'Analyse van eisen, het opstellen van stroomdiagrammen en documentatie volgens de wensen van de klant. Ontwikkeling van applicaties op het J2EE-platform met de nadruk op SOA, en van webapplicaties met JPA 2, JSF 2.2 en PrimeFaces 5.0. XML-transformaties met XSL, validatie met XSD, en het opzetten en configureren van BPM-processen.',
          'We ondersteunen legacysystemen: we lossen kritieke meldingen met grote impact op, debuggen de gegevensverwerking en corrigeren queries en stored procedures. We gebruiken Git met GitLab-repositories en geautomatiseerde tests met JUnit 4 om de werking van elke functionaliteit te waarborgen.',
        ],
      },
      'smart-staff': {
        role: 'Java-ontwikkelaar',
        place: 'São Caetano do Sul, Brazilië · Op locatie',
        text: [
          'Analyse van eisen, het opstellen van stroomdiagrammen en documentatie volgens de wensen van de klant. Ontwikkeling van nieuwe applicaties en ondersteuning van bestaande legacyapplicaties op het Java EE-platform met JPA 2, JSF 2 en PrimeFaces, volgens de agile methodieken Scrum en XP. Broncodebeheer met Git in GitHub-repositories, en unittests met JUnit 4 om de werking van de functionaliteit van elk project te waarborgen.',
        ],
      },
    },
  },
  skills: {
    title: 'Technologieën',
    clusterLoad: 'clusterbelasting · 7 dagen',
    groups: {
      languages: 'Talen en frameworks',
      identity: 'Identity en beveiliging',
      aws: 'AWS',
      gcp: 'GCP',
      devops: 'DevOps en observability',
      data: 'Messaging, data en tools',
    },
    facts: [
      {
        label: 'Opleiding',
        title: 'FIAP University',
        text: 'Bachelor Analyse en Softwareontwikkeling · december 2014',
      },
      { label: 'Talen', title: 'Portugees, moedertaal', text: 'Engels, C1 (gevorderd)' },
      {
        label: 'Werkwijze',
        title: 'TDD, SOLID, 80%+ testdekking',
        text: 'Code reviews, sollicitatiegesprekken, architectuurdocumentatie',
      },
    ],
  },
  contact: {
    title: { before: 'Laten we iets ', highlight: 'veiligs', after: ' bouwen' },
    lead: 'Zoek je iemand voor backend-, cloud- of identitywerk? Stuur me een bericht, dan neem ik contact met je op.',
    emailMe: 'Mail mij',
    linkedIn: 'Verbind op LinkedIn',
    gitHub: 'Bekijk op GitHub',
    fields: { email: 'E-mail', phone: 'Telefoon', linkedin: 'LinkedIn', github: 'GitHub', location: 'Woonplaats' },
    location: 'São Caetano do Sul, Brazilië',
    copyField: (field) => `${field} kopiëren`,
    copied: 'Gekopieerd naar het klembord',
  },
  notFound: {
    title: 'Pagina niet gevonden',
    text: 'De pagina die je zoekt bestaat niet of is verplaatst.',
    home: 'Terug naar home',
  },
};
