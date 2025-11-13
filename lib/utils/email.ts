import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendOTPEmail(email: string, otp: string): Promise<void> {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'ScholaX - Your OTP Code',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px; }
            .otp-code { font-size: 32px; font-weight: bold; color: #9333ea; text-align: center; letter-spacing: 8px; padding: 20px; background: #faf5ff; border-radius: 8px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px; }
            .warning { background: #fef2f2; border-left: 4px solid #ef4444; padding: 12px; margin: 20px 0; color: #991b1b; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>ScholaX</h1>
              <p>College Management System</p>
            </div>
            <div class="content">
              <h2>Your OTP Code</h2>
              <p>Hello,</p>
              <p>You requested to sign in to your ScholaX account. Please use the following OTP code:</p>
              
              <div class="otp-code">${otp}</div>
              
              <p>This code will expire in <strong>10 minutes</strong>.</p>
              
              <div class="warning">
                <strong>Security Notice:</strong> Never share this OTP with anyone. ScholaX staff will never ask for your OTP.
              </div>
              
              <p>If you didn't request this code, please ignore this email.</p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} ScholaX - IIIT Ranchi</p>
              <p>This is an automated email. Please do not reply.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
}

