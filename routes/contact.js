const express = require('express');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');
const router = express.Router();

// Import email service
const { sendContactEmail } = require('../services/emailService');

// Rate limiting for contact form
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 contact requests per windowMs
  message: {
    error: 'Too many contact requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Validation rules
const validateContact = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters')
];

// POST /api/contact/send - Handle contact form submission
router.post('/send', contactLimiter, validateContact, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Validation failed',
          details: errors.array()
        }
      });
    }

    const { name, email, message } = req.body;

    // Additional spam protection
    if (containsSpam(message)) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Message contains spam content'
        }
      });
    }

    // Send email
    const emailResult = await sendContactEmail({ name, email, message });
    
    if (emailResult.success) {
      res.status(200).json({
        success: true,
        message: 'Message sent successfully!',
        data: {
          id: emailResult.messageId,
          timestamp: new Date().toISOString()
        }
      });
    } else {
      throw new Error(emailResult.error || 'Failed to send email');
    }

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to process your request',
        details: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
      }
    });
  }
});

// GET /api/contact/test - Test endpoint
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Contact API is working!',
    timestamp: new Date().toISOString()
  });
});

// Spam detection helper
function containsSpam(message) {
  const spamKeywords = [
    'viagra', 'casino', 'lottery', 'winner', 'congratulations you won',
    'click here', 'urgent', 'act now', 'limited time', 'free money',
    'work from home', 'make money fast', 'no obligation', 'guarantee'
  ];
  
  const lowerMessage = message.toLowerCase();
  return spamKeywords.some(keyword => lowerMessage.includes(keyword));
}

module.exports = router;