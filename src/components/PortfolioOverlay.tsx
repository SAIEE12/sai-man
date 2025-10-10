import { X, Github, Linkedin, Mail, FileText, Download } from 'lucide-react';
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
                Full-Stack Developer | DevOps Intern @ BITSILICA
              </p>
              <p className="text-foreground leading-relaxed">
                Passionate about building real-world web applications with FastAPI, React, PostgreSQL, and Docker. 
                Experienced in CI/CD pipelines, cloud deployment, and full-stack development.
              </p>
              <Button
                asChild
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 arcade-glow mt-4"
              >
                <a
                  href="https://github.com/SAIEE12/sai-man/raw/main/Sai_Manish_Ananthula_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </a>
              </Button>
            </div>
          ),
        };
      case 'projects':
        return {
          title: 'PROJECTS',
          content: (
            <div className="space-y-3">
              <Card className="arcade-border p-4 bg-accent/5 hover:bg-accent/10 transition-colors">
                <h3 className="text-xl font-bold text-primary mb-2 arcade-glow">TrackOn</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  FastAPI + React based project management app with real-time collaboration features
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">FastAPI</span>
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">React</span>
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">PostgreSQL</span>
                </div>
              </Card>

              <Card className="arcade-border p-4 bg-accent/5 hover:bg-accent/10 transition-colors">
                <h3 className="text-xl font-bold text-primary mb-2 arcade-glow">Sai-Man</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  This interactive Pac-Man style portfolio game you're playing right now!
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">React</span>
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">Phaser 3</span>
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">TypeScript</span>
                </div>
              </Card>

              <Card className="arcade-border p-4 bg-accent/5 hover:bg-accent/10 transition-colors">
                <h3 className="text-xl font-bold text-primary mb-2 arcade-glow">Requirements Manager</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Full-stack requirements tracking system with advanced filtering and analytics
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">FastAPI</span>
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">PostgreSQL</span>
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">TypeScript</span>
                </div>
              </Card>

              <Card className="arcade-border p-4 bg-accent/5 hover:bg-accent/10 transition-colors">
                <h3 className="text-xl font-bold text-primary mb-2 arcade-glow">Saarthi.AI</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Empathetic AI Voice Agent for mental health support and conversation
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">AI/ML</span>
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">Voice</span>
                  <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">Python</span>
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
                <h3 className="text-xl font-bold text-primary mb-1 arcade-glow">DevOps Intern</h3>
                <p className="text-sm text-accent mb-2">Bitsilica • May 2025 – Present</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Automated CI/CD pipelines using Jenkins and Docker</li>
                  <li>Managed infrastructure with Terraform on AWS</li>
                  <li>Implemented Git workflows for team collaboration</li>
                  <li>Reduced deployment time by 70% through automation</li>
                </ul>
              </Card>

              <Card className="arcade-border p-4 bg-accent/5">
                <h3 className="text-xl font-bold text-primary mb-1 arcade-glow">SDE Intern</h3>
                <p className="text-sm text-accent mb-2">Aubergine Design Works</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Built scalable APIs using FastAPI and PostgreSQL</li>
                  <li>Managed frontend integration with React</li>
                  <li>Collaborated in agile sprints with cross-functional teams</li>
                </ul>
              </Card>

              <Card className="arcade-border p-4 bg-accent/5">
                <h3 className="text-xl font-bold text-primary mb-1 arcade-glow">Intern</h3>
                <p className="text-sm text-accent mb-2">Rejolt EdTech</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Contributed to full-stack features using FastAPI and PostgreSQL</li>
                  <li>Developed educational platform features</li>
                  <li>Learned modern web development practices</li>
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
                  {['Python', 'JavaScript', 'TypeScript'].map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-primary/20 text-primary rounded-md text-sm font-medium arcade-border">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary arcade-glow">Frameworks</h3>
                <div className="flex flex-wrap gap-2">
                  {['FastAPI', 'React', 'Flask'].map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-primary/20 text-primary rounded-md text-sm font-medium arcade-border">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary arcade-glow">DevOps Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {['Docker', 'Jenkins', 'Terraform', 'AWS', 'Git'].map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-primary/20 text-primary rounded-md text-sm font-medium arcade-border">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary arcade-glow">Databases</h3>
                <div className="flex flex-wrap gap-2">
                  {['PostgreSQL', 'Neo4j', 'MongoDB'].map(skill => (
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
                  href="mailto:saimanishsai19189@gmail.com"
                  className="flex items-center gap-3 p-2 hover:text-primary transition-colors text-sm"
                >
                  <Mail className="w-5 h-5" />
                  <span>saimanishsai19189@gmail.com</span>
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
