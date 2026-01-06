# 🤖 AI Website Builder

<div align="center">

![AI Website Builder](https://img.shields.io/badge/AI-Website_Builder-blueviolet?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite)

**An intelligent website generator powered by AI that creates beautiful, responsive websites in seconds.**

[Demo](#demo) • [Features](#features) • [Installation](#installation) • [Usage](#usage) • [API Keys](#api-keys)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

AI Website Builder is a cutting-edge web application that leverages artificial intelligence to automatically generate complete, professional websites based on user descriptions. Simply describe your vision, and watch as AI creates a fully functional website with stunning visuals from Pexels and intelligent content generation powered by Google's Gemini AI.

### 🎯 Key Highlights

- 🤖 **AI-Powered Generation**: Uses Google Gemini API for intelligent content creation
- 🖼️ **Dynamic Image Integration**: Fetches relevant, high-quality images from Pexels API
- ⚡ **Lightning Fast**: Built with Vite for optimal performance
- 🎨 **Modern UI**: Beautiful, responsive designs with Tailwind CSS
- 📱 **Fully Responsive**: Works seamlessly across all devices
- 🔄 **Real-time Preview**: See your website come to life instantly
- 💾 **Export Options**: Download generated websites as HTML/CSS/JS

---

## ✨ Features

### Core Features

- ✅ **Natural Language Input**: Describe your website in plain English
- ✅ **AI Content Generation**: Gemini AI creates compelling copy and structure
- ✅ **Smart Image Selection**: Automatically finds relevant images from Pexels
- ✅ **Multiple Templates**: Various design styles (Modern, Minimal, Corporate, Creative)
- ✅ **Component Library**: Pre-built sections (Hero, About, Services, Contact, etc.)
- ✅ **Color Scheme Generator**: AI-suggested color palettes
- ✅ **Typography Optimization**: Automatic font pairing
- ✅ **SEO-Friendly**: Generated code follows best practices
- ✅ **Accessibility**: WCAG compliant output

### Advanced Features

- 🎨 **Theme Customization**: Adjust colors, fonts, and layouts
- 📊 **Analytics Ready**: Built-in tracking code integration
- 🔧 **Code Export**: Download clean, production-ready code
- 💬 **Chat Interface**: Interactive AI assistant for refinements
- 🔄 **Version History**: Save and restore previous generations
- 🌐 **Multi-language Support**: Generate sites in multiple languages

---

## 🛠️ Tech Stack

### Frontend

- **React 18.x** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Navigation
- **Zustand** - State management
- **React Query** - Data fetching and caching

### APIs & Services

- **Google Gemini API** - AI content generation
- **Pexels API** - High-quality stock images
- **Axios** - HTTP client

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Jest** - Unit testing
- **React Testing Library** - Component testing

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn** or **pnpm**
- **Git**

### API Keys Required

You'll need to obtain free API keys from:

1. **Google Gemini API**: [Get API Key](https://makersuite.google.com/app/apikey)
2. **Pexels API**: [Get API Key](https://www.pexels.com/api/)

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Om/ProjectAi.git
cd AI
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# Gemini API Configuration
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_GEMINI_MODEL=gemini-pro

# Pexels API Configuration
VITE_PEXELS_API_KEY=your_pexels_api_key_here

# App Configuration
VITE_APP_NAME=AI Website Builder
VITE_APP_VERSION=1.0.0
VITE_API_BASE_URL=http://localhost:5173
```

### 4. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## ⚙️ Configuration

### Gemini API Setup

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and add it to your `.env` file

### Pexels API Setup

1. Visit [Pexels API](https://www.pexels.com/api/)
2. Sign up for a free account
3. Navigate to "Your API Key" in your account settings
4. Copy the key and add it to your `.env` file

### Customization Options

Edit `src/config/settings.ts` to customize:

```typescript
export const appConfig = {
  maxGenerationAttempts: 3,
  defaultTheme: 'modern',
  imageSearchLimit: 20,
  cacheTimeout: 3600000, // 1 hour
  supportedLanguages: ['en', 'es', 'fr', 'de'],
};
```

---

## 📖 Usage

### Basic Usage

1. **Enter Your Description**
   ```
   "Create a modern portfolio website for a software developer 
   with sections for projects, skills, and contact information"
   ```

2. **Select Options** (Optional)
   - Choose a design style
   - Pick a color scheme
   - Select preferred fonts

3. **Generate Website**
   - Click "Generate Website"
   - Wait for AI to create your site (usually 10-30 seconds)

4. **Preview & Edit**
   - Review the generated website
   - Make adjustments using the chat interface
   - Customize colors, fonts, and content

5. **Export**
   - Download as HTML/CSS/JS
   - Or get deployment-ready code

### Advanced Usage

#### Custom Prompts

```typescript
import { generateWebsite } from './services/ai';

const result = await generateWebsite({
  description: 'Create a restaurant website',
  style: 'elegant',
  sections: ['hero', 'menu', 'about', 'contact'],
  colorScheme: 'warm',
  includeAnimations: true,
});
```

#### Image Search Customization

```typescript
import { searchImages } from './services/pexels';

const images = await searchImages({
  query: 'restaurant food',
  perPage: 15,
  orientation: 'landscape',
  size: 'large',
});
```

---


## 🔌 API Integration

### Gemini API Integration

```typescript
// src/services/gemini.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const generateContent = async (prompt: string) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};
```

### Pexels API Integration

```typescript
// src/services/pexels.ts
import axios from 'axios';

const PEXELS_API_URL = 'https://api.pexels.com/v1';
const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

export const searchImages = async (query: string, perPage = 10) => {
  const response = await axios.get(`${PEXELS_API_URL}/search`, {
    headers: { Authorization: API_KEY },
    params: { query, per_page: perPage },
  });
  
  return response.data.photos;
};
```

---

## 🎨 Customization

### Adding New Templates

```typescript
// src/config/templates.ts
export const templates = {
  modern: {
    name: 'Modern',
    colors: ['#3B82F6', '#8B5CF6', '#EC4899'],
    fonts: ['Inter', 'Poppins'],
    layout: 'grid',
  },
  // Add your custom template
  custom: {
    name: 'Custom',
    colors: ['#yourcolor1', '#yourcolor2'],
    fonts: ['YourFont1', 'YourFont2'],
    layout: 'flex',
  },
};
```

### Styling

Customize Tailwind configuration in `tailwind.config.js`:

```javascript
export default {
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#8B5CF6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
};
```

---

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

---

## 📦 Building for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

The build output will be in the `dist/` directory.

---

## 🚢 Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Drag and drop the 'dist' folder to Netlify
```

### Environment Variables

Don't forget to set your environment variables in your deployment platform:
- `VITE_GEMINI_API_KEY`
- `VITE_PEXELS_API_KEY`

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use ESLint and Prettier configurations
- Write meaningful commit messages
- Add tests for new features

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Google Gemini](https://deepmind.google/technologies/gemini/) - AI content generation
- [Pexels](https://www.pexels.com/) - High-quality stock images
- [React](https://react.dev/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

---

## 📧 Contact

**Om Gupta** - Full Stack Developer

- Portfolio: [og.dev](https://og.dev)
- GitHub: [@Om2407](https://github.com/Om2407)
- Email: your.email@example.com

---

## 🗺️ Roadmap

- [ ] Add more design templates
- [ ] Implement collaborative editing
- [ ] Add CMS integration options
- [ ] Support for e-commerce sites
- [ ] Mobile app version
- [ ] Advanced animation editor
- [ ] Multi-page website generation
- [ ] Integration with popular hosting providers
- [ ] A/B testing capabilities
- [ ] Performance optimization tools

---

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

<div align="center">

**Made with ❤️ by Om Gupta**

[⬆ Back to Top](#-ai-website-builder)

</div>
