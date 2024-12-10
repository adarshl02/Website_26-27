const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: "clubpratibimb.sgsits@gmail.com",
    pass: "pgydxscrcdrljxdc",
  },
});


const sendEventNotificationEmail = async (recipientEmail) => {
  const templatePath = path.join(__dirname, "../templates/notificationTemplate.html");
  const emailTemplate = fs.readFileSync(templatePath, "utf-8");

  
  const mailOptions = {
    from: "clubpratibimb.sgsits@gmail.com", 
    to: recipientEmail,
    subject: "Calling Volunteers For Batch 2028",
    html: emailTemplate,
  };

  return transporter.sendMail(mailOptions);
};


const sendNotificationsToAllUsers = async (userEmails, eventDetails) => {
  try {
    for (let email of userEmails) {
      await sendEventNotificationEmail(email, eventDetails);
      console.log(`Notification sent to ${email}`);
    }

    console.log("All notifications sent successfully!");
  } catch (error) {
    console.error("Error while sending notifications:", error);
  }
};

const userEmails = [
  "chaitanyagupta326@gmail.com",
  "atharvasharma603@gmail.com",
  "millivermasg@gmail.com",
  "mishra.tanishq20@gmail.com",
  "suryanshsinghchawlags@gmail.com",
  "puvaeshole2312@gmail.com",
  "naikarchisha06@gmail.com",
  "preshasamdani1706@gmail.com",
  "raseshgupta22@gmail.com",
  "ananya6805@gmail.com",
  "harshvardhansikarwar14@gmail.com",
  "kashishpahwa618@gmail.com",
  "kinjaljainkj446@gmail.com",
  "hp07jy@gmail.com",
  "dhairyaagrawal1612@gmail.com",
  "jainshresth758@gmail.com",
  "rishabh.mandge1506@gmail.com",
  "gupta05mansi@gmail.com",
  "lakshyjain682@gmail.com",
  "siddharthbhadauria7777@gmail.com",
  "stutishukla765@gmail.com",
  "harshsachdev2006@gmail.com",
  "vermashalini354@gmail.com",
  "prakrati004@gmail.com",
  "krishnabadgujar163@gmail.com",
  "jatinsisodhiya6505@gmail.com",
  "parulneware@gmail.com",
  "ansh.prakhar2006gupta@gmail.com",
  "prince989324@gmail.com",
  "kuhoo.malviya@gmail.com",
  "sfcssatyamsinghal@gmail.com",
  "drishyabarfa@gmail.com",
  "abhineetpatidar@gmail.com",
  "2006shriya@gmail.com",
  "mariyamk.121673@gmail.com",
  "rajchouhanoffcial@gmail.com",
  "samarthalexander2017@gmail.com",
  "tanisharoshan2004@gmail.com",
  "dittmc12@gmail.com",
  "prateek09k@gmail.com",
  "surbhijhs.2202@gmail.com",
  "avaniagrawal004@gmail.com",
  "amankushwaha010805@gmail.com",
  "techy1shiva@gmail.com",
  "mishraprakhar946@gmail.com",
  "anuragmishra1769@gmail.com",
  "shyamji29nov@gmail.com",
  "rudrakshpanchore007@gmail.com",
  "ananyaayushman@gmail.com",
  "vaibhavpandey067@gmail.com",
  "agraawalpalak602@gmail.com",
  "kakanibrinda23062006@gmail.com",
  "abhaydhimanh3@gmail.com",
  "radheshsolanki1127@gmail.com",
  "kmlkbhandare2005@gmail.com",
  "mradulsomani2006@gmail.com",
  "gauri.s.v.surange@gmail.com",
  "niveshjain109@gmail.com",
  "prashantchourasiya2007@gmail.com",
  "sarthakbilare2005@gmail.com"
];

sendNotificationsToAllUsers(userEmails);
