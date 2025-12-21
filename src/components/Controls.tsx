import { useStore } from '../store/useStore';
import { Card } from '@/components/ui/card';
import type { FortuneMode } from '../types';

export const Controls = () => {
  const { mode, setMode } = useStore();

  return (
    <Card className="w-full max-w-[500px] mx-auto p-6 bg-secondary border-border">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Fortune Mode
          </label>
          <span className="text-xs font-medium text-primary px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
            {mode === 'classic' ? '🔮 Classic' : '🤖 AI Mode'}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 p-1 bg-background rounded-xl">
          <button
            className={`
              px-4 py-3 font-semibold rounded-lg transition-all duration-250 flex items-center justify-center gap-2
              ${mode === 'classic'
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 border-2 border-primary/40 scale-105'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground border-2 border-transparent hover:border-border'
              }
            `}
            onClick={() => setMode('classic' as FortuneMode)}
          >
            <span className="text-xl">🔮</span>
            <span>Classic</span>
          </button>
          <button
            className={`
              px-4 py-3 font-semibold rounded-lg transition-all duration-250 flex items-center justify-center gap-2
              ${mode === 'ai'
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 border-2 border-primary/40 scale-105'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground border-2 border-transparent hover:border-border'
              }
            `}
            onClick={() => setMode('ai' as FortuneMode)}
          >
            <span className="text-xl">🤖</span>
            <span>AI Mode</span>
          </button>
        </div>
      </div>
    </Card>
  );
};
