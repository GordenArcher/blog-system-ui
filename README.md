
<!-- ![JournIQ Logo](https://localhost:5173/logo.png) -->
# JournIQ - Frontend

[![License: MIT](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-blue?logo=tailwind-css)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-state-green)](https://github.com/pmndrs/zustand)

JournIQ is a **modern blogging platform** with a focus on interactive Markdown content, rich media, and responsive user interfaces. This repository contains the **frontend**, built with **React** and **TypeScript**.

---

## Features

* **Home Page** – Hero sections, featured posts, and curated content.
* **About Us Page** – Platform introduction and team overview.
* **Blog Page & Details** – Browse posts, read full markdown content with embedded media.
* **Custom PostCard Component** – Displays posts with cover images, title, excerpt, tags, and author info.
* **Custom Markdown Editor/Preview** – Supports:

  * Images & videos (uploaded or URLs)
  * Adjustable media sizes
  * Code blocks with syntax highlighting
  * YouTube and iframe embeds
* **User Authentication** – Login & register with live API integration.
* **Responsive Design** – Desktop, tablet, and mobile friendly.
* **State Management** – Using **Zustand** for posts, users, and UI states.
* **Secure Content Rendering** – Using **DOMPurify** to sanitize user content.

---

## Screenshots

**Home Page**
![Home Page](https://localhost:5173/screenshots/home.png)

**Blog Page**
![Blog Page](https://localhost:5173/screenshots/blog.png)

**Markdown Preview with Media**
![Markdown Preview](https://localhost:5173/screenshots/markdown-preview.gif)

**PostCard Component**
![PostCard](https://localhost:5173/screenshots/postcard.png)

**Login & Register**
![Login](https://localhost:5173/screenshots/login.png)
![Register](https://localhost:5173/screenshots/register.png)

---

## Tech Stack

* **React 18** + **TypeScript**
* **Tailwind CSS** for styling
* **Zustand** for state management
* **Axios** for API calls
* **marked** for Markdown parsing
* **DOMPurify** for sanitizing user-generated content
* **React Router** for routing

---

## Custom Markdown

JournIQ features a **custom Markdown renderer**:

* Converts Markdown into **sanitized HTML**
* Renders **images & videos** from uploads or URLs
* Allows **resizing of media** directly in posts
* Supports **code blocks, headings, lists, tables, and embeds**
* Integrates with **light & dark themes**

**Example Markdown:**

```markdown
# My Blog Post

This is a **custom markdown** post with media.

![Cover Image](https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400)

Add videos too:

![My Video](blob:http://localhost:5173/0b1962d4-cf3e-4edb-9965-1454590e5a83)
```

---

## Installation

```bash
# Clone the repo
git clone https://github.com/GordenArcher/blog-system-ui .git

# Navigate into project directory
cd blog-system-ui 

# Install dependencies
npm install
# or
yarn install
```

---

## Running the App

```bash
# Start development server
npm run dev
# or
yarn dev

# Open at http://localhost:5173
```

---

## 📁 Folder Structure

```
src/
├─ components/       # Reusable UI components (PostCard, ReadMoreButton)
├─ layout/           # Layout components (PageHeader)
├─ pages/            # Pages (Home, About, Blog, BlogDetails, Login, Register)
├─ stores/           # Zustand state management
├─ utils/            # API helpers and utilities
├─ App.tsx           # Main App
├─ index.tsx         # Entry point
```

---

## 🔗 Environment Variables

Create a `.env` file:

```env
VITE_BACKEND_BASE_URL=https://localhost:8000/api/v1
```

---

## API Integration

* Fetch all posts or a single post by slug
* Fetch author, category, and tags
* Track **views** and **likes**
* Handle **user login & registration**
* Fetch user profiles and activity

---

## Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/my-feature`
3. Commit: `git commit -m "feat: add my feature"`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

---

## License

MIT License © Gorden Archer

