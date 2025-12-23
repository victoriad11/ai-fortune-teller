import type { FortuneData } from './types';

export function createShareTemplate(data: FortuneData): HTMLDivElement {
  const container = document.createElement('div');

  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.width = '600px';
  container.style.padding = '40px';
  container.style.background = 'linear-gradient(135deg, hsl(262 83% 58%), hsl(276 59% 58%))';
  container.style.borderRadius = '20px';
  container.style.fontFamily = 'Inter, sans-serif';

  container.innerHTML = `
    <div style="text-align: center; color: white;">
      <div style="font-size: 48px; margin-bottom: 20px;">🔮</div>
      <h2 style="font-size: 28px; margin-bottom: 30px; font-weight: 700;">The Magical AI Fortune Teller</h2>

      <div style="background: rgba(0,0,0,0.3); padding: 30px; border-radius: 15px; margin-bottom: 30px;">
        <p style="font-size: 16px; margin-bottom: 20px; opacity: 0.9; font-weight: 600;">
          ${data.question}
        </p>
        <div style="width: 50px; height: 2px; background: rgba(255,255,255,0.5); margin: 20px auto;"></div>
        <p style="font-size: 20px; font-weight: 700; line-height: 1.5;">
          ${data.answer}
        </p>
      </div>

      <div style="display: flex; justify-content: center; gap: 15px; font-size: 14px; opacity: 0.8;">
        <span>${data.mode === 'ai' ? '🤖 AI Mode' : '🔮 Classic'}</span>
      </div>
    </div>
  `;

  return container;
}
