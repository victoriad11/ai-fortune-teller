import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { useShare } from './useShare';

export const ShareButton = () => {
  const { currentQuestion, currentAnswer, mode, appState } = useStore();
  const { share, isSharing, status } = useShare();

  if (appState !== 'answered') return null;

  const handleShare = () => {
    share({ question: currentQuestion, answer: currentAnswer, mode });
  };

  const getButtonText = () => {
    if (isSharing) return 'Copying...';
    if (status === 'success') return '✓ Copied!';
    if (status === 'error') return 'Error - Try Again';
    return (
      <>
        <span>📋</span> Copy Fortune
      </>
    );
  };

  const MotionButton = motion(Button);

  return (
    <MotionButton
      onClick={handleShare}
      disabled={isSharing}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-w-[180px] w-full md:w-auto"
    >
      {getButtonText()}
    </MotionButton>
  );
};
