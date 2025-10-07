import { X, Github, Linkedin, Mail, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface PortfolioOverlayProps {
  zone: string | null;
  onClose: () => void;
}

const PortfolioOverlay = ({ zone, onClose }: PortfolioOverlayProps) => {
  if (!zone) return null;

  const getContent = () => {
    switch (zone) {
      case 'about':
        return {
          title: 'ABOUT ME',
          content: (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-primary arcade-glow">
                Sai Manish Ananthula
              </h2>
              <p className="text-lg text-muted-foreground">
                Full-Stack & DevOps Engineer
              </p>
              <p className="text-foreground">
                Passionate about building scalable applications and automating infrastructure. 
                Experienced in cloud technologies, microservices architecture, and modern web development.
              </p>
              <div className="pt-4">
                <h3 className="text-xl font-semibold mb-2 text-primary">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Node.js', 'Docker', 'Kubernetes', 'AWS', 'TypeScript', 'Python', 'CI/CD'].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-accent text-accent-foreground rounded-md text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ),
        };
      case 'projects':
        return {
          title: 'PROJECTS',
          content: (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="arcade-border rounded-md p-4">
                  <h3 className="text-xl font-bold text-primary mb-2">Cloud Infrastructure Platform</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Automated deployment pipeline with Kubernetes and Terraform
                  </p>
                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-1 bg-muted rounded">Kubernetes</span>
                    <span className="text-xs px-2 py-1 bg-muted rounded">Terraform</span>
                    <span className="text-xs px-2 py-1 bg-muted rounded">AWS</span>
                  </div>
                </div>

                <div className="arcade-border rounded-md p-4">
                  <h3 className="text-xl font-bold text-primary mb-2">Real-Time Analytics Dashboard</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Microservices-based analytics platform with React and Node.js
                  </p>
                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-1 bg-muted rounded">React</span>
                    <span className="text-xs px-2 py-1 bg-muted rounded">Node.js</span>
                    <span className="text-xs px-2 py-1 bg-muted rounded">Redis</span>
                  </div>
                </div>

                <div className="arcade-border rounded-md p-4">
                  <h3 className="text-xl font-bold text-primary mb-2">DevOps Automation Suite</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Complete CI/CD pipeline with monitoring and logging
                  </p>
                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-1 bg-muted rounded">Jenkins</span>
                    <span className="text-xs px-2 py-1 bg-muted rounded">Docker</span>
                    <span className="text-xs px-2 py-1 bg-muted rounded">Grafana</span>
                  </div>
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
              <p className="text-foreground text-lg">
                Let's connect! Feel free to reach out through any of these channels.
              </p>
              <div className="space-y-3">
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 arcade-border rounded-md hover:bg-accent transition-colors"
                >
                  <Github className="w-6 h-6 text-primary" />
                  <div>
                    <div className="font-semibold">GitHub</div>
                    <div className="text-sm text-muted-foreground">@yourusername</div>
                  </div>
                </a>

                <a
                  href="https://linkedin.com/in/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 arcade-border rounded-md hover:bg-accent transition-colors"
                >
                  <Linkedin className="w-6 h-6 text-primary" />
                  <div>
                    <div className="font-semibold">LinkedIn</div>
                    <div className="text-sm text-muted-foreground">Sai Manish Ananthula</div>
                  </div>
                </a>

                <a
                  href="mailto:your.email@example.com"
                  className="flex items-center gap-3 p-3 arcade-border rounded-md hover:bg-accent transition-colors"
                >
                  <Mail className="w-6 h-6 text-primary" />
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-sm text-muted-foreground">your.email@example.com</div>
                  </div>
                </a>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 arcade-border rounded-md hover:bg-accent transition-colors"
                >
                  <FileText className="w-6 h-6 text-primary" />
                  <div>
                    <div className="font-semibold">Resume</div>
                    <div className="text-sm text-muted-foreground">Download PDF</div>
                  </div>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm animate-in fade-in duration-200">
      <Card className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto m-4 p-6 arcade-border">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-primary hover:bg-accent"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>
        
        <h1 className="text-3xl font-bold mb-6 text-primary arcade-glow">
          {title}
        </h1>
        
        {content}
        
        <div className="mt-6 pt-6 border-t border-border">
          <Button 
            onClick={onClose}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 arcade-glow"
          >
            BACK TO GAME
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PortfolioOverlay;
