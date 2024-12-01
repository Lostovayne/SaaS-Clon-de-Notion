# Notion Clone

<div align="center">

![Notion Clone Logo](https://github.com/Lostovayne/Clon-de-Notion-con-Next14-Tailwind-Typescript/assets/92962731/9fff6f52-88ff-4798-b59e-f1a8d19e84d1)

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A powerful and modern Notion clone built with cutting-edge technologies.

[Demo](your-demo-link) · [Report Bug](your-issues-link) · [Request Feature](your-issues-link)

</div>

## Overview

This project is a feature-rich Notion clone that demonstrates the implementation of modern web technologies. Built on Next.js 14, it seamlessly integrates real-time collaboration, secure authentication, and a responsive user interface. The application leverages Clerk for authentication and Convex as a robust real-time backend, while utilizing Shadcn components and Tailwind CSS for an elegant and responsive design.

## Key Features

### Core Functionality

- Full-featured Notion-style editor
- Real-time database synchronization
- Infinite nested documents
- Secure authentication system
- Light and dark mode support

### Document Management

- File upload, replacement, and deletion
- Soft delete with trash bin functionality
- Document recovery system
- Real-time document icon updates
- Cover images for documents

### User Interface

- Fully collapsible sidebar
- Responsive mobile design
- Web publishing capabilities
- Custom landing page
- Modern and clean UI

## Technology Stack

### Frontend

- **Next.js 14** - React framework for production
- **TypeScript** - Static type checking
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn** - Customizable UI components

### Backend & Services

- **Convex** - Real-time backend infrastructure
- **Clerk** - Authentication and user management
- **Edge Runtime** - Enhanced performance and scalability

## Getting Started

### Prerequisites

- Node.js (version 18.x.x or higher)
- npm or yarn package manager
- Git

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/notion-clone.git
cd notion-clone
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Environment Setup
   - Copy `.env.example` to `.env.local`
   - Configure the following environment variables:

```env
# Convex deployment
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=

# Clerk authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

4. Start the development servers

```bash
# Start Convex backend
npx convex dev

# In a new terminal, start Next.js
npm run dev
# or
yarn dev
```

## Project Structure

```
notion-clone/
├── app/                    # Next.js app directory
│   ├── (main)/            # Main application routes
│   └── (marketing)/       # Marketing pages
├── components/            # Reusable UI components
├── convex/                # Backend models and functions
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
└── public/               # Static assets
```

## Development Guide

### Adding New Features

1. Backend (Convex)

   - Add new models in `convex/schema.ts`
   - Create new functions in `convex/` directory

2. Frontend
   - Create components in `components/`
   - Add new routes in `app/(main)/(routes)/`
   - Implement hooks in `hooks/`

### Best Practices

- Follow TypeScript strict mode guidelines
- Use Tailwind CSS for styling
- Implement responsive design patterns
- Write clean, documented code
- Follow the established project structure

## Deployment

1. Build the application

```bash
npm run build
# or
yarn build
```

2. Deploy to your preferred platform
   - Vercel (recommended)
   - Netlify
   - Custom server

### Deployment Checklist

- [ ] Configure environment variables
- [ ] Set up Convex production deployment
- [ ] Configure Clerk authentication
- [ ] Set up proper domain and SSL
- [ ] Test all features in production

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- Create an issue for bug reports or feature requests
- Star the repository if you find it useful
- Follow for updates

---

<div align="center">

Made with ❤️ by [DeusloVuilt](your-profile-link)

</div>
