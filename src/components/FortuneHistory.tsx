import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useStore } from '../store/useStore';
import { THEMES } from '../constants/fortunes';
import styles from './FortuneHistory.module.css';

export const FortuneHistory = () => {
  const { fortunes, clearHistory } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  if (fortunes.length === 0) return null;

  return (
    <div className={styles.container}>
      <motion.button
        className={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? 'Hide' : 'View'} History ({fortunes.length})
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.historyPanel}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.header}>
              <h3 className={styles.title}>Fortune History</h3>
              <button
                className={styles.clearButton}
                onClick={clearHistory}
                aria-label="Clear history"
              >
                Clear All
              </button>
            </div>

            <div className={styles.list}>
              {fortunes.map((fortune, index) => {
                const themeConfig = THEMES[fortune.theme];
                return (
                  <motion.div
                    key={fortune.id}
                    className={styles.item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    style={{
                      borderLeft: `3px solid ${themeConfig.glowColor}`,
                    }}
                  >
                    <div className={styles.itemHeader}>
                      <span className={styles.emoji}>{themeConfig.emoji}</span>
                      <span className={styles.badge}>
                        {fortune.mode === 'ai' ? '🤖 AI' : '🔮 Classic'}
                      </span>
                      <span className={styles.time}>
                        {new Date(fortune.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className={styles.question}>{fortune.question}</p>
                    <p className={styles.answer}>{fortune.answer}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
