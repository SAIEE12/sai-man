import { X, Github, Linkedin, Mail, FileText, Download, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import ContactForm from './ContactForm';

interface PortfolioOverlayProps {
  zone: string | null;
  onClose: () => void;
}

const PortfolioOverlay = ({ zone, onClose }: PortfolioOverlayProps) => {
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
              <p className="text-foreground text-sm leading-relaxed">
                Results-driven Python Full Stack Developer with hands-on experience building scalable REST APIs, full-stack web applications, and backend systems using FastAPI, Flask, React.js, and PostgreSQL. Skilled in CI/CD automation via Jenkins, containerization with Docker, and cloud deployments on AWS and DigitalOcean.
              </p>
              <div className="mt-4 pt-4 border-t border-border space-y-2 text-sm">
                <h3 className="font-bold text-primary arcade-glow mb-1">EDUCATION</h3>
                <p className="text-accent font-semibold">B.Tech in Computer Science & Engineering</p>
                <p className="text-muted-foreground text-xs">Vardhaman College of Engineering | CGPA: 7.2 | 2020 – 2024</p>
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
              <Card className="arcade-border p-4 bg-accent/5 hover:bg-accent/10 transition-colors">
                <h3 className="text-xl font-bold text-primary mb-2 arcade-glow">Full-Stack Enterprise Platform</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Designed and built modular REST APIs with SQLAlchemy ORM, establishing clean data access layers. Containerized application stacks with Docker and configured Jenkins CI/CD pipelines.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">React.js</span>
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">FastAPI</span>
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">SQLAlchemy</span>
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">PostgreSQL</span>
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">Docker</span>
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">Jenkins</span>
                </div>
              </Card>

              <Card className="arcade-border p-4 bg-accent/5 hover:bg-accent/10 transition-colors">
                <h3 className="text-xl font-bold text-primary mb-2 arcade-glow">RBAC & Secure Data Architecture</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Built role-based access systems with Supabase authentication and fine-grained access control enforced through PostgreSQL Row Level Security (RLS) policies.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">React.js</span>
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">Supabase</span>
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">PostgreSQL</span>
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">RLS</span>
                </div>
              </Card>

              <Card className="arcade-border p-4 bg-accent/5 hover:bg-accent/10 transition-colors">
                <h3 className="text-xl font-bold text-primary mb-2 arcade-glow">Internal Tooling & Cloud Deployments</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Integrated FastAPI backend services with React.js frontends. Automated deployments via Jenkins CI/CD on AWS and DigitalOcean using MongoDB and SQLite.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">React.js</span>
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">FastAPI</span>
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">MongoDB</span>
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">AWS</span>
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">DigitalOcean</span>
                </div>
              </Card>

              <Card className="arcade-border p-4 bg-accent/5 hover:bg-accent/10 transition-colors">
                <h3 className="text-xl font-bold text-primary mb-2 arcade-glow">REST API & Backend Services</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Developed RESTful Flask backend APIs with structured JSON request/response handling and comprehensive input validation. Tested extensively using Postman.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">Python</span>
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">Flask</span>
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">REST APIs</span>
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">Postman</span>
                </div>
              </Card>
            </div>
          ),
        };
      case 'experience':
        return {
          title: 'EXPERIENCE',
          content: (
            <div className="space-y-3">
              <Card className="arcade-border p-4 bg-accent/5">
                <h3 className="text-xl font-bold text-primary mb-1 arcade-glow">Software Engineer</h3>
                <p className="text-sm text-accent mb-2">Bitsilica Pvt. Ltd. • 2024 – Present</p>
                <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Architected object-oriented, modular REST APIs using FastAPI</li>
                  <li>Built enterprise-grade full-stack web applications using React.js and PostgreSQL</li>
                  <li>Implemented secure authentication, role-based access control (RBAC), and PostgreSQL RLS</li>
                  <li>Containerized apps with Docker and set up automated Jenkins CI/CD workflows</li>
                  <li>Deployed and managed production cloud configurations on AWS and DigitalOcean</li>
                  <li>Troubleshot and debugged production logs and database queries</li>
                </ul>
              </Card>
            </div>
          ),
        };
      case 'skills':
        return {
          title: 'SKILLS',
          content: (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary arcade-glow">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'JavaScript', 'TypeScript', 'Java', 'SQL'].map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-primary/20 text-primary rounded-md text-sm font-medium arcade-border">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary arcade-glow">Backend & Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  {['FastAPI', 'Flask', 'React.js', 'Node.js', 'HTML', 'CSS', 'Tailwind CSS'].map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-primary/20 text-primary rounded-md text-sm font-medium arcade-border">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary arcade-glow">Databases & DevOps</h3>
                <div className="flex flex-wrap gap-2">
                  {['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite', 'Supabase', 'Docker', 'Jenkins', 'CI/CD', 'AWS', 'DigitalOcean'].map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-primary/20 text-primary rounded-md text-sm font-medium arcade-border">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary arcade-glow">Concepts & Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {['SQLAlchemy', 'RLS', 'RBAC', 'Pytest', 'Postman', 'OOP', 'SOLID Principles', 'Git', 'DSA'].map(skill => (
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
              <p className="text-foreground">
                Let's connect! Send me a message or reach out through these channels.
              </p>
              <ContactForm />
              <div className="pt-4 border-t border-border space-y-2">
                <h3 className="text-lg font-semibold mb-3 text-primary">Or contact me via:</h3>
                <a
                  href="mailto:saimanishmail@gmail.com"
                  className="flex items-center gap-3 p-2 hover:text-primary transition-colors text-sm"
                >
                  <Mail className="w-5 h-5" />
                  <span>saimanishmail@gmail.com</span>
                </a>
                <a
                  href="https://github.com/SAIEE12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 hover:text-primary transition-colors text-sm"
                >
                  <Github className="w-5 h-5" />
                  <span>github.com/SAIEE12</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/sai-manish-ananthula"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2 hover:text-primary transition-colors text-sm"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn Profile</span>
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

  if (!zone) return null;

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
