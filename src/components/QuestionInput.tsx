import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface QuestionInputProps {
  onSubmit: () => void;
}

export const QuestionInput = ({ onSubmit }: QuestionInputProps) => {
  const { currentQuestion, setCurrentQuestion, appState } = useStore();
  const isDisabled = appState === 'shaking' || appState === 'revealing' || appState === 'answered';

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentQuestion.trim()) {
      onSubmit();
    }
  };

  const MotionButton = motion(Button);

  return (
    <div className="flex flex-col gap-6 w-full max-w-[500px] mx-auto">
      <motion.div
        className="relative flex items-center bg-secondary border border-border rounded-2xl p-2 transition-all duration-250 focus-within:border-muted-foreground/40 focus-within:shadow-[0_0_10px_rgba(0,0,0,0.1)]"
      >
        <Input
          type="text"
          className="flex-1 px-4 py-3 text-base bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Ask your question..."
          value={currentQuestion}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isDisabled}
          maxLength={200}
          aria-label="Enter your question"
        />
        {currentQuestion && (
          <motion.button
            className="p-2 px-4 text-muted-foreground text-lg rounded opacity-60 hover:opacity-100 hover:bg-accent transition-all"
            onClick={() => setCurrentQuestion('')}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Clear question"
          >
            ✕
          </motion.button>
        )}
      </motion.div>

      <MotionButton
        variant="default"
        size="lg"
        className="w-full text-lg font-bold py-6 shadow-lg hover:shadow-xl transition-all"
        onClick={onSubmit}
        disabled={isDisabled || !currentQuestion.trim()}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {appState === 'shaking' || appState === 'revealing' ? 'Shaking...' : appState === 'answered' ? 'Ask Another Question' : 'Shake the Ball'}
      </MotionButton>
    </div>
  );
};
