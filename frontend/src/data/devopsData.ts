export const devopsTooltipMap: Record<string, string> = {
  'FastAPI': 'FastAPI is a modern, high-performance web framework for building APIs with Python.',
  'Flask': 'Flask is a lightweight, easy-to-use Python framework for building web services.',
  'PostgreSQL': 'PostgreSQL is a powerful, reliable database system that safely stores application data.',
  'Docker': 'Docker packages applications into standalone containers so they run exactly the same way on any machine.',
  'Jenkins': 'Jenkins is an automation server that automatically builds, tests, and deploys code whenever changes are pushed.',
  'CI/CD': 'CI/CD (Continuous Integration & Continuous Delivery) automatically tests and publishes updates.',
  'AWS': 'Amazon Web Services (AWS) is a massive cloud platform used to host servers, databases, and scale websites globally.',
  'DigitalOcean': 'DigitalOcean is a user-friendly cloud provider used to host and manage virtual private servers.',
  'SQLAlchemy': 'SQLAlchemy is a Python library that connects code to relational databases using Object-Relational Mapping (ORM).',
  'RBAC': 'Role-Based Access Control limits what features a user can see depending on their job role (e.g., admin vs. guest).',
  'RLS': 'Row Level Security is a database security system that ensures users can only read or edit data they explicitly own.',
  'Supabase': 'Supabase is a complete cloud backend suite providing authentication, databases, and instant APIs.',
  'Nginx': 'Nginx is a highly efficient web server that routes internet traffic to the correct backend services.',
  'MongoDB': 'MongoDB is a document database that stores data in flexible, JSON-like documents.',
  'SQLite': 'SQLite is a simple, lightweight SQL database engine contained in a single local file.',
  'Vite': 'Vite is a modern, lightning-fast build tool and development server for frontend web apps.',
  'React.js': 'React.js is a popular library built by Meta for creating interactive and dynamic user interfaces.',
  'TypeScript': 'TypeScript is a typed version of JavaScript that catches errors early during development.',
  'Postman': 'Postman is a popular application used for designing, testing, and debugging APIs.',
  'REST APIs': 'REST APIs are standardized endpoints that allow different web applications to securely talk to each other.'
};

export const recruiterTranslationMap: Record<string, string> = {
  'FastAPI': 'Speedy Web Services',
  'Flask': 'Web Micro-services',
  'PostgreSQL': 'Secure Database',
  'Docker': 'App Containerizer',
  'Jenkins': 'Auto-Deployment Agent',
  'CI/CD': 'Automated Deployments',
  'AWS': 'Amazon Cloud Platform',
  'DigitalOcean': 'DigitalOcean Cloud',
  'SQLAlchemy': 'Database Linker',
  'RBAC': 'Role Security Controls',
  'RLS': 'Database Data Security',
  'Supabase': 'Instant Backend Service',
  'Nginx': 'Traffic Router',
  'MongoDB': 'Flexible NoSQL Database',
  'SQLite': 'Lightweight Database',
  'Vite': 'Superfast Build Utility',
  'React.js': 'Interactive UI Builder',
  'TypeScript': 'Secure Coding Language',
  'Postman': 'API Testing Suite',
  'REST APIs': 'Secure API Integrations'
};

export const funnyContainers = [
  { id: '4a8b7c9d', image: 'pacman-ai:latest', status: 'Up 4 minutes', name: 'blinky-direct-chase' },
  { id: '2f3e8a1d', image: 'caffeine-injector:v2', status: 'Up 2 hours', name: 'coder-fuel' },
  { id: '9e1d8c7a', image: 'jenkins-coffee-spiller:stable', status: 'Exited (0) 5 mins ago', name: 'nightly-panic' },
  { id: '7c6b5a4d', image: 'postgres-rls-guard:secure', status: 'Up 11 minutes', name: 'data-vault' }
];

export const fakeCommits = [
  { hash: '7d8e86f', message: 'fix: resolve ghost infinite-snapping center trap' },
  { hash: 'ea3019b', message: 'feat: add 5th power pellet at bottom-center' },
  { hash: '2707895', message: 'fix: resolve contact button overlay overlapping' },
  { hash: '2853559', message: 'refactor: position controls at top-left' }
];
