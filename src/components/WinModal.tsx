import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Trophy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SavedAnswer {
  question: string;
  answer: string;
  timestamp: string;
  score: number;
}

interface WinModalProps {
  score: number;
  onClose: () => void;
}

const WinModal = ({ score, onClose }: WinModalProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const { toast } = useToast();

  // Random funny questions with emoji choices
  const funnyQuestions = [
    {
      question: "If Manish were a bug, would you fix him or feature him? 😄",
      options: ["🔧 Fix him!", "⭐ Feature him!", "🐛 Keep as is", "❓ Not sure"]
    },
    {
      question: "Rate Manish's Pac-Man skills from 1 (noob) to 10 (pro). 🎮",
      options: ["1️⃣ Noob", "5️⃣ Average", "8️⃣ Good", "🔟 Pro"]
    },
    {
      question: "What's Manish's favorite debugging snack? 🍕",
      options: ["🍕 Pizza", "☕ Coffee", "🍪 Cookies", "🧠 Brain food"]
    },
    {
      question: "If Manish could code in any language (including alien), which would he choose? 👽",
      options: ["🐍 Python", "👽 Alien++", "☕ Java", "🦀 Rust"]
    }
  ];

  const [currentQuestion] = useState(() => 
    funnyQuestions[Math.floor(Math.random() * funnyQuestions.length)]
  );

  // Add global function to view answers in console
  useEffect(() => {
    (window as unknown as { viewFunnyAnswers: () => void }).viewFunnyAnswers = () => {
      const answers: SavedAnswer[] = JSON.parse(localStorage.getItem('saiman-funny-answers') || '[]');
      console.log('='.repeat(50));
      console.log('📝 FUNNY ANSWERS FROM VISITORS:');
      console.log('='.repeat(50));
      if (answers.length === 0) {
        console.log('No answers yet!');
      } else {
        answers.forEach((item: SavedAnswer, index: number) => {
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
      delete (window as unknown as { viewFunnyAnswers?: () => void }).viewFunnyAnswers;
    };
  }, []);

  const handleSubmit = (answer: string) => {
    if (!answer) {
      toast({
        title: "Please select an answer!",
        variant: "destructive"
      });
      return;
    }

    // Save answer to localStorage
    const answers = JSON.parse(localStorage.getItem('saiman-funny-answers') || '[]');
    answers.push({
      question: currentQuestion.question,
      answer: answer,
      timestamp: new Date().toISOString(),
      score
    });
    localStorage.setItem('saiman-funny-answers', JSON.stringify(answers));

    toast({
      title: "Thanks for playing! 🎉",
      description: "Your answer has been recorded!"
    });

    console.log('✅ New answer recorded! Type "viewFunnyAnswers()" to see all responses.');
    setSelectedAnswer(answer);
    
    // Auto close after 1.5 seconds
    setTimeout(() => {
      onClose();
    }, 1500);
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
            🤔 Quick Question:
          </p>
          <p className="text-sm text-foreground mb-4">
            {currentQuestion.question}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleSubmit(option)}
                variant={selectedAnswer === option ? "default" : "outline"}
                className={`h-auto py-3 text-sm ${
                  selectedAnswer === option 
                    ? 'bg-primary hover:bg-primary/90' 
                    : 'hover:bg-accent'
                }`}
                disabled={!!selectedAnswer}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
        
        <Button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'SAI-MAN Portfolio',
                text: `I just scored ${score} exploring Sai Manish's interactive Pac-Man portfolio! 🎮`,
                url: 'https://saimanish.vercel.app'
              }).catch(() => {/* silently ignore if user cancels */});
            } else {
              navigator.clipboard.writeText(
                `I scored ${score} on Sai Manish's portfolio game! 🎮 https://saimanish.vercel.app`
              );
            }
          }}
          variant="outline"
          className="w-full arcade-border text-cyan-400 border-cyan-500/50 hover:bg-cyan-500/10 font-mono"
        >
          🎮 Share Score
        </Button>
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
