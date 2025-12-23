import { useStore } from '../store/useStore';
import { Card } from '@/components/ui/card';
import { SwitcherRoot, SwitcherItem } from '@/components/ui/switcher';

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
        <SwitcherRoot value={mode} onValueChange={setMode}>
          <SwitcherItem value="classic" icon="🔮">
            Classic
          </SwitcherItem>
          <SwitcherItem value="ai" icon="🤖">
            AI Mode
          </SwitcherItem>
        </SwitcherRoot>
      </div>
    </Card>
  );
};
