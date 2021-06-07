const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname + "/.env") });
const axios = require("axios").default;
const transporter = require("./helper/mailer");
const doctolib = require("./helper/doctors");
const randomNumber = require("./helper/Random");
const moment = require("moment");
console.log("Start the process 🎸");
const fetchVaccine = () => {
  doctolib.doctors.map((doctor) => {
    axios
      .get(doctor.url)
      .then((response) => {
        const { data } = response;
        //console.log(data);
        if (doctor.skip && moment().isSameOrAfter(doctor.excute)) {
          doctor.skip = false;
        }
        if (data.total >= 1 && !doctor.skip) {
          let mailOptions = {
            from: "omartrigui2020@gmail.com", // sender address
            to: "omartrigui2020@gmail.com", // lisurlt of receivers
            subject: "Covid Vaccine", // Subject line
            html: `<span>we found a ${doctor.type} 💉 in ${doctor.name} </span>: <br/> <a href="${doctor.link}">${doctor.link}</a>`, // html body
          };
          try {
            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                console.log(error);
              } else {
                console.log("Message sent: %s", info.messageId);
              }
            });
            doctor.skip = true;
            doctor.excute = moment().add(6, "hours");
          } catch (error) {
            console.log(error);
          }

          console.log(
            `✅  we found a ${doctor.type} 💉 in doctor ${doctor.name} `
          );
        } else {
          console.log(
            `❌ keep going doctor ${doctor.name} does not have a 💉 available right now`
          );
        }
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  });
};

setInterval(() => {
  fetchVaccine();
}, randomNumber(10000, 30000));
