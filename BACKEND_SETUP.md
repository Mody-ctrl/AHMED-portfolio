# Contact Form Backend Setup Guide

Your portfolio contact form is now connected to a backend! Here's how to set it up:

## What Was Added

✅ **Backend API Endpoint** (`/api/contact.js`) - Handles form submissions and sends emails using Vercel serverless functions
✅ **Email Functionality** - Uses nodemailer to send:
  - An email to you at `ahmedabobaker1010@gmail.com`
  - A confirmation email to the sender

✅ **Form Updates** - Updated the contact form with proper IDs and name attributes

## Setup Instructions

### Step 1: Set Up Gmail App Password

Since Gmail doesn't allow regular passwords for third-party apps, you need to create an **App-Specific Password**:

1. Go to your Google Account: https://myaccount.google.com
2. Click **Security** in the left menu
3. Scroll down to **How you sign in to Google**
4. Make sure **2-Step Verification** is ON (turn it on if needed)
5. Scroll back down and find **App passwords**
6. Select **Mail** and **Windows Computer** (or your device)
7. Google will generate a 16-character password
8. Copy this password

### Step 2: Configure Environment Variables

#### For Local Development:
1. Open `.env.local` in your project
2. Replace `your-gmail@gmail.com` with your Gmail address (e.g., `ahmedabobaker1010@gmail.com`)
3. Replace `your-app-specific-password` with the 16-character password from Step 1

#### For Vercel Deployment:
1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add two new variables:
   - Name: `GMAIL_EMAIL` | Value: `your-gmail@gmail.com`
   - Name: `GMAIL_PASSWORD` | Value: `your-app-specific-password`
4. Select **Production** and **Preview** environments
5. Click **Save**

### Step 3: Test Locally

Run the development server:
```bash
npm run dev
```

Go to your portfolio website, fill out the contact form, and click "Send Message". 

Check:
- Your email for the contact submission
- Confirm the sender gets a confirmation email

### Step 4: Deploy to Vercel

Make sure to commit your changes (except `.env.local`):
```bash
git add .
git commit -m "Add backend contact form with email functionality"
git push
```

Your form will automatically work on Vercel once the environment variables are set!

## Troubleshooting

**"Failed to send email"**
- Check that `GMAIL_EMAIL` and `GMAIL_PASSWORD` are correctly set in `.env.local` or Vercel environment variables
- Verify 2-Step Verification is enabled on your Google Account
- Make sure you used an **App-Specific Password**, not your regular Gmail password

**Emails not arriving**
- Check your spam/junk folder
- Verify the email address is correct in `api/contact.js`

**"Method not allowed" error**
- This means you're not using POST. The form handles this automatically, but if testing manually, use POST requests

## Files Modified/Created

- `public/index.html` - Updated contact form with ID and name attributes
- `api/contact.js` - NEW: Backend API endpoint for handling form submissions
- `.env.example` - NEW: Template for environment variables
- `.env.local` - NEW: Your local environment configuration

---

Questions? The backend will automatically work once you set up your Gmail credentials!
