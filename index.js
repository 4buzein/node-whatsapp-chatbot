//express
const express = require("express");
const app = express();
const port = 3000;

//cors
const cors = require("cors");

//whatsapp api
const { Client } = require("whatsapp-web.js");
const client = new Client();

// Require the package
const QRCode = require("qrcode");

//chat bot api dari obito
const CHATBOT_API_URL = "https://be-chat-bot.vercel.app";

app.use(cors());

app.get("/", (req, res) => {
  //   res.send("Hello World!");

  client.on("qr", (qr) => {
    // Print the QR code to terminal
    QRCode.toDataURL(qr, function (err, url) {
      if (err) return console.log("error occurred");

      //generate whatsapp QR Code
      res.send(`<img src='${url}'>`);
    });
  });

  client.on("ready", () => {
    res.send("Client is ready!");
  });

  client.on("message", (msg) => {
    if (msg.body.includes("/bot")) {
      //chat gpt api
      async function chatBot(question) {
        const response = await fetch(CHATBOT_API_URL + "?question=" + question);
        const data = await response.json();
        msg.reply(data);
      }

      chatBot(msg.body);
    }
  });

  client.initialize();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
