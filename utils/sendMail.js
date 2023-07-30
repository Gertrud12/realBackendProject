import nodemailer from 'nodemailer';

const sendMail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'gladys.gibson59@ethereal.email',
          pass: 'Aq6bHVWzBq9axAd4sK'
      }
  });

    const mailOptions = {
      from: 'gladys.gibson59@ethereal.email',
      to: email,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
  }
}

export default sendMail