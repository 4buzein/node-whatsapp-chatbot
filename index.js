//whatsapp api
const { Client } = require("whatsapp-web.js");
const client = new Client();

// Require the package
const QRCode = require("qrcode");

//chat bot api dari obito
const CHATBOT_API_URL = "https://be-chat-bot.vercel.app";

client.on("qr", (qr) => {
  // Print the QR code to terminal
  QRCode.toString(qr, { type: "terminal" }, function (err, QRcode) {
    if (err) return console.log("error occurred");

    // Printing the generated code
    console.log(QRcode);
  });
});

client.on("ready", () => {
  console.log("Client is ready!");
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
