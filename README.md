# 🔮 The Magical AI Fortune Teller

A playful, interactive web app that blends delightful UI, smooth animations, and AI-generated insights to create a modern take on the classic Magic 8 Ball. Built with modern web technologies and comprehensive test coverage.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-38B2AC?logo=tailwind-css&logoColor=white)
![Tests](https://img.shields.io/badge/tests-136%20passing-success)

## ✨ Features

### Core Functionality
- 🎱 **Interactive Magic 8 Ball** - Beautifully animated ball with smooth shake animations
- 💬 **Question Input** - Ask any question and receive mystical guidance
- 🤖 **Dual Modes**:
  - **Classic Mode**: Traditional Magic 8 Ball responses (17 classic fortunes)
  - **AI Mode**: Google Gemini-powered personalized fortunes
- 🎨 **Modern Dark Theme** - Orange/amber accent colors with OKLCH color space

### User Experience
- ⚡ **Smooth Animations** - Powered by Framer Motion with optimized performance
- 📱 **Fully Responsive** - Beautiful on mobile, tablet, and desktop
- ♿ **Accessible** - Keyboard navigation, ARIA labels, and reduced motion support
- 💾 **Fortune History** - View and manage your past fortunes with timestamps
- 📋 **Share Feature** - Copy fortunes to clipboard with one click
- 🔔 **Toast Notifications** - Friendly error messages when AI mode hits rate limits

### Technical Excellence
- 🎯 **TypeScript** - Fully typed for safety and developer experience
- 🏗️ **Modular Architecture** - Clean separation with feature-based modules
- 🧪 **Comprehensive Tests** - 136 tests with Vitest and React Testing Library
- 🔄 **State Management** - Zustand for global state with persistence
- 🎨 **shadcn/ui Components** - Reusable, composable UI components
- ⚡ **Tailwind CSS v4** - Modern styling with custom design system

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

3. (Optional) Set up Google Gemini API for AI Mode:
```bash
cp .env.example .env
# Edit .env and add your Gemini API key
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

**Note**: AI Mode will gracefully fall back to Classic Mode if the API key is not configured. You'll see a helpful toast notification explaining what happened.

**Get your FREE Gemini API key** at: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)
- No credit card required
- Very generous free tier: 15 requests/min, 1,500 requests/day, 1M requests/month

### List Available Models

To see which Gemini models are available with your API key:

```bash
npm run list-models
```

## 🏗️ Project Structure

```
src/
├── components/ui/          # Reusable UI components (shadcn/ui)
│   ├── button.tsx              # Button component
│   ├── card.tsx                # Card component
│   ├── input.tsx               # Input component
│   ├── input-group.tsx         # Grouped input with actions
│   ├── switcher.tsx            # Mode switcher component
│   └── sonner.tsx              # Toast notifications
├── modules/               # Feature-based modules
│   ├── magic-ball/            # Magic 8 Ball feature
│   │   ├── Magic8Ball.tsx
│   │   ├── animations.ts
│   │   ├── styles.ts
│   │   ├── types.ts
│   │   └── __tests__/
│   ├── question/              # Question input feature
│   │   ├── QuestionInput.tsx
│   │   ├── utils.ts
│   │   ├── types.ts
│   │   └── __tests__/
│   ├── mode/                  # Mode selector feature
│   │   ├── ModeSelector.tsx
│   │   ├── utils.ts
│   │   └── __tests__/
│   ├── fortune-history/       # Fortune history feature
│   │   ├── FortuneHistory.tsx
│   │   ├── utils.ts
│   │   └── __tests__/
│   └── share/                 # Share feature
│       ├── ShareButton.tsx
│       ├── shareService.ts
│       ├── useShare.ts
│       └── __tests__/
├── constants/             # App constants
│   ├── fortunes.ts            # Fortune responses
│   └── gemini-model.ts        # AI model configuration
├── store/                # State management
│   └── useStore.ts           # Zustand store
├── types/                # TypeScript types
│   └── index.ts
├── utils/                # Utility functions
│   └── fortuneService.ts     # Fortune generation logic
├── test/                 # Test configuration
│   └── setup.ts
└── App.tsx              # Main app component
```

## 🎮 Modes

The app features two distinct fortune-telling modes:

| Mode | Icon | Description |
|------|------|-------------|
| Classic | 🔮 | Traditional Magic 8 Ball responses with 17 classic fortunes |
| AI | 🤖 | Google Gemini-powered personalized fortunes tailored to your question |

## 🛠️ Scripts

```bash
# Development server with HMR
npm run dev

# Run tests
npm test

# Type checking
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# List available Gemini models
npm run list-models
```

## 📦 Tech Stack

- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Animation**: Framer Motion
- **State Management**: Zustand (with persistence)
- **Styling**: Tailwind CSS v4 (OKLCH color space)
- **UI Components**: shadcn/ui
- **AI Integration**: Google Gemini (gemini-flash-latest)
- **Notifications**: Sonner (toast notifications)
- **Testing**: Vitest + React Testing Library

## 🙏 Acknowledgments

- Inspired by the classic Magic 8 Ball toy
- Built with modern web technologies
- Powered by Google Gemini AI

---

Made with ✨ by a UI Frontend Engineer

[View Live Demo](https://ai-fortune-teller-jade.vercel.app) • [Portfolio](https://victoriadobrov.dev/)
