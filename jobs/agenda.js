const Agenda = require("agenda");
const dbURL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@nomanacola.k2ywv.mongodb.net/api?retryWrites=true&w=majority`;

const agenda = new Agenda({
  db: { address: dbURL, collection: "jobs" },
  processEvery: "20 seconds",
  useUnifiedTopology: true,
});

let connectionEstablised = false;

agenda.define("sendNewsletter", function (job) {
  console.log(
    "Sending newsletter. Time: " +
      new Date().getMinutes() +
      ":" +
      new Date().getSeconds()
  );
});

agenda.on("ready", function () {
  connectionEstablished = true;
});
exports.queueFood = (req, res, next) => {
  if (connectionEstablished) {
    agenda.every("3 seconds", "sendNewsletter");
    agenda.start();
  }
};
