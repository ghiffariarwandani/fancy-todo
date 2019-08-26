const nodemailer = require('nodemailer');

function emailkita(email) {
  
  async function main() {

      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
          service : "Yahoo",
          host: 'smtp.mail.yahoo.com',
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
              user: process.env.EMAIL_SECRET, // generated ethereal user
              pass: process.env.PASSWORD_EMAIL // generated ethereal password
          },
          debug: false,
          logger: true
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
          from:'"Fancy Todo - Whatsup dude!" <foxinema@yahoo.com>', // sender address
          to: email, // list of receivers
          subject: "Registration Form", // Subject line
          text: "Hi, we just get you register to our beloved fancy-todo. Please go to this link http://localhost:3000/users/login to get new experience. ", // plain text body
         
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

  }
  main().catch(console.error);

}

module.exports = emailkita