import * as nodemailer from "nodemailer";
import * as dotenv from "dotenv";

export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendPasswordResetEmail(to: string, token: string) {
    try {
      const info = await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: to,
        subject: "Password Reset Request",
        html: `
        <p>Dear User,</p>
        <p>You requested a password reset. Please click on the link below to reset your password:</p>
        <p><a href="https://app.gptbots.pro/reset-password?token=${token}">Reset Password</a></p>
        <p>If you did not request this, please ignore this email.</p>
        <p>Thank you,<br>GPTBOTS</p>
        `,
      });
      console.log("Password reset email sent to: %s", to);
      return info;
    } catch (error) {
      console.error("Error sending password reset email:", error);
      throw new Error("Failed to send password reset email");
    }
  }

  async welcomeEmail(to: string) {
    try {
      const info = await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: to,
        subject: "Welcome to GPTBOTS",
        html: `
        <p>Dear User,</p>
        <p>Welcome to GPTBOTS! We are excited to have you on board.</p>
        <p>Thank you for choosing us.</p>
        <p>Best regards,<br>GPTBOTS</p>
        `,
      });
      console.log("Welcome email sent to: %s", to);
      return info;
    } catch (error) {
      console.error("Error sending welcome email:", error);
      throw new Error("Failed to send welcome email");
    }
  }

  //   async sendNewIpNotification(to: string, newIp: string) {
  //     const info = await this.transporter.sendMail({
  //       from: 'aletechglobal@gmail.com',
  //       to: to,
  //       subject: "New IP Address Login Notification",
  //       html: `
  //       <p>Dear ${to},</p>
  //       <p>A new login was detected from IP address: <strong>${newIp}</strong>. If this wasn't you, please secure your account immediately.</p>
  //       `,
  //     });

  //     console.log('Message sent: %s', info.messageId);
  //   }

  //   async sendTopUpNotification(to: string, userName: string) {
  //     const info = await this.transporter.sendMail({
  //       from: 'aletechglobal@gmail.com',
  //       to: to,
  //       subject: "Top-Up Required to Continue Earnings",
  //       html: `
  //       <p>Dear ${userName},</p>
  //       <p>Congratulations! You have reached 300% of your initial investment earnings.</p>
  //       <p>To continue earning, please top up your investment.</p>
  //       <p>Thank you for your continued trust in our platform.</p>
  //       <p>Best regards,<br> Your Investment Team</p>
  //       `,
  //     });

  //     console.log('Top-up notification sent: %s', info.messageId);
  //   }
}
