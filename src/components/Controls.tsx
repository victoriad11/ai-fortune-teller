import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { THEMES } from '../constants/fortunes';
import type { FortuneMode, ThemeType } from '../types';
import styles from './Controls.module.css';

export const Controls = () => {
  const { mode, setMode, theme, setTheme } = useStore();

  const themes = Object.values(THEMES);

  return (
    <div className={styles.container}>
      {/* Mode Toggle */}
      <div className={styles.section}>
        <label className={styles.label}>Mode</label>
        <div className={styles.modeToggle}>
          <button
            className={`${styles.modeButton} ${mode === 'classic' ? styles.active : ''}`}
            onClick={() => setMode('classic' as FortuneMode)}
            style={{
              background:
                mode === 'classic'
                  ? `linear-gradient(135deg, ${THEMES[theme].gradient[0]}, ${THEMES[theme].gradient[1]})`
                  : 'transparent',
            }}
          >
            Classic
          </button>
          <button
            className={`${styles.modeButton} ${mode === 'ai' ? styles.active : ''}`}
            onClick={() => setMode('ai' as FortuneMode)}
            style={{
              background:
                mode === 'ai'
                  ? `linear-gradient(135deg, ${THEMES[theme].gradient[0]}, ${THEMES[theme].gradient[1]})`
                  : 'transparent',
            }}
          >
            AI Mode
          </button>
        </div>
      </div>

      {/* Theme Selector */}
      <div className={styles.section}>
        <label className={styles.label}>Theme</label>
        <div className={styles.themeGrid}>
          {themes.map((themeOption) => (
            <motion.button
              key={themeOption.id}
              className={`${styles.themeButton} ${
                theme === themeOption.id ? styles.active : ''
              }`}
              onClick={() => setTheme(themeOption.id as ThemeType)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background:
                  theme === themeOption.id
                    ? `linear-gradient(135deg, ${themeOption.gradient[0]}, ${themeOption.gradient[1]})`
                    : 'var(--color-surface)',
                borderColor:
                  theme === themeOption.id ? themeOption.glowColor : 'transparent',
              }}
              aria-label={`Select ${themeOption.name} theme`}
            >
              <span className={styles.emoji}>{themeOption.emoji}</span>
              <span className={styles.themeName}>{themeOption.name}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};
