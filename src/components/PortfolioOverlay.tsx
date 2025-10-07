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
      case 'basic-details':
        return {
          title: 'BASIC DETAILS',
          content: (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-primary arcade-glow">
                Sai Manish Ananthula
              </h2>
              <p className="text-lg text-muted-foreground">
                📍 Hyderabad, India
              </p>
              <p className="text-foreground leading-relaxed">
                Looking for a responsible and challenging position where I can use my expertise for the potential growth of the organization with opportunities to enrich my knowledge, experience, and skills while contributing my best.
              </p>
              <div className="pt-4 space-y-2">
                <h3 className="text-xl font-semibold mb-3 text-primary">Contact Links</h3>
                <div className="space-y-2">
                  <a href="mailto:saimanishsai19189@gmail.com" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                    <Mail className="w-4 h-4" /> saimanishsai19189@gmail.com
                  </a>
                  <a href="tel:+919959110929" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                    📱 +91 9959110929
                  </a>
                  <a href="https://github.com/SAIEE12" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                    <Github className="w-4 h-4" /> github.com/SAIEE12
                  </a>
                  <a href="https://leetcode.com/u/sai_manish/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                    💻 LeetCode Profile
                  </a>
                  <a href="https://www.linkedin.com/in/sai-manish-ananthula" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
                    <Linkedin className="w-4 h-4" /> linkedin.com/in/sai-manish-ananthula
                  </a>
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
                  <h3 className="text-xl font-bold text-primary mb-2">Trackon (2024 - Present)</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Managed version control and collaborative development using Git</li>
                    <li>Automated build and deployment CI/CD pipelines via Jenkins, cutting release cycles from 3 days to 1</li>
                    <li>Used Docker for containerized microservices, reducing environment setup time by ~80%</li>
                    <li>Increased deployment consistency and minimized production errors by ~60%</li>
                  </ul>
                </div>

                <div className="arcade-border rounded-md p-4">
                  <h3 className="text-xl font-bold text-primary mb-2">Management Portal (2024)</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Full-stack app using React + FastAPI + SQLAlchemy</li>
                    <li>Deployed on AWS/DigitalOcean</li>
                    <li>CI/CD integrated with Jenkins; backend worked with SQLite and MongoDB</li>
                    <li>Designed for internal office use to streamline admin operations</li>
                  </ul>
                </div>

                <div className="arcade-border rounded-md p-4">
                  <h3 className="text-xl font-bold text-primary mb-2">Flask-Powered Heart Health Predictor (2023)</h3>
                  <p className="text-sm text-muted-foreground">
                    ML model implementation with Python and Flask for backend integration
                  </p>
                </div>

                <div className="arcade-border rounded-md p-4">
                  <h3 className="text-xl font-bold text-primary mb-2">Android Student Security System App (2023)</h3>
                  <p className="text-sm text-muted-foreground">
                    Java Android app for real-time student safety with MySQL backend
                  </p>
                </div>
              </div>
            </div>
          ),
        };
      case 'experience':
        return {
          title: 'EXPERIENCE',
          content: (
            <div className="space-y-4">
              <div className="arcade-border rounded-md p-4">
                <h3 className="text-xl font-bold text-primary mb-1">Intern</h3>
                <p className="text-sm text-accent mb-2">Bitsilica, Hyderabad, India (2024 – Present)</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Developed full-stack web apps using React, FastAPI, SQLAlchemy, HTML/CSS, JavaScript on AWS and DigitalOcean</li>
                  <li>Implemented CI/CD pipelines with Jenkins for cloud deployment and automation</li>
                  <li>Managed SQL/NoSQL (SQLite, MongoDB)</li>
                  <li>Wrote test scripts using Pytest and performed manual QA testing</li>
                </ul>
              </div>

              <div className="arcade-border rounded-md p-4">
                <h3 className="text-xl font-bold text-primary mb-1">Junior Product Engineer Intern</h3>
                <p className="text-sm text-accent mb-2">Aubergine Design Works, Hyderabad, India (2024)</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Worked with cross-functional teams to deliver product features in agile sprints</li>
                </ul>
              </div>

              <div className="arcade-border rounded-md p-4">
                <h3 className="text-xl font-bold text-primary mb-1">Intern</h3>
                <p className="text-sm text-accent mb-2">Rejolt EdTech (2022)</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Built a personal portfolio with HTML, CSS, and JavaScript</li>
                  <li>Learned Git version control and basic software development practices</li>
                </ul>
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
                <h3 className="text-lg font-semibold mb-2 text-primary">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'Java', 'JavaScript', 'HTML', 'CSS', 'SQL'].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-accent text-accent-foreground rounded-md text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary">DevOps & Infrastructure</h3>
                <div className="flex flex-wrap gap-2">
                  {['Git', 'Docker', 'Jenkins', 'Kubernetes', 'Nginx', 'Apache', 'CI/CD Pipelines'].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-accent text-accent-foreground rounded-md text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary">Frameworks & Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {['FastAPI', 'Flask', 'React', 'Node.js', 'Ansible', 'Terraform', 'SonarQube'].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-accent text-accent-foreground rounded-md text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary">Databases</h3>
                <div className="flex flex-wrap gap-2">
                  {['SQLite', 'PostgreSQL', 'MongoDB', 'MySQL'].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-accent text-accent-foreground rounded-md text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary">Monitoring & Testing</h3>
                <div className="flex flex-wrap gap-2">
                  {['Grafana', 'Prometheus', 'Functional Testing', 'Manual Testing'].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-accent text-accent-foreground rounded-md text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2 text-primary">Cloud & Others</h3>
                <div className="flex flex-wrap gap-2">
                  {['AWS', 'DigitalOcean', 'Data Structures & Algorithms', 'REST APIs', 'Postman', 'Networking', 'Machine Learning'].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-accent text-accent-foreground rounded-md text-sm">
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
              <p className="text-foreground text-lg">
                Let's connect! Feel free to reach out through any of these channels.
              </p>
              <div className="space-y-3">
                <a
                  href="mailto:saimanishsai19189@gmail.com"
                  className="flex items-center gap-3 p-3 arcade-border rounded-md hover:bg-accent transition-colors"
                >
                  <Mail className="w-6 h-6 text-primary" />
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-sm text-muted-foreground">saimanishsai19189@gmail.com</div>
                  </div>
                </a>

                <a
                  href="tel:+919959110929"
                  className="flex items-center gap-3 p-3 arcade-border rounded-md hover:bg-accent transition-colors"
                >
                  <span className="text-2xl">📱</span>
                  <div>
                    <div className="font-semibold">Phone</div>
                    <div className="text-sm text-muted-foreground">+91 9959110929</div>
                  </div>
                </a>

                <a
                  href="https://github.com/SAIEE12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 arcade-border rounded-md hover:bg-accent transition-colors"
                >
                  <Github className="w-6 h-6 text-primary" />
                  <div>
                    <div className="font-semibold">GitHub</div>
                    <div className="text-sm text-muted-foreground">github.com/SAIEE12</div>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/sai-manish-ananthula"
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
