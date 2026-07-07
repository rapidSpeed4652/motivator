require("dotenv").config();
const axios = require("axios");

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/motivate-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Let's go!!!\nlatency is ${latency}ms!` });
});

app.command("/motivateme", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://zenquotes.io/api/random");
    await respond({ text: `Motivational quote: \n${response.data.fact}` });
  } catch (err) {
    await respond({ text: "I have failed! :O" });
  }
});

app.command("/ineedmotivation", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Available Decisions :D

/motivate-ping - Check you ping!
/motivateme - Gives you motivational quotes :3
/ineedmotivation - This help menu :P`
  });
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();