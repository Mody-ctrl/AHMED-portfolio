import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Send contact email
const sendContactEmail = async ({ name, email, message }) => {
  try {
    const transporter = createTransporter();
    
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
    
    return {
      success: true,
      messageId: info.messageId,
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error('Email sending error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Test email configuration
const testEmailConfig = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    return { success: true, message: 'Email configuration is working' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export { sendContactEmail, testEmailConfig };