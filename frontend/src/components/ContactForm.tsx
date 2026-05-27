import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '@/hooks/use-toast';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Build mailto link
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoLink = `mailto:saimanishmail@gmail.com?subject=${subject}&body=${body}`;

    // Open in new tab — keeps user on the page
    window.open(mailtoLink, '_blank');

    toast({
      title: '✅ Email client opened!',
      description: 'Your message is pre-filled. Hit Send in your email app!',
    });

    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium mb-2">
          Name
        </label>
        <Input
          id="contact-name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="w-full"
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <Input
          id="contact-email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="w-full"
          placeholder="your.email@example.com"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium mb-2">
          Message
        </label>
        <Textarea
          id="contact-message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
          className="w-full min-h-[120px]"
          placeholder="Your message..."
        />
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {isSubmitting ? 'Opening...' : 'Send Message'}
      </Button>
    </form>
  );
};

export default ContactForm;
