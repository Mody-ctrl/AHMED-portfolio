# Portfolio Website - GitHub Pages Deployment

A modern, responsive portfolio website showcasing my skills, projects, and contact information.

## Features

- Responsive design that works on all devices
- Interactive animations using GSAP
- Form validation and submission
- Professional UI/UX design
- Project showcase section
- Skills display section
- Contact form with email functionality

## GitHub Pages Deployment

This project is ready for deployment to GitHub Pages. Here's how to set it up:

1. Build the project for static export:
   ```bash
   npm run build
   ```

2. The build output will be in the `out` folder, which can be served directly by GitHub Pages.

3. To deploy:
   - Push your code to a GitHub repository
   - Go to your repository settings
   - In the "Pages" section, select source as "Deploy from a branch" and choose the `main` branch `/root` folder
   - Or use GitHub Actions to automate deployment

## Contact Form Setup

The contact form uses Formspree for email delivery since GitHub Pages doesn't support server-side processing:

1. Sign up at [Formspree](https://formspree.io/)
2. Create a new form and copy your unique form endpoint
3. Update the `FORMSPREE_URL` in `script.js` with your form endpoint:
   ```javascript
   const FORMSPREE_URL = 'https://formspree.io/f/YOUR_FORM_ID'; // Replace with your Formspree form ID
   ```
4. Make sure your email address in the fallback mailto link is correct

## Local Development

To run the project locally:

1. Install dependencies:
   ```bash
   npm install
   ```

2. For development with the backend server:
   ```bash
   npm run server
   ```

3. For Next.js development:
   ```bash
   npm run dev
   ```

## Build for Production

To build the project for production:

```bash
npm run build
```

The output will be in the `out` folder, which contains all static files ready for deployment to any static hosting service including GitHub Pages.

Built with HTML, CSS, JavaScript, Next.js, and Express.
