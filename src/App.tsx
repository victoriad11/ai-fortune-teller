import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from './store/useStore';
import { getFortune } from './utils/fortuneService';
import { Magic8Ball } from './components/Magic8Ball';
import { QuestionInput } from './components/QuestionInput';
import { Controls } from './components/Controls';
import { FortuneHistory } from './components/FortuneHistory';
import { ShareButton } from './components/ShareButton';
import { THEMES } from './constants/fortunes';
import styles from './App.module.css';

function App() {
  const {
    appState,
    setAppState,
    mode,
    theme,
    currentQuestion,
    setCurrentAnswer,
    addFortune,
    reducedMotion,
    setReducedMotion,
  } = useStore();

  const themeConfig = THEMES[theme];

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [setReducedMotion]);

  const handleShake = async () => {
    if (!currentQuestion.trim() || appState !== 'idle') return;

    // Shake animation phase
    setAppState('shaking');

    // Wait for shake animation to complete (2-3 seconds)
    await new Promise((resolve) => setTimeout(resolve, reducedMotion ? 1500 : 2500));

    // Revealing phase
    setAppState('revealing');

    try {
      // Fetch fortune
      const answer = await getFortune(mode, currentQuestion, theme);
      setCurrentAnswer(answer);

      // Show answer
      await new Promise((resolve) => setTimeout(resolve, reducedMotion ? 100 : 300));
      setAppState('answered');

      // Add to history
      addFortune({
        id: Date.now().toString(),
        question: currentQuestion,
        answer,
        mode,
        theme,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error('Error getting fortune:', error);
      setCurrentAnswer('The spirits are unclear. Try again.');
      setAppState('answered');
    }
  };

  const handleAskAnother = () => {
    setAppState('idle');
    setCurrentAnswer('');
  };

  return (
    <div
      className={styles.app}
      style={{
        background: `radial-gradient(circle at 50% 20%, ${themeConfig.glowColor}15 0%, var(--color-background) 50%)`,
      }}
    >
      {/* Header */}
      <motion.header
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.title}>
          <span className={styles.emoji}>🔮</span>
          The Magical AI Fortune Teller
        </h1>
        <p className={styles.subtitle}>Ask your question and shake the ball</p>
      </motion.header>

      {/* Main Content */}
      <main className={styles.main}>
        {/* Magic 8 Ball */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Magic8Ball onShake={handleShake} />
        </motion.div>

        {/* Question Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <QuestionInput onSubmit={handleShake} />
        </motion.div>

        {/* Ask Another Button and Share */}
        {appState === 'answered' && (
          <div className={styles.actionButtons}>
            <ShareButton />
            <motion.button
              className={styles.askAnotherButton}
              onClick={handleAskAnother}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ask Another Question
            </motion.button>
          </div>
        )}
      </main>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Controls />
      </motion.div>

      {/* History */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <FortuneHistory />
      </motion.div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>
          Made with ✨ by a UI Frontend Engineer •{' '}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: themeConfig.glowColor }}
          >
            View Source
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
