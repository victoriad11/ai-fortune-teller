import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useStore } from './store/useStore';
import { getFortune } from './utils/fortuneService';
import { Magic8Ball } from './modules/magic-ball';
import { QuestionInput } from './modules/question';
import { ModeSelector } from './modules/mode';
import { FortuneHistory } from './modules/fortune-history';
import { ShareButton } from './modules/share';
import { Toaster } from './components/ui/sonner';

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

    setAppState('shaking');

    await new Promise((resolve) => setTimeout(resolve, reducedMotion ? 1500 : 2500));

    setAppState('revealing');

    try {
      const result = await getFortune(mode, currentQuestion);
      setCurrentAnswer(result.answer);

      // Show error toast if there was an issue
      if (result.error === 'rate_limit') {
        toast.error('Rate limit reached! Try again in a few minutes.', {
          description: 'Showing a classic fortune instead.',
          duration: 5000,
        });
      } else if (result.error === 'no_api_key') {
        toast.warning('AI mode requires an API key', {
          description: 'Add VITE_GEMINI_API_KEY to your .env file. Showing classic fortune.',
          duration: 5000,
        });
      } else if (result.error === 'api_error') {
        toast.error('AI service unavailable', {
          description: 'Showing a classic fortune instead.',
          duration: 4000,
        });
      }

      await new Promise((resolve) => setTimeout(resolve, reducedMotion ? 100 : 300));
      setAppState('answered');

      addFortune({
        id: Date.now().toString(),
        question: currentQuestion,
        answer: result.answer,
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


  return (
    <>
      <Toaster />
      <div className="min-h-screen flex flex-col items-center px-8 md:px-4 gap-12 md:gap-8 overflow-y-auto bg-background">
        {/* Header */}
        <motion.header
          className="text-center mt-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-3xl font-extrabold bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 bg-clip-text text-transparent mb-2 flex items-center justify-center gap-4 md:flex-col md:gap-2">
            The Magical AI Fortune Teller
          </h1>
          <p className="text-lg md:text-base text-muted-foreground font-medium">
            Ask your question and shake the ball
          </p>
        </motion.header>

        <main className="flex flex-col items-center gap-12 md:gap-8 w-full max-w-[600px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Magic8Ball />
          </motion.div>

          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <QuestionInput onSubmit={handleShake} onAskAnother={handleAskAnother} />
          </motion.div>

          {appState === 'answered' && (
            <div className="flex gap-4 w-full justify-center flex-wrap">
              <ShareButton />
            </div>
          )}
        </main>

        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <ModeSelector />
        </motion.div>

        <motion.div
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <FortuneHistory />
        </motion.div>

        <footer className="mt-auto p-6 text-center text-muted-foreground text-sm">
          <p>
            Made with ✨ by a UI Frontend Engineer •{' '}
            <a
              href="https://github.com/victoriad11/ai-fortune-teller"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:opacity-80 transition-opacity"
            >
              View Source
            </a>
          </p>
        </footer>
      </div>
    </>
  );
}

export default App;
