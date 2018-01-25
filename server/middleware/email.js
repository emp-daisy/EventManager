const sendEmail = (from, to, subject, text) => {
  const email = {
    from,
    to,
    subject,
    text,
    html: `<p>${text.replace(/\n/g, '<br />')}</p>`
  };

  global.emailTransport.sendMail(email);
  /* , (err, info) => {
    if (err) {
      console.log('EMAIL FAILED ', err);
    } else {
      console.log(`Message sent: ${info.message}`);
    }
    console.log('INFOOOOOOO', email, info);
    }); */
};

export default sendEmail;
