import { useStore } from '@/store/useStore';
import { Card } from '@/components/ui/card';
import { SwitcherRoot, SwitcherItem } from '@/components/ui/switcher';
import { MODE_CONFIGS, getModeBadgeText } from './utils';

export const ModeSelector = () => {
  const { mode, setMode } = useStore();

  return (
    <Card className="w-full max-w-[500px] mx-auto p-6 bg-secondary border-border">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Fortune Mode
          </label>
          <span className="text-xs font-medium text-primary px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
            {getModeBadgeText(mode)}
          </span>
        </div>
        <SwitcherRoot value={mode} onValueChange={setMode}>
          {MODE_CONFIGS.map((config) => (
            <SwitcherItem key={config.value} value={config.value} icon={config.icon}>
              {config.label}
            </SwitcherItem>
          ))}
        </SwitcherRoot>
      </div>
    </Card>
  );
};
