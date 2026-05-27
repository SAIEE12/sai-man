import { useState } from 'react';
import { X, Github, Linkedin, Mail, Download, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import ContactForm from './ContactForm';

interface PortfolioOverlayProps {
  zone: string | null;
  onClose: () => void;
}

const PortfolioOverlay = ({ zone, onClose }: PortfolioOverlayProps) => {
  const [expandedContribution, setExpandedContribution] = useState<number | null>(null);

  if (!zone) return null;

  const getContent = () => {
    switch (zone) {
      case 'basic-details':
        return {
          title: 'BASIC DETAILS',
          content: (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-primary arcade-glow">
                Sai Manish Ananthula
              </h2>
              <p className="text-lg font-semibold text-accent">
                Python Full Stack Developer
              </p>
              <p className="text-foreground text-xs leading-relaxed text-justify">
                Results-driven Python Full Stack Developer with hands-on experience building scalable REST APIs, full-stack web applications, and production-grade backend systems using FastAPI, Flask, React.js, and PostgreSQL. Skilled in OOP backend architecture, SQLAlchemy ORM design, authentication and RBAC implementation, and cloud deployments on AWS and DigitalOcean. Proven track record of debugging and stabilising production systems across frontend, backend, and database layers. Adept at CI/CD automation via Jenkins, containerisation with Docker, and delivering clean, maintainable code following SOLID principles.
              </p>
              
              <div className="mt-2 pt-2 border-t border-border space-y-1 text-sm">
                <h3 className="font-bold text-primary arcade-glow text-xs tracking-wider">EDUCATION</h3>
                <p className="text-accent font-semibold text-xs">Bachelor of Technology (B.Tech) – Computer Science and Engineering</p>
                <p className="text-muted-foreground text-[11px]">Vardhaman College of Engineering, Hyderabad | CGPA: 7.2 | 2020 – 2024</p>
              </div>

              <div className="mt-2 pt-2 border-t border-border space-y-1 text-sm">
                <h3 className="font-bold text-primary arcade-glow text-xs tracking-wider">LEADERSHIP & EXTRACURRICULAR</h3>
                <ul className="text-muted-foreground text-[11px] list-disc list-inside space-y-0.5">
                  <li>Volunteered at TEDx — recognised for contribution and coordination within the organising committee.</li>
                  <li>Participated in multiple hackathons, collaborating with cross-functional teams to deliver functional technical solutions under time constraints.</li>
                  <li>Actively contributed to debugging, deployment, and production support activities within team environments.</li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <Button
                  asChild
                  variant="outline"
                  className="w-full arcade-border hover:bg-accent"
                >
                  <a
                    href="/resume.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </a>
                </Button>
                <Button
                  asChild
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 arcade-glow"
                >
                  <a
                    href="/Sai_Manish_Resume.pdf"
                    download="Sai_Manish_Resume.pdf"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </a>
                </Button>
              </div>
            </div>
          ),
        };
      case 'projects':
        return {
          title: 'KEY PROJECTS',
          content: (
            <div className="space-y-3">
              {/* Project 1 */}
              <Card className="arcade-border p-4 bg-accent/5 hover:bg-accent/10 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-base font-bold text-primary arcade-glow">SAI-MAN Portfolio</h3>
                  <span className="text-[10px] px-2 py-0.5 bg-yellow-500/20 text-yellow-500 border border-yellow-500/40 rounded font-mono font-bold">Featured</span>
                </div>
                <p className="text-[11px] text-muted-foreground mb-2 leading-relaxed text-justify">
                  An interactive Pac-Man style portfolio built with Phaser 3 and React 18. Play the game to explore my experience, projects, skills, and contact info.
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {['Phaser 3', 'React 18', 'TypeScript', 'Vite', 'Tailwind CSS'].map(t => (
                    <span key={t} className="px-1.5 py-0.5 bg-primary/20 text-primary text-[10px] rounded font-mono">{t}</span>
                  ))}
                </div>
                <div className="flex gap-3 text-[11px] font-mono">
                  <a href="https://saimanish.vercel.app" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                    [Link]
                  </a>
                  <a href="https://github.com/SAIEE12/sai-man" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                    [GitHub]
                  </a>
                </div>
              </Card>

              {/* Project 2 */}
              <Card className="arcade-border p-4 bg-accent/5 hover:bg-accent/10 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-base font-bold text-primary arcade-glow">Full-Stack Enterprise Platform</h3>
                  <span className="text-[10px] px-2 py-0.5 bg-green-500/20 text-green-400 border border-green-500/40 rounded font-mono font-bold">Production</span>
                </div>
                <p className="text-[11px] text-muted-foreground mb-2 leading-relaxed text-justify">
                  Enterprise-grade web platform with modular REST APIs, role-based access control, and automated CI/CD deployment pipeline.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {['React.js', 'TypeScript', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'Docker', 'Jenkins'].map(t => (
                    <span key={t} className="px-1.5 py-0.5 bg-primary/20 text-primary text-[10px] rounded font-mono">{t}</span>
                  ))}
                </div>
              </Card>

              {/* Project 3 */}
              <Card className="arcade-border p-4 bg-accent/5 hover:bg-accent/10 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-base font-bold text-primary arcade-glow">Secure Multi-Tenant Data Architecture</h3>
                  <span className="text-[10px] px-2 py-0.5 bg-green-500/20 text-green-400 border border-green-500/40 rounded font-mono font-bold">Production</span>
                </div>
                <p className="text-[11px] text-muted-foreground mb-2 leading-relaxed text-justify">
                  Multi-tenant application with Supabase authentication, PostgreSQL Row Level Security policies, and complete audit trail for entity lifecycle events.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {['React.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'RLS'].map(t => (
                    <span key={t} className="px-1.5 py-0.5 bg-primary/20 text-primary text-[10px] rounded font-mono">{t}</span>
                  ))}
                </div>
              </Card>

              {/* Project 4 */}
              <Card className="arcade-border p-4 bg-accent/5 hover:bg-accent/10 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-base font-bold text-primary arcade-glow">Cloud Automation & Internal Tooling</h3>
                  <span className="text-[10px] px-2 py-0.5 bg-green-500/20 text-green-400 border border-green-500/40 rounded font-mono font-bold">Production</span>
                </div>
                <p className="text-[11px] text-muted-foreground mb-2 leading-relaxed text-justify">
                  Internal tooling platform integrating FastAPI services with React frontends, multi-database persistence, and Jenkins-automated deployments on AWS and DigitalOcean.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {['React.js', 'FastAPI', 'MongoDB', 'SQLite', 'Docker', 'Jenkins', 'AWS', 'DigitalOcean'].map(t => (
                    <span key={t} className="px-1.5 py-0.5 bg-primary/20 text-primary text-[10px] rounded font-mono">{t}</span>
                  ))}
                </div>
              </Card>

              {/* Project 5 */}
              <Card className="arcade-border p-4 bg-accent/5 hover:bg-accent/10 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-base font-bold text-primary arcade-glow">RESTful API Suite (Flask)</h3>
                  <span className="text-[10px] px-2 py-0.5 bg-green-500/20 text-green-400 border border-green-500/40 rounded font-mono font-bold">Production</span>
                </div>
                <p className="text-[11px] text-muted-foreground mb-2 leading-relaxed text-justify">
                  Collection of RESTful Flask APIs with structured request/response handling, modular domain logic, and thorough Postman test coverage.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {['Python', 'Flask', 'REST APIs', 'Postman'].map(t => (
                    <span key={t} className="px-1.5 py-0.5 bg-primary/20 text-primary text-[10px] rounded font-mono">{t}</span>
                  ))}
                </div>
              </Card>
            </div>
          ),
        };
      case 'experience':
        return {
          title: 'EXPERIENCE',
          content: (
            <div className="space-y-4">
              <Card className="arcade-border p-4 bg-accent/5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-1 arcade-glow">Software Engineer</h3>
                    <p className="text-xs text-accent font-semibold">Bitsilica Pvt. Ltd. • Hyderabad, India</p>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 bg-primary/20 text-primary border border-primary/40 rounded-full font-mono font-bold">2024 – Pres.</span>
                </div>
                
                <h4 className="font-bold text-primary text-xs mt-3 mb-1.5 uppercase tracking-wider">Responsibilities</h4>
                <ul className="text-[11px] text-muted-foreground space-y-1 list-disc list-inside leading-relaxed text-justify">
                  <li>Architected and developed object-oriented, modular REST APIs using FastAPI with clean separation of concerns, enabling scalable and maintainable backend services.</li>
                  <li>Built full-stack web applications using React.js, TypeScript, FastAPI, SQLAlchemy ORM, and PostgreSQL supporting enterprise workflows.</li>
                  <li>Designed and implemented secure authentication systems, RBAC, and backend validation mechanisms to enforce data security policies.</li>
                  <li>Engineered optimised relational database schemas and managed SQLAlchemy ORM integrations, improving query efficiency and data integrity across production systems.</li>
                  <li>Performed root-cause analysis, log inspection, and production troubleshooting across frontend, backend, database, and cloud environments.</li>
                  <li>Developed cron-based automation utilities and backend operational workflows, reducing manual intervention for recurring business processes.</li>
                  <li>Containerised applications using Docker and deployed on AWS and DigitalOcean; integrated Jenkins CI/CD pipelines for automated deployment workflows.</li>
                  <li>Implemented Supabase authentication, PostgreSQL storage, and Row Level Security (RLS) policies for granular, policy-driven data access in multi-tenant applications.</li>
                  <li>Conducted thorough API testing and debugging using Postman and Pytest, ensuring correctness and performance of backend services in pre-production environments.</li>
                  <li>Collaborated via Git-based workflows, peer code reviews, and Agile sprint planning to deliver features on schedule.</li>
                </ul>
              </Card>

              <div>
                <h4 className="font-bold text-primary text-xs mb-2 uppercase tracking-wider arcade-glow">Key Contributions</h4>
                <div className="space-y-2">
                  {[
                    {
                      title: "Full-Stack Enterprise Platform Development",
                      tech: "React.js · TypeScript · FastAPI · SQLAlchemy · PostgreSQL · Docker · Jenkins",
                      bullets: [
                        "Designed and built modular REST APIs with SQLAlchemy ORM, establishing clean data access layers across multiple enterprise-grade applications.",
                        "Managed PostgreSQL schema design and migrations with robust backend validation logic.",
                        "Containerised application stacks with Docker and configured Jenkins CI/CD pipelines.",
                        "Resolved production-level API and database bottlenecks through systematic debugging, significantly improving system reliability and uptime."
                      ]
                    },
                    {
                      title: "Role-Based Access Control & Secure Data Architecture",
                      tech: "React.js · TypeScript · Supabase · PostgreSQL · Row Level Security",
                      bullets: [
                        "Built role-based access systems with Supabase authentication and fine-grained access control enforced through PostgreSQL RLS policies.",
                        "Designed scalable database schemas with audit tracking mechanisms, ensuring full traceability of entity lifecycle events in production.",
                        "Resolved complex authentication, data persistence, and access-control issues in production, improving system stability and end-user experience."
                      ]
                    },
                    {
                      title: "Internal Tooling, Automation & Cloud Deployments",
                      tech: "React.js · FastAPI · MongoDB · SQLite · Jenkins · AWS · Docker",
                      bullets: [
                        "Integrated FastAPI backend services with React.js frontends to streamline internal operational workflows across teams.",
                        "Configured Jenkins CI/CD pipelines and automated deployment processes; Dockerised services and managed AWS and DigitalOcean deployment configurations.",
                        "Implemented multi-database persistence strategies using MongoDB and SQLite."
                      ]
                    },
                    {
                      title: "REST API Development & Backend Services",
                      tech: "Python · Flask · REST APIs · Postman",
                      bullets: [
                        "Developed RESTful Flask backend APIs with structured JSON request/response handling and comprehensive input validation.",
                        "Integrated domain logic into modular API services for long-term maintainability.",
                        "Performed thorough API testing and edge-case validation using Postman."
                      ]
                    }
                  ].map((contrib, i) => {
                    const isExpanded = expandedContribution === i;
                    return (
                      <Card 
                        key={i} 
                        className="arcade-border p-3 bg-accent/5 hover:bg-accent/10 transition-colors cursor-pointer"
                        onClick={() => setExpandedContribution(isExpanded ? null : i)}
                      >
                        <div className="flex justify-between items-center">
                          <h5 className="font-bold text-accent text-xs">{contrib.title}</h5>
                          <span className="text-primary text-xs font-mono font-bold">{isExpanded ? '[-]' : '[+]'}</span>
                        </div>
                        <p className="text-[10px] text-primary/70 mt-1 font-mono">{contrib.tech}</p>
                        
                        {isExpanded && (
                          <ul className="mt-2 text-[10px] text-muted-foreground list-disc list-inside space-y-1 border-t border-border/30 pt-2 leading-relaxed text-justify animate-in fade-in duration-200">
                            {contrib.bullets.map((b, idx) => (
                              <li key={idx}>{b}</li>
                            ))}
                          </ul>
                        )}
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          ),
        };
      case 'skills':
        return {
          title: 'SKILLS',
          content: (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary arcade-glow">Backend</h3>
                <div className="flex flex-wrap gap-2">
                  {['FastAPI', 'Flask', 'Node.js', 'Python'].map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-primary/20 text-primary rounded-md text-sm font-medium arcade-border">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary arcade-glow">Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  {['React.js', 'TypeScript', 'Tailwind CSS'].map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-primary/20 text-primary rounded-md text-sm font-medium arcade-border">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary arcade-glow">Databases</h3>
                <div className="flex flex-wrap gap-2">
                  {['PostgreSQL', 'MongoDB', 'SQLite', 'Supabase'].map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-primary/20 text-primary rounded-md text-sm font-medium arcade-border">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary arcade-glow">DevOps</h3>
                <div className="flex flex-wrap gap-2">
                  {['Docker', 'Jenkins', 'AWS', 'DigitalOcean', 'Nginx'].map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-primary/20 text-primary rounded-md text-sm font-medium arcade-border">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary arcade-glow">Auth & ORM</h3>
                <div className="flex flex-wrap gap-2">
                  {['SQLAlchemy', 'JWT', 'RBAC', 'RLS', 'Supabase Auth'].map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-primary/20 text-primary rounded-md text-sm font-medium arcade-border">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary arcade-glow">Testing</h3>
                <div className="flex flex-wrap gap-2">
                  {['Pytest', 'Postman', 'REST API Design'].map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-primary/20 text-primary rounded-md text-sm font-medium arcade-border">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ),
        };
      case 'contact':
        return {
          title: 'CONTACT',
          content: (
            <div className="space-y-6">
              <p className="text-foreground text-sm">
                Let's connect! Send me a message or reach out through these channels.
              </p>
              <ContactForm />
              <div className="pt-4 border-t border-border space-y-2">
                <h3 className="text-base font-semibold mb-3 text-primary">Or contact me via:</h3>
                
                <a
                  href="mailto:saimanishmail@gmail.com"
                  className="flex items-center gap-3 p-2 hover:text-primary transition-colors text-sm"
                >
                  <Mail className="w-5 h-5 text-accent" />
                  <span>saimanishmail@gmail.com</span>
                </a>
                
                <div className="flex items-center gap-3 p-2 text-sm text-foreground">
                  <span className="flex items-center justify-center w-5 h-5 text-accent font-bold">📞</span>
                  <span>+91 9959110929</span>
                </div>
                
                <div className="flex items-center gap-3 p-2 text-sm text-foreground">
                  <span className="flex items-center justify-center w-5 h-5 text-accent font-bold">📍</span>
                  <span>Hyderabad, India</span>
                </div>

                <a
                  href="https://github.com/SAIEE12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 hover:text-primary transition-colors text-sm"
                >
                  <Github className="w-5 h-5 text-accent" />
                  <span>github.com/SAIEE12</span>
                </a>
                
                <a
                  href="https://www.linkedin.com/in/sai-manish-ananthula"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 hover:text-primary transition-colors text-sm"
                >
                  <Linkedin className="w-5 h-5 text-accent" />
                  <span>LinkedIn Profile</span>
                </a>

                <a
                  href="https://saimanish.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 hover:text-primary transition-colors text-sm"
                >
                  <span className="flex items-center justify-center w-5 h-5 text-accent font-bold">🌐</span>
                  <span>saimanish.vercel.app</span>
                </a>
              </div>
            </div>
          ),
        };
      default:
        return { title: '', content: null };
    }
  };

  const { title, content } = getContent();

  return (
    <div className="flex-shrink-0 w-96 animate-in slide-in-from-right duration-300">
      <Card className="relative h-[600px] overflow-y-auto p-6 arcade-border bg-card/95 backdrop-blur-sm">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-primary hover:bg-accent"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>
        
        <h1 className="text-2xl font-bold mb-6 text-primary arcade-glow pr-12">
          {title}
        </h1>
        
        <div className="space-y-4">
          {content}
        </div>
        
        <div className="mt-6 pt-6 border-t border-border sticky bottom-0 bg-card">
          <Button 
            onClick={onClose}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 arcade-glow"
          >
            CLOSE
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PortfolioOverlay;
