import { sendContactEmail } from '../services/emailService';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const { name, email, message } = req.body;

      // Basic validation
      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Name, email, and message are required'
          }
        });
      }

      if (name.length < 2 || name.length > 50) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Name must be between 2 and 50 characters'
          }
        });
      }

      if (message.length < 10 || message.length > 1000) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Message must be between 10 and 1000 characters'
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
          details: error.message
        }
      });
    }
  } else if (req.method === 'GET') {
    res.json({
      success: true,
      message: 'Contact API is working!',
      timestamp: new Date().toISOString()
    });
  } else {
    res.status(405).json({
      success: false,
      error: {
        message: 'Method not allowed'
      }
    });
  }
}