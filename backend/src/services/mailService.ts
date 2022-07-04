import { createTransport } from 'nodemailer';
import config from '../../config';

export const sendVerificationEmail = async (
  verificationToken: string,
  email: string,
): Promise<boolean> => {
  const transporter = createTransport({
    service: 'gmail',
    auth: {
      user: config.app.mailUsername,
      pass: config.app.mailPassword,
    },
  });

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <body>
      <h1> Welcome to RPG </h1>
      <p>Click the link below to activate your account</p>
      <a href="${config.app.appUrl}/verify/${verificationToken}">
        ${config.app.appUrl}/verify?token=${verificationToken};email=${email}
      </a>
      <br />
      <p>You will be directed to a verification page</p>
    </body>
  `;

  const mailOptions = {
    from: config.app.mailUsername,
    to: email,
    subject: 'Your RPG verification email',
    html,
  };
  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('MAIL SENT!', result);
    return true;
  } catch (e) {
    console.error('MAIL NOT SENT');
    console.error(e);
    return false;
  }
};
export const sendForgotEmail = async (
  verificationToken: string,
  email: string,
): Promise<boolean> => {
  const transporter = createTransport({
    service: 'gmail',
    auth: {
      user: config.app.mailUsername,
      pass: config.app.mailPassword,
    },
  });

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <body>
      <h1> Welcome to RPG </h1>
      <p>We got word that you forgot your password. Click on the link below to update your password.</p>
      <a href="${config.app.appUrl}/for/${verificationToken}">
        ${config.app.appUrl}/remember?token=${verificationToken};email=${email}
      </a>
      <br />
      <p>You will be directed to a remember page where you can re-enter your password</p>
      <h4>DISCLAIMER!</h4>
      <p>The link is valid for the period of 1 hour</p>
    </body>
  `;

  const mailOptions = {
    from: config.app.mailUsername,
    to: email,
    subject: 'Forgot your RPG Password?',
    html,
  };
  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('MAIL SENT!', result);
    return true;
  } catch (e) {
    console.error('MAIL NOT SENT');
    console.error(e);
    return false;
  }
};
