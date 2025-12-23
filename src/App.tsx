import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from './store/useStore';
import { getFortune } from './utils/fortuneService';
import { Magic8Ball } from './modules/magic-ball';
import { QuestionInput } from './modules/question';
import { ModeSelector } from './modules/mode';
import { FortuneHistory } from './modules/fortune-history';
import { ShareButton } from './modules/share';
import { Button } from '@/components/ui/button';

function App() {
  const {
    appState,
    setAppState,
    mode,
    currentQuestion,
    setCurrentAnswer,
    addFortune,
    reducedMotion,
    setReducedMotion,
    reset,
  } = useStore();

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

    // Wait for shake animation to complete
    await new Promise((resolve) => setTimeout(resolve, reducedMotion ? 1500 : 2500));

    // Revealing phase
    setAppState('revealing');

    try {
      // Fetch fortune
      const answer = await getFortune(mode, currentQuestion);
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
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error('Error getting fortune:', error);
      setCurrentAnswer('The spirits are unclear. Try again.');
      setAppState('answered');
    }
  };

  const handleAskAnother = () => {
    reset();
  };

  const MotionButton = motion(Button);

  return (
    <div className="min-h-screen flex flex-col items-center px-8 md:px-4 gap-12 md:gap-8 overflow-y-auto bg-background">
      {/* Header */}
      <motion.header
        className="text-center mt-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-3xl font-extrabold bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 bg-clip-text text-transparent mb-2 flex items-center justify-center gap-4 md:flex-col md:gap-2">
          <span className="text-4xl md:text-3xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]">
            🔮
          </span>
          The Magical AI Fortune Teller
        </h1>
        <p className="text-lg md:text-base text-muted-foreground font-medium">
          Ask your question and shake the ball
        </p>
      </motion.header>

      {/* Main Content */}
      <main className="flex flex-col items-center gap-12 md:gap-8 w-full max-w-[600px]">
        {/* Magic 8 Ball */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Magic8Ball />
        </motion.div>

        {/* Question Input */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <QuestionInput onSubmit={handleShake} />
        </motion.div>

        {/* Ask Another Button and Share */}
        {appState === 'answered' && (
          <div className="flex gap-4 w-full justify-center flex-wrap">
            <ShareButton />
            <MotionButton
              variant="outline"
              onClick={handleAskAnother}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full md:w-auto"
            >
              Ask Another Question
            </MotionButton>
          </div>
        )}
      </main>

      {/* Controls */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <ModeSelector />
      </motion.div>

      {/* History */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <FortuneHistory />
      </motion.div>

      {/* Footer */}
      <footer className="mt-auto p-6 text-center text-muted-foreground text-sm">
        <p>
          Made with ✨ by a UI Frontend Engineer •{' '}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:opacity-80 transition-opacity"
          >
            View Source
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
