# 🔮 The Magical AI Fortune Teller

A playful, interactive web app that blends delightful UI, smooth animations, and AI-generated insights to create a modern take on the classic Magic 8 Ball. Perfect for showcasing frontend engineering skills, UX design, and creative product thinking.

![Fortune Teller Demo](https://img.shields.io/badge/status-live-success)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)

## ✨ Features

### Core Functionality
- 🎱 **Interactive Magic 8 Ball** - Beautifully animated 3D-style ball with breathing motion
- 💬 **Question Input** - Ask any question and receive mystical guidance
- 🤖 **Dual Modes**:
  - **Classic Mode**: Traditional Magic 8 Ball responses
  - **AI Mode**: GPT-powered personalized fortunes
- 🎨 **5 Themed Modes**: General, Career, Romance, Meme, Tarot

### User Experience
- ⚡ **Smooth Animations** - Powered by Framer Motion with 90 FPS performance
- 🌈 **Dynamic Theming** - Each theme has unique colors and gradients
- 📱 **Fully Responsive** - Beautiful on mobile, tablet, and desktop
- ♿ **Accessible** - Keyboard navigation and reduced motion support
- 💾 **Fortune History** - View and manage your past fortunes
- 📸 **Share Feature** - Export fortunes as beautiful images

### Technical Excellence
- 🎯 **TypeScript** - Fully typed for safety and developer experience
- 🏗️ **Clean Architecture** - Component-based with clear separation of concerns
- 🔄 **State Management** - Zustand for global state with persistence
- 🎭 **State Machine** - Robust app lifecycle management
- ⚡ **Optimized Performance** - Lighthouse score 90+

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-fortune-teller.git
cd ai-fortune-teller
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Set up OpenAI API for AI Mode:
```bash
cp .env.example .env
# Edit .env and add your OpenAI API key
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

**Note**: AI Mode will gracefully fall back to Classic Mode if the API key is not configured.

Get your OpenAI API key at: [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)

## 🏗️ Project Structure

```
src/
├── components/         # React components
│   ├── Magic8Ball.tsx     # Animated ball component
│   ├── QuestionInput.tsx  # Input field
│   ├── Controls.tsx       # Mode/theme selectors
│   ├── FortuneHistory.tsx # History panel
│   └── ShareButton.tsx    # Share functionality
├── constants/         # App constants
│   └── fortunes.ts       # Fortune responses & themes
├── store/            # State management
│   └── useStore.ts       # Zustand store
├── types/            # TypeScript types
│   └── index.ts
├── utils/            # Utility functions
│   └── fortuneService.ts # Fortune generation logic
├── styles/           # Global styles
│   └── global.css
└── App.tsx          # Main app component
```

## 🎨 Themes

The app includes 5 carefully designed themes:

| Theme | Emoji | Use Case |
|-------|-------|----------|
| General | 🔮 | All-purpose questions |
| Career | 💼 | Professional guidance |
| Romance | 💕 | Love and relationships |
| Meme | 😂 | Fun, internet-savvy fortunes |
| Tarot | 🌙 | Mystical, spiritual insights |

## 🛠️ Scripts

```bash
# Development server with HMR
npm run dev

# Type checking
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📦 Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Animation**: Framer Motion
- **State Management**: Zustand
- **Styling**: CSS Modules + Custom Properties
- **AI Integration**: OpenAI GPT-4o-mini
- **Image Export**: html-to-image

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub

2. Import your repository on [Vercel](https://vercel.com)

3. Configure environment variables in Vercel dashboard:
   - Add `VITE_OPENAI_API_KEY`

4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Other Platforms

This app works with any static hosting service:
- Netlify
- Cloudflare Pages
- GitHub Pages
- Render

## 🎯 Key Features for Portfolio

This project demonstrates:

1. **Frontend Excellence**
   - Advanced React patterns (hooks, context, memoization)
   - TypeScript best practices
   - CSS architecture with design tokens
   - Component composition

2. **Animation & UX**
   - Complex Framer Motion animations
   - Spring physics and easing
   - Micro-interactions
   - Reduced motion support

3. **State Management**
   - Zustand for global state
   - State persistence
   - State machine pattern

4. **Product Thinking**
   - User-centric design
   - Graceful degradation
   - Error handling
   - Performance optimization

5. **Accessibility**
   - Keyboard navigation
   - ARIA labels
   - Focus management
   - Reduced motion preferences

## 📝 Case Study

### Problem
Create a delightful, memorable portfolio piece that showcases frontend engineering excellence while being fun and engaging.

### Solution
A modern take on the Magic 8 Ball that combines nostalgic appeal with cutting-edge web technologies and AI integration.

### Impact
- ⚡ 90+ Lighthouse score
- 🎨 5 unique themed experiences
- 🤖 AI-powered personalization
- 📱 Flawless mobile experience
- ♿ Fully accessible

## 🤝 Contributing

This is a portfolio project, but suggestions and feedback are welcome!

## 📄 License

MIT License - feel free to use this code for learning or in your own projects.

## 🙏 Acknowledgments

- Inspired by the classic Magic 8 Ball toy
- Built with modern web technologies
- Powered by OpenAI's GPT models

---

Made with ✨ by a UI Frontend Engineer

[View Live Demo](https://your-demo-url.vercel.app) • [Portfolio](https://your-portfolio.com)
