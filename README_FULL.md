# Portfolio Website with Backend

A modern portfolio website with full-stack functionality including contact form handling, email notifications, and API integration.

##🚀 Features

- **Frontend**: Responsive HTML/CSS/JavaScript portfolio
- **Backend**: Node.js/Express API server
- **Contact Form**: Full validation, spam protection, and email notifications
- **Security**: CORS, rate limiting, input sanitization
- **Email Integration**: Nodemailer with HTML email templates

##📁 StructureStructure

```
portfolio-website/
├── routes/              # API route handlers
│  └── contact.js       # Contact form API endpoint
├── services/            # Service modules
│   └── emailService.js  # Email sending functionality
├── utils/               # Utility functions
│   └── helpers.js       # Helper functions
├── middleware/          # Express middleware
│   └── validator.js     # Validation middleware
├── css/                 # Stylesheets
│   └── form-states.css  # Form loading/error states
├── out/                 # Next.js static export (generated)
├── index.html           # Main portfolio page
├── script.js           # Frontend JavaScript
├── style.css            # Main stylesheet
├── server.js            # Express server
├── next.config.js       # Next.js configuration
├── package.json         # Dependencies and scripts
├── .env                 # Environment variables
└── README.md            # This file
```

##🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Edit the `.env` file with your configuration:

```env
# Server Configuration
PORT=3001
NEXT_PUBLIC_API_URL=http://localhost:3001

# Email Configuration (Gmail example)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=your-email@gmail.com

# Security
NODE_ENV=development
```

### 3. Gmail Setup (for email notifications)

1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. Use the generated password in `EMAIL_PASS`

### 4. Development

```bash
# Start the Express server
npm run server

# Or start both server and Next.js dev (if needed)
npm run dev:full
```

### 5. Production Build

```bash
# Build Next.js static files
npm run build

# Start production server
npm start
```

##📧 EndI Endpoints

### Contact Form
- `POST /api/contact/send` - Submit contact form
- `GET /api/contact/test` - Test contact API
- `GET /api/health` - Health check endpoint

### Example Request

```javascript
fetch('http://localhost:3001/api/contact/send', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello, I would like to discuss a project.'
  })
})
```

##🔒 Security Features

- **Rate Limiting**: Prevents spam (5 requests/hour for contact form)
- **Input Validation**: Server-side validation with express-validator
- **CORS Protection**: Configured for development/production
- **Spam Detection**: Keyword-based spam filtering
- **Input Sanitization**: XSS protection
- **Helmet.js**: Security headers

##🎨 Frontend Features

- **Form Validation**: Real-time field validation
- **Loading States**: Visual feedback during submission
- **Error Handling**: Clear error messages
- **Success Feedback**: Confirmation on successful submission
- **Responsive Design**: Works on all devices

## 📱 Testing

1. Start the server: `npm run server`
2. Open browser: `http://localhost:3001`
3. Navigate to Contact section
4. Fill out and submit the form
5. Check your email for the notification

##🚨 Troubleshooting

### Common Issues

1. **Email not sending**: 
   - Check Gmail app password
   - Verify environment variables
   - Check server console for errors

2. **CORS errors**:
   - Verify `NEXT_PUBLIC_API_URL` matches your server URL
   - Check CORS configuration in `server.js`

3. **Form validation errors**:
   - Ensure all fields meet requirements
   - Check browser console for detailed errors

### Debug Mode

Set `NODE_ENV=development` in `.env` for detailed error messages.

## 📄 License

This project is for personal/portfolio use.