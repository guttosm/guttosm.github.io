import type { Messages } from '../types';

export const pt: Messages = {
  meta: {
    title: 'Gustavo Simões de Moraes · Engenheiro de Software',
    description:
      'Engenheiro de software especializado em backends orientados a eventos, nuvem e identidade: Java, Go, Kafka, Okta, AWS e GCP.',
  },
  a11y: {
    skipToContent: 'Pular para o conteúdo',
    mainNav: 'Principal',
    openMenu: 'Abrir menu',
    closeMenu: 'Fechar menu',
    switchToLight: 'Mudar para o modo claro',
    switchToDark: 'Mudar para o modo escuro',
    language: 'Idioma',
  },
  nav: {
    about: 'Sobre',
    experience: 'Experiência',
    skills: 'Habilidades',
    contact: 'Contato',
  },
  intro: { skip: 'Pular intro' },
  hero: {
    eyebrow: 'Engenheiro de Software · Backend, Cloud e Identidade',
    intro:
      'Construo microsserviços orientados a eventos em Java e Go, e as bases de identidade e nuvem que os mantêm seguros. Mais de 11 anos, de São Paulo aos Países Baixos.',
    viewExperience: 'Ver experiência',
    downloadCv: 'Baixar CV',
    location: 'São Caetano do Sul, SP, Brasil · Português e inglês (C1)',
    stackChart: {
      label: 'Tecnologias no meu stack, ano a ano',
      count: (count) => `${count} tecnologias`,
    },
  },
  stats: [
    { value: '11+ anos', label: 'construindo sistemas backend desde 2015' },
    { value: 'Java · Go', label: 'microsserviços orientados a eventos' },
    { value: 'AWS · GCP', label: 'Kubernetes, Terraform, IAM' },
  ],
  about: {
    title: 'Sistemas seguros, feitos para escalar',
    lead: 'Sou engenheiro de software com mais de 11 anos de experiência construindo microsserviços orientados a eventos em Java e Go. Sou especializado em gestão de identidade e acesso com Okta, SAML, OAuth e SCIM, infraestrutura em nuvem na AWS e no GCP, e entrega baseada em Kubernetes.',
    body: [
      'Mais recentemente, fui Engenheiro de Software Sênior na Jumbo, nos Países Baixos, depois de passar pela Ambush, trabalhando na Wallet da Binance, e pelas fintechs Clara e PicPay.',
      'Longe do teclado: economia comportamental, adestramento de cães, academia e anime.',
    ],
    focus: {
      backends: {
        title: 'Backends orientados a eventos',
        text: 'Serviços em Java 17, Go e Spring sobre Kafka e RabbitMQ, com orquestração Saga para transações distribuídas.',
      },
      identity: {
        title: 'Identidade e acesso',
        text: 'SSO, MFA e ciclo de vida de usuários com Okta e Duo; integrações SAML, OAuth, JWT e SCIM; políticas de AWS IAM.',
      },
      cloud: {
        title: 'Cloud e entrega',
        text: 'Clusters EKS e GKE, Terraform, Helm, GitHub Actions com canary releases e monitoramento com Prometheus e Grafana.',
      },
    },
  },
  experience: {
    title: 'Experiência',
    lead: 'Nove cargos, do Java EE em 2015 ao Go e Kubernetes de hoje.',
    present: 'atual',
    via: 'via',
    showMore: 'Mostrar mais',
    showLess: 'Mostrar menos',
    jobs: {
      jumbo: {
        role: 'Engenheiro de Software Sênior',
        place: 'Veghel, Países Baixos',
        // TODO: substituir pela descrição real da Jumbo
        text: ['[Adicione aqui a descrição da Jumbo]'],
      },
      ambush: {
        role: 'Especialista em Desenvolvimento Back-end · Binance Wallet',
        place: 'São Paulo, Brasil · Remoto',
        text: [
          'Desenvolvimento e modernização do serviço interno de carteira, um componente central da infraestrutura financeira da plataforma. Liderei a migração de uma arquitetura monolítica em Java para microsserviços orientados a eventos em Go (Golang), melhorando significativamente a escalabilidade, a tolerância a falhas e o isolamento dos serviços. Projetei e implementei novas APIs RESTful e fluxos de eventos, integrando tecnologias como o Kafka para permitir o processamento confiável e assíncrono de transações em alto volume. Meu foco em arquitetura limpa, testes (unitários, de integração e de regressão) e colaboração entre times garantiu alta qualidade de código e entrega consistente de funcionalidades críticas para o negócio.',
        ],
      },
      clara: {
        role: 'Especialista em Desenvolvimento de Software',
        place: 'São Paulo, Brasil · Remoto',
        text: [
          'Desenvolvi microsserviços em Go (Golang) seguindo uma arquitetura orientada a eventos, usando o Kafka como message broker para orquestrar a comunicação e o fluxo de dados entre serviços distribuídos. Além da implementação de serviços backend, usei Go para criar ferramentas de automação e scripts que agilizaram o provisionamento de infraestrutura, a configuração de ambientes e as tarefas de deploy. Projetei e mantive pipelines de CI/CD com Git para versionamento, integrados ao Jenkins e ao GitHub Actions para automação de build e deploy, garantindo a qualidade do código e a cobertura de testes com o SonarCloud. Também apliquei práticas de Infraestrutura como Código (IaC) com Terraform para provisionar e configurar recursos na AWS, criando ambientes em nuvem escaláveis e reproduzíveis. Além disso, contribuí para diagnosticar e resolver problemas em produção, reforçando minha experiência prática tanto em desenvolvimento quanto em operações de infraestrutura.',
        ],
      },
      picpay: {
        role: 'Especialista de Plataforma',
        place: 'São Paulo, Brasil · Remoto',
        text: [
          'Desenvolvimento de aplicações em uma arquitetura de microsserviços seguindo os princípios SOLID e o DDD, com Java 11 e módulos do Spring Framework como Spring Batch, Spring Boot, Spring Data e Spring Security, trabalhando com o conceito de pub/sub em tópicos Kafka, centralizando as dependências dos projetos no GitHub Packages e medindo a qualidade do código e a cobertura de testes com o SonarCloud. Usávamos o ecossistema Atlassian, com o Confluence para documentar processos e o Jira para as tarefas do squad, e o GitHub como repositório remoto. Trabalhávamos com metodologia ágil usando Scrum, em conjunto com outras como Kanban e XP.',
          'Desenho do processo de CI/CD com várias tecnologias: Git para o versionamento do código, com o repositório disponível para Jenkins, GitHub Actions ou Drone (dependendo do tipo de projeto) fazerem o build, a análise do SonarCloud para garantir a integridade dos testes unitários e a qualidade do código, e o Harness para o deploy da aplicação. Docker para gerar imagens e gerenciar contêineres, e Terraform para automatizar a criação e a configuração de recursos na AWS, como EC2, EKS, MSK, ElastiCache, ECR, RDS, S3, Route 53, VPC, SNS, IAM e SQS. Troubleshooting com ferramentas de monitoramento como New Relic, Grafana e Prometheus. Por fim, uso e administração de brokers Kafka.',
        ],
      },
      'casas-bahia-ewave': {
        role: 'Engenheiro de Software Sênior · SRE/DevOps',
        place: 'São Caetano do Sul · Presencial',
        text: [
          'Projetei e implementei microsserviços robustos em Go (Golang), adotando uma arquitetura orientada a eventos com Kafka para garantir uma comunicação confiável e escalável entre os serviços. Meu trabalho foi além do desenvolvimento de aplicações: também criei ferramentas de automação em Go para gerenciar tarefas de infraestrutura, garantir a consistência dos ambientes e agilizar as operações de deploy. Construí pipelines de CI/CD com Git para versionamento, integrados ao Jenkins e ao GitHub Actions para agilizar os processos de build e deploy, e mantive altos padrões de qualidade de código e cobertura de testes com a análise do SonarCloud. Com Terraform e AWS, apliquei os princípios de Infraestrutura como Código (IaC) para provisionar a infraestrutura em nuvem, gerenciar configurações de serviços e manter ambientes de produção escaláveis. Meu envolvimento de ponta a ponta, da lógica de negócio à automação e ao troubleshooting de sistemas distribuídos, reflete uma ampla experiência na construção de sistemas backend de alto desempenho com Go.',
          'Monitorávamos a operação no ambiente de produção, fazendo troubleshooting com ferramentas como Dynatrace, Grafana e Prometheus. Desenvolvimento de pipelines com Jenkins, e administração e orquestração de contêineres com Kubernetes via OpenShift.',
        ],
      },
      'spc-brasil-taking': {
        role: 'Engenheiro de Software Java',
        place: 'Grande São Paulo · Presencial',
        text: [
          'Análise, documentação e desenvolvimento de POCs para atender aos requisitos dos clientes. Usávamos design sprints na maior parte do tempo para nos guiar e chegar ao resultado esperado. Desenvolvimento de demandas de back-end com módulos do Spring Framework (Boot, Cloud, Data, JDBC e Security) e de front-end com frameworks JavaScript como React e Angular. Nas duas frentes, a arquitetura era focada em microsserviços, seguindo boas práticas de implementação e escalabilidade.',
        ],
      },
      'casas-bahia-people-pro': {
        role: 'Analista e Desenvolvedor de Sistemas',
        place: 'Grande São Paulo · Presencial',
        text: [
          'Usamos módulos do Spring Framework como Spring Boot, Spring Data, Spring Security e Spring Cloud (Netflix OSS) para desenvolver microsserviços no ambiente AWS. Desenhamos a arquitetura da solução escolhida, documentada no Confluence. O versionamento é feito com Git e o deploy das aplicações com Jenkins, com as dependências dos projetos centralizadas no Nexus e a qualidade do código e a cobertura de testes medidas com o SonarQube. Seguimos TDD para minimizar bugs e manter as aplicações consistentes sem quebrar nenhuma parte do código. Para a gestão do ciclo de vida das aplicações, escolhemos o framework Scrum.',
        ],
      },
      'engineering-do-brasil': {
        role: 'Analista e Desenvolvedor de Sistemas',
        place: 'Grande São Paulo · Presencial',
        text: [
          'Análise de requisitos, elaboração de fluxogramas e documentação de acordo com as demandas do cliente. Desenvolvimento de aplicações na plataforma J2EE com ênfase em arquitetura SOA, além de aplicações web com JPA 2, JSF 2.2 e PrimeFaces 5.0. Transformações de XML com XSL, validação com XSD e criação e configuração de processos BPM.',
          'Damos suporte a sistemas legados, resolvendo chamados críticos de alto impacto, depurando o processamento de dados e corrigindo queries e stored procedures. Usamos Git com repositórios no GitLab e testes automatizados com JUnit 4 para garantir a integridade de cada funcionalidade.',
        ],
      },
      'smart-staff': {
        role: 'Desenvolvedor Java',
        place: 'São Caetano do Sul, Brasil · Presencial',
        text: [
          'Análise de requisitos, elaboração de fluxogramas e documentação de acordo com as demandas do cliente. Desenvolvimento de novas aplicações e suporte a sistemas legados na plataforma Java EE com JPA 2, JSF 2 e PrimeFaces, seguindo as metodologias ágeis Scrum e XP. Gestão do código-fonte com Git em repositórios no GitHub e testes unitários com JUnit 4 para garantir a integridade das funcionalidades de cada projeto.',
        ],
      },
    },
  },
  skills: {
    title: 'Tecnologias',
    clusterLoad: 'carga do cluster · 7 dias',
    groups: {
      languages: 'Linguagens e frameworks',
      identity: 'Identidade e segurança',
      aws: 'AWS',
      gcp: 'GCP',
      devops: 'DevOps e observabilidade',
      data: 'Mensageria, dados e ferramentas',
    },
    facts: [
      {
        label: 'Formação',
        title: 'FIAP',
        text: 'Graduação em Análise e Desenvolvimento de Sistemas · dezembro de 2014',
      },
      { label: 'Idiomas', title: 'Português, nativo', text: 'Inglês, C1 (avançado)' },
      {
        label: 'Práticas',
        title: 'TDD, SOLID, 80%+ de cobertura de testes',
        text: 'Code review, entrevistas técnicas, documentação de arquitetura',
      },
    ],
  },
  contact: {
    title: { before: 'Vamos construir algo ', highlight: 'seguro' },
    lead: 'Contratando para backend, cloud ou identidade? Me mande uma mensagem e eu retorno.',
    emailMe: 'Enviar e-mail',
    linkedIn: 'Conectar no LinkedIn',
    gitHub: 'Ver no GitHub',
    fields: { email: 'E-mail', phone: 'Telefone', linkedin: 'LinkedIn', github: 'GitHub', location: 'Moro em' },
    location: 'São Caetano do Sul, Brasil',
    copyField: (field) => `Copiar ${field.toLowerCase()}`,
    copied: 'Copiado para a área de transferência',
  },
  notFound: {
    title: 'Página não encontrada',
    text: 'A página que você procura não existe ou mudou de endereço.',
    home: 'Voltar ao início',
  },
};
