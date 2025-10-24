import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Trophy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WinModalProps {
  score: number;
  onClose: () => void;
}

const WinModal = ({ score, onClose }: WinModalProps) => {
  const [answer, setAnswer] = useState('');
  const { toast } = useToast();

  // Add global function to view answers in console
  useEffect(() => {
    (window as any).viewFunnyAnswers = () => {
      const answers = JSON.parse(localStorage.getItem('saiman-funny-answers') || '[]');
      console.log('='.repeat(50));
      console.log('📝 FUNNY ANSWERS FROM VISITORS:');
      console.log('='.repeat(50));
      if (answers.length === 0) {
        console.log('No answers yet!');
      } else {
        answers.forEach((item: any, index: number) => {
          console.log(`\n${index + 1}. Answer: "${item.answer}"`);
          console.log(`   Score: ${item.score}`);
          console.log(`   Date: ${new Date(item.timestamp).toLocaleString()}`);
        });
      }
      console.log('='.repeat(50));
      console.log(`Total responses: ${answers.length}`);
      console.log('='.repeat(50));
    };

    console.log('💡 Tip: Type "viewFunnyAnswers()" in console to see all visitor responses!');

    return () => {
      delete (window as any).viewFunnyAnswers;
    };
  }, []);

  const handleSubmit = () => {
    if (!answer.trim()) {
      toast({
        title: "Please enter an answer!",
        variant: "destructive"
      });
      return;
    }

    // Save answer to localStorage
    const answers = JSON.parse(localStorage.getItem('saiman-funny-answers') || '[]');
    answers.push({
      answer: answer.trim(),
      timestamp: new Date().toISOString(),
      score
    });
    localStorage.setItem('saiman-funny-answers', JSON.stringify(answers));

    toast({
      title: "Thanks for playing! 🎉",
      description: "Your answer has been recorded!"
    });

    console.log('✅ New answer recorded! Type "viewFunnyAnswers()" to see all responses.');
    setAnswer('');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm animate-in fade-in duration-300">
      <Card className="w-11/12 max-w-md p-8 arcade-border text-center">
        <Trophy className="w-16 h-16 mx-auto text-primary arcade-glow mb-4" />
        
        <h2 className="text-4xl font-bold text-primary arcade-glow mb-2">
          Congrats! 🎉
        </h2>
        
        <p className="text-xl text-foreground mb-4">
          You completed Manish's quest!
        </p>
        
        <p className="text-lg text-muted-foreground mb-2">
          Final Score: <span className="text-primary font-bold">{score}</span>
        </p>
        
        <div className="my-6 p-4 bg-accent/50 rounded-lg">
          <p className="text-base text-foreground mb-4 font-medium">
            🤔 Funny Question:
          </p>
          <p className="text-sm text-foreground mb-4">
            What do you think Manish's favorite debugging snack is?
          </p>
          <Input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer..."
            className="mb-3"
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
          <Button
            onClick={handleSubmit}
            className="w-full bg-primary hover:bg-primary/90"
          >
            Submit Answer
          </Button>
        </div>
        
        <Button
          onClick={onClose}
          variant="outline"
          className="w-full arcade-border"
        >
          Close
        </Button>
      </Card>
    </div>
  );
};

export default WinModal;
