const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname + "/.env") });
const axios = require("axios").default;
const transporter = require("./helper/mailer");

const URL = process.env.DOCTOR_URL_KARLSFELD;
const URL2 = process.env.DOCTOR_URL_GZB;
const fetchVaccine = () => {
    axios
    .get(URL2)
    .then((response) => {
        const { data } = response;
        console.log(data);
        if (data.total >= 1) {
        let mailOptions = {
            from: "omartrigui2020@gmail.com", // sender address
            to: "omartrigui2020@gmail.com", // lisurlt of receivers
            subject: "Covid Vaccine", // Subject line
            html: `we found a 💉`, // html body
        };
        try {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                console.log(error);
                } else {
                console.log("Message sent: %s", info.messageId);
                }
            });
        } catch (error) {
            console.log(error);
        }

        console.log("we found a 💉");
        } else {
        console.log("keep going");
        }
    })
    .catch((error) => {
        // handle error
        console.log(error);
    });
}

setInterval(() => {
    fetchVaccine();
}, 10000);

