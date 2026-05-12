# AI Resume Maker

A production-structured full-stack AI Resume Maker application built with React, Node.js, and OpenAI.

## Features

- **AI-Powered Parsing**: Extract structured data from PDF/DOCX resumes using OpenAI GPT-4o-mini.
- **Dynamic Form**: Review and edit parsed data with a user-friendly interface.
- **Premium Templates**: Choose from 3 professionally designed, ATS-friendly templates.
- **PDF Generation**: High-fidelity PDF export using Puppeteer.
- **Scalable Architecture**: Modular service-based backend and centralized theme-driven frontend.

## Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Axios & React Hook Form
- Framer Motion (Animations)
- Lucide React (Icons)
- Sonner (Notifications)

### Backend
- Node.js & Express.js
- OpenAI API (Parsing & Analysis)
- Puppeteer (PDF Generation)
- Multer (File Uploads)
- pdf-parse & mammoth (Text Extraction)
- LowDB (Local JSON Storage)

## Prerequisites

- Node.js (v18 or higher)
- OpenAI API Key

## Getting Started

### 1. Clone the repository
Ensure you are in the `d:\Tushar` directory.

### 2. Setup Backend
1. Go to `Backend` folder: `cd Backend`
2. Install dependencies: `npm install`
3. Configure `.env`:
   - Open `.env` and add your `OPENAI_API_KEY`.
   - Adjust other settings if necessary.
4. Start the server: `npm start` (or `node index.js`)

### 3. Setup Frontend
1. Go to `Frontend` folder: `cd Frontend`
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`

## Project Structure

### Backend
- `/config`: Environment and service configurations.
- `/controllers`: Request handlers.
- `/services`: Core logic (AI, PDF, Storage).
- `/routes`: API endpoints.
- `/utils`: Helper functions and text extractors.
- `/db`: JSON database files.

### Frontend
- `/theme`: Centralized design tokens (colors, typography).
- `/components`: Reusable UI and form components.
- `/templates`: Resume template definitions.
- `/services`: API service layer.
- `/pages`: Main application views.

## License
MIT
