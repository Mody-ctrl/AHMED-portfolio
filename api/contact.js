import nodemailer from 'nodemailer';

export default async function handler(request, response) {
  // Set CORS headers
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }

  if (request.method === 'POST') {
    try {
      const { name, email, message } = request.body;

      // Basic validation
      if (!name || !email || !message) {
        return response.status(400).json({
          success: false,
          error: {
            message: 'Name, email, and message are required'
          }
        });
      }

      if (name.length < 2 || name.length > 50) {
        return response.status(400).json({
          success: false,
          error: {
            message: 'Name must be between 2 and 50 characters'
          }
        });
      }

      if (message.length < 10 || message.length > 1000) {
        return response.status(400).json({
          success: false,
          error: {
            message: 'Message must be between 10 and 1000 characters'
          }
        });
      }

      // Create transporter
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: process.env.EMAIL_PORT || 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        },
        tls: {
          rejectUnauthorized: false
        }
      });

      // Verify transporter connection
      await transporter.verify();

      const mailOptions = {
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO || process.env.EMAIL_USER,
        replyTo: email,
        subject: `New Contact Message from ${name}`,
        text: `
New contact form submission:

Name: ${name}
Email: ${email}
Message: ${message}

Sent: ${new Date().toISOString()}
        `,
        html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
    .content { background: #ffffff; padding: 20px; border: 1px solid #e9ecef; border-radius: 5px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #495057; }
    .value { margin-top: 5px; padding: 10px; background: #f8f9fa; border-radius: 3px; }
    .footer { margin-top: 20px; padding-top: 15px; border-top: 1px solid #e9ecef; color: #6c757d; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>📩 New Contact Message</h2>
      <p>You have received a new message through your portfolio website.</p>
    </div>
    
    <div class="content">
      <div class="field">
        <div class="label">👤 Name:</div>
        <div class="value">${name}</div>
      </div>
      
      <div class="field">
        <div class="label">📧 Email:</div>
        <div class="value">${email}</div>
      </div>
      
      <div class="field">
        <div class="label">💬 Message:</div>
        <div class="value" style="white-space: pre-wrap;">${message}</div>
      </div>
    </div>
    
    <div class="footer">
      <p>Sent via Portfolio Website Contact Form</p>
      <p>Timestamp: ${new Date().toISOString()}</p>
    </div>
  </div>
</body>
</html>
        `
      };

      const info = await transporter.sendMail(mailOptions);
      
      response.status(200).json({
        success: true,
        message: 'Message sent successfully!',
        data: {
          id: info.messageId,
          timestamp: new Date().toISOString()
        }
      });

    } catch (error) {
      console.error('Contact form error:', error);
      response.status(500).json({
        success: false,
        error: {
          message: 'Failed to process your request',
          details: error.message
        }
      });
    }
  } else if (request.method === 'GET') {
    response.json({
      success: true,
      message: 'Contact API is working!',
      timestamp: new Date().toISOString()
    });
  } else {
    response.status(405).json({
      success: false,
      error: {
        message: 'Method not allowed'
      }
    });
  }
}