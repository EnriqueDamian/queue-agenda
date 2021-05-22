const Agenda = require("agenda");
const dbURL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@nomanacola.k2ywv.mongodb.net/api?retryWrites=true&w=majority`;

const agenda = new Agenda({
  db: { address: dbURL, collection: "jobs" },
  processEvery: "20 seconds",
  useUnifiedTopology: true,
});

const placeOrder = (order) => {
  agenda.start();
  return agenda.create("cook", order).save();
};
/* agenda.on("ready", function () {
   
    agenda.start();
}); */
agenda.define("cook", (job, done) => {
  setTimeout(
    () => console.log("1. Getting the ingredients ready 🥬 🧄 🧅 🍄"),
    1000
  );
  setTimeout(() => console.log(`2. 🍳 Preparing ${job.attrs.data.dish}`), 1500);
  setTimeout(() => {
    console.log(
      `3. 🧾 Order ${job.attrs.data.orderNo}: ${job.attrs.data.dish} ready`
    );
    done();
  }, job.attrs.data.qty * 5000);
});

agenda.on("success:cook", async (job) => {
  await agenda.create("serve", job.attrs.data).save();
});
agenda.on("fail:serve", (err, job) => {
  console.log(`Job failed with error: ${err.message}`);
});
agenda.define("serve", (job) => {
  console.log(`4. 🧾 ${job.attrs.data.qty}x ${job.attrs.data.dish} ready to be served 😋`);
  
});

module.exports.placeOrder = placeOrder;
