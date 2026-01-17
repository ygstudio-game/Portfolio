// utils/sendContactEmail.js
import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const sendContactEmail = async (name, userEmail, message) => {
  const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN,
    EMAIL_SENDER_ADDRESS, 
    ADMIN_EMAIL_ADDRESS,
  } = process.env;

  // Setup OAuth2 client
  const oAuth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oAuth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

  try {
    const accessTokenObj = await oAuth2Client.getAccessToken();
    const accessToken = accessTokenObj?.token || accessTokenObj;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: EMAIL_SENDER_ADDRESS,
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        refreshToken: GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken,
      },
      tls: {
        rejectUnauthorized: true,
      },
    });

    // Get current date and time
    const date = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const mailOptions = {
      from: `"Portfolio Contact" <${EMAIL_SENDER_ADDRESS}>`,
      to: ADMIN_EMAIL_ADDRESS || EMAIL_SENDER_ADDRESS, 
      replyTo: userEmail, 
      subject: `✨ New Inquiry from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Message</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
          
          <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
            
            <div style="background-color: #f59e0b; padding: 30px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: 0.5px;">New Portfolio Inquiry</h1>
            </div>

            <div style="padding: 40px;">
              
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
                <tr>
                  <td style="padding-bottom: 8px; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">From</td>
                </tr>
                <tr>
                  <td style="padding-bottom: 20px; color: #111827; font-size: 18px; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding-bottom: 8px; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Email Address</td>
                </tr>
                <tr>
                  <td style="padding-bottom: 20px;">
                    <a href="mailto:${userEmail}" style="color: #f59e0b; font-size: 16px; text-decoration: none; font-weight: 500;">${userEmail}</a>
                  </td>
                </tr>
                 <tr>
                  <td style="padding-bottom: 8px; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Date Received</td>
                </tr>
                <tr>
                  <td style="color: #374151; font-size: 16px;">${date} at ${time}</td>
                </tr>
              </table>

              <div style="background-color: #f9fafb; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 4px; margin-top: 10px;">
                <p style="margin: 0; color: #6b7280; font-size: 12px; font-weight: 600; uppercase; margin-bottom: 10px;">MESSAGE:</p>
                <p style="margin: 0; color: #374151; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>

              <div style="margin-top: 35px; text-align: center;">
                <a href="mailto:${userEmail}?subject=Re: Portfolio Inquiry" style="background-color: #111827; color: #ffffff; padding: 12px 25px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px; display: inline-block;">Reply to ${name}</a>
              </div>

            </div>

            <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">This email was sent from your portfolio contact form.</p>
            </div>
            
          </div>
        </body>
        </html>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Contact email sent:", result.response);
    return result;

  } catch (err) {
    console.error("Email sending failed:", err.message);
    throw new Error("Failed to send contact email");
  }
};

export default sendContactEmail;