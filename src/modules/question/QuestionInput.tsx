import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { InputGroup, InputGroupInput, InputGroupAction } from '@/components/ui/input-group';
import { Button } from '@/components/ui/button';
import { isInputDisabled, isShakeButtonVisible } from './utils';
import type { QuestionInputProps } from './types';

export const QuestionInput = ({ onSubmit, onAskAnother }: QuestionInputProps) => {
  const { currentQuestion, setCurrentQuestion, appState } = useStore();
  const isDisabled = isInputDisabled(appState);
  const showShakeButton = isShakeButtonVisible(appState);
  const isShaking = appState === 'shaking' || appState === 'revealing';

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentQuestion.trim() && showShakeButton && !isShaking) {
      onSubmit();
    }
  };

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
            <InputGroupAction onClick={() => setCurrentQuestion('')} aria-label="Clear question">
              ✕
            </InputGroupAction>
          </motion.div>
        )}
      </InputGroup>

      {showShakeButton ? (
        <Button
          variant="default"
          size="lg"
          className="w-full text-lg font-bold py-6 shadow-lg hover:shadow-xl transition-all"
          onClick={onSubmit}
          disabled={!currentQuestion.trim() || isShaking}
        >
          {isShaking ? 'Shaking...' : 'Shake the Ball'}
        </Button>
      ) : (
        <Button
          variant="default"
          size="lg"
          className="w-full text-lg font-bold py-6 shadow-lg hover:shadow-xl transition-all"
          onClick={onAskAnother}
        >
          Ask Another Question
        </Button>
      )}
    </div>
  );
};
