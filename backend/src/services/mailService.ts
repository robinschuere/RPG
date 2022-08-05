import { createTransport } from 'nodemailer';
import config from '../../config';

const createMailBody = (
  type: 'verify' | 'remember',
  verificationToken: string,
  email: string,
) => {
  const url = `${config.app.appUrl}/${type}?token=${verificationToken}&email=${email}`;
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <body>
    <h1> Welcome to RPG </h1>
    <p>Click the link below to ${
      type === 'verify' ? 'activate' : 'reset'
    } your account</p>
    <a href="${url}">
    ${url}
    </a>
    <br />
    <p>You will be directed to a verification page</p>
  </body>
`;

  return html;
};

const send = async (email, html, subject): Promise<boolean> => {
  const transporter = createTransport({
    service: 'gmail',
    auth: {
      user: config.app.mailUsername,
      pass: config.app.mailPassword,
    },
  });
  const mailOptions = {
    from: config.app.mailUsername,
    to: email,
    subject,
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

export const sendVerificationEmail = async (
  verificationToken: string,
  email: string,
): Promise<boolean> => {
  const html = createMailBody('verify', verificationToken, email);
  return send(email, html, 'Your RPG account - verification email');
};
export const sendForgotEmail = async (
  verificationToken: string,
  email: string,
): Promise<boolean> => {
  const html = createMailBody('remember', verificationToken, email);
  return send(email, html, 'Your RPG account - reset email');
};
