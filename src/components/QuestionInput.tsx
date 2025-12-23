import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { InputGroup, InputGroupInput, InputGroupAction } from '@/components/ui/input-group';
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
      <InputGroup>
        <InputGroupInput
          type="text"
          placeholder="Ask your question..."
          value={currentQuestion}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isDisabled}
          maxLength={200}
          aria-label="Enter your question"
        />
        {currentQuestion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <InputGroupAction
              onClick={() => setCurrentQuestion('')}
              aria-label="Clear question"
            >
              ✕
            </InputGroupAction>
          </motion.div>
        )}
      </InputGroup>

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
