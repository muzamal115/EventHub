import dotenv from 'dotenv'
dotenv.config()
import nodemailer from 'nodemailer'
const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,
    }
})

export const sendEmail = async (userEmail, otp, type) => {
  try {
    const subject =
      type === "account-verification"
        ? "Verify Your EventHub Account"
        : "Confirm Your Event Booking";

    const html =
      type === "account-verification"
        ? `
          <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; border:1px solid #e5e5e5; border-radius:10px;">
            <h2 style="color:#2563eb;">Welcome to EventHub 🎉</h2>

            <p>Thank you for creating your account.</p>

            <p>Please use the following OTP to verify your email address:</p>

            <div style="background:#2563eb; color:#fff; font-size:28px; font-weight:bold; letter-spacing:6px; padding:15px; text-align:center; border-radius:8px;">
              ${otp}
            </div>

            <p style="margin-top:20px;">
              This OTP is valid for <strong>5 minutes</strong>.
            </p>

            <p>If you didn't create an account, please ignore this email.</p>

            <hr>

            <p style="font-size:12px; color:gray;">
              EventHub Team
            </p>
          </div>
        `
        : `
          <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:20px; border:1px solid #e5e5e5; border-radius:10px;">
            <h2 style="color:#16a34a;">Event Booking Confirmation</h2>

            <p>Please use the following OTP to confirm your booking.</p>

            <div style="background:#16a34a; color:#fff; font-size:28px; font-weight:bold; letter-spacing:6px; padding:15px; text-align:center; border-radius:8px;">
              ${otp}
            </div>

            <p style="margin-top:20px;">
              This OTP is valid for <strong>5 minutes</strong>.
            </p>

            <p>If you didn't request this booking, simply ignore this email.</p>

            <hr>

            <p style="font-size:12px; color:gray;">
              EventHub Team
            </p>
          </div>
        `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject,
      html,
    });

    console.log(`OTP email sent to ${userEmail} for ${type}`);
  } catch (error) {
    console.log("Email Error:", error);
  }
};



export const sendBookingRequestEmail = async (userEmail, eventTitle, bookingId) => {
  try {
    const info = await transporter.sendMail({
      from: `"EventHub" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: "📩 Booking Request Received - EventHub",

      html: `
      <div style="max-width:600px;margin:auto;font-family:Arial,sans-serif;background:#f5f5f5;padding:30px;">

        <div style="background:#ffffff;border-radius:10px;overflow:hidden;">

          <div style="background:#2563eb;padding:20px;text-align:center;">
            <h1 style="color:#ffffff;margin:0;">EventHub</h1>
          </div>

          <div style="padding:30px;">

            <h2 style="color:#333;">Booking Request Received ✅</h2>

            <p style="font-size:16px;color:#555;">
              Dear Customer,
            </p>

            <p style="font-size:16px;color:#555;">
              Thank you for choosing <strong>EventHub</strong>.
              We have successfully received your booking request.
            </p>

            <table style="width:100%;border-collapse:collapse;margin-top:20px;">
              <tr>
                <td style="padding:10px;font-weight:bold;">Event</td>
                <td style="padding:10px;">${eventTitle}</td>
              </tr>

              <tr style="background:#f8f8f8;">
                <td style="padding:10px;font-weight:bold;">Booking ID</td>
                <td style="padding:10px;">${bookingId}</td>
              </tr>

              <tr>
                <td style="padding:10px;font-weight:bold;">Current Status</td>
                <td style="padding:10px;color:#f59e0b;font-weight:bold;">
                  Pending Approval
                </td>
              </tr>
            </table>

            <p style="margin-top:25px;color:#555;">
              Your booking request is currently being reviewed by our administration team.
            </p>

            <p style="color:#555;">
              Once your booking is approved, you will receive another confirmation email with your final booking status.
            </p>

            <p style="color:#555;">
              No further action is required from you at this time.
            </p>

            <hr style="margin:30px 0;">

            <p style="font-size:13px;color:#888;text-align:center;">
              Thank you for choosing EventHub ❤️
            </p>

          </div>

        </div>

      </div>
      `,
    });

    console.log(`Booking request email sent to ${userEmail}`);
    return info;

  } catch (error) {
    console.log("Booking Request Email Error:", error);
  }
};

export const sendBookingConfirmationEmail = async (userEmail, eventTitle, bookingId) => {
  try {
    const info = await transporter.sendMail({
      from: `"EventHub" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: "🎉 Booking Confirmed - EventHub",

      html: `
      <div style="max-width:600px;margin:auto;font-family:Arial,sans-serif;background:#f5f5f5;padding:30px;">

        <div style="background:#ffffff;border-radius:10px;overflow:hidden;">

          <div style="background:#16a34a;padding:20px;text-align:center;">
            <h1 style="color:#ffffff;margin:0;">EventHub</h1>
          </div>

          <div style="padding:30px;">

            <h2 style="color:#16a34a;">🎉 Your Booking Has Been Confirmed</h2>

            <p style="font-size:16px;color:#555;">
              Congratulations!
            </p>

            <p style="font-size:16px;color:#555;">
              Your booking has been reviewed and approved by our administration team.
            </p>

            <table style="width:100%;border-collapse:collapse;margin-top:20px;">
              <tr>
                <td style="padding:10px;font-weight:bold;">Event</td>
                <td style="padding:10px;">${eventTitle}</td>
              </tr>

              <tr style="background:#f8f8f8;">
                <td style="padding:10px;font-weight:bold;">Booking ID</td>
                <td style="padding:10px;">${bookingId}</td>
              </tr>

              <tr>
                <td style="padding:10px;font-weight:bold;">Booking Status</td>
                <td style="padding:10px;color:#16a34a;font-weight:bold;">
                  Confirmed
                </td>
              </tr>
            </table>

            <p style="margin-top:25px;color:#555;">
              Your seat has been successfully reserved.
            </p>

            <p style="color:#555;">
              Please keep this email for your records. We look forward to welcoming you to the event.
            </p>

            <hr style="margin:30px 0;">

            <p style="font-size:13px;color:#888;text-align:center;">
              Thank you for choosing EventHub ❤️
            </p>

          </div>

        </div>

      </div>
      `,
    });

    console.log(`Booking confirmation email sent to ${userEmail}`);
    return info;

  } catch (error) {
    console.log("Booking Confirmation Email Error:", error);
  }
};


