import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getModeLabel, formatDate, getToggleButtonText } from './utils';

export const FortuneHistory = () => {
  const { fortunes, clearHistory } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  if (fortunes.length === 0) return null;

  const MotionButton = motion(Button);

  return (
    <div className="w-full max-w-[500px] mx-auto">
      <MotionButton
        variant="default"
        className="w-full"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {getToggleButtonText(isOpen, fortunes.length)}
      </MotionButton>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mt-4 bg-secondary border-border overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h3 className="text-lg font-bold">Fortune History</h3>
                <Button variant="destructive" size="sm" onClick={clearHistory} aria-label="Clear history">
                  Clear All
                </Button>
              </div>

              <div className="max-h-[400px] overflow-y-auto p-4 flex flex-col gap-4">
                {fortunes.map((fortune, index) => (
                  <motion.div
                    key={fortune.id}
                    className="p-4 bg-background rounded-xl flex flex-col gap-2 border-l-4 border-primary"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="px-2 py-0.5 bg-accent rounded font-semibold">
                        {getModeLabel(fortune.mode)}
                      </span>
                      <span className="ml-auto">{formatDate(fortune.timestamp)}</span>
                    </div>
                    <p className="text-sm font-semibold">{fortune.question}</p>
                    <p className="text-sm text-muted-foreground italic">{fortune.answer}</p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
