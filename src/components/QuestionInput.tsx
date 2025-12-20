import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { THEMES } from '../constants/fortunes';
import styles from './QuestionInput.module.css';

interface QuestionInputProps {
  onSubmit: () => void;
}

export const QuestionInput = ({ onSubmit }: QuestionInputProps) => {
  const { currentQuestion, setCurrentQuestion, appState, theme } = useStore();
  const themeConfig = THEMES[theme];

  const isDisabled = appState === 'shaking' || appState === 'revealing';

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentQuestion.trim()) {
      onSubmit();
    }
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.inputWrapper}
        style={{
          borderColor: `${themeConfig.glowColor}40`,
        }}
        whileFocus={{
          borderColor: themeConfig.glowColor,
          boxShadow: `0 0 20px ${themeConfig.glowColor}30`,
        }}
      >
        <input
          type="text"
          className={styles.input}
          placeholder="Ask your question..."
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isDisabled}
          maxLength={200}
          aria-label="Enter your question"
        />
        {currentQuestion && (
          <motion.button
            className={styles.clearButton}
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

      <motion.button
        className={styles.shakeButton}
        style={{
          background: `linear-gradient(135deg, ${themeConfig.gradient[0]}, ${themeConfig.gradient[1]})`,
        }}
        onClick={onSubmit}
        disabled={isDisabled || !currentQuestion.trim()}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isDisabled ? 'Shaking...' : 'Shake the Ball'}
      </motion.button>
    </div>
  );
};
