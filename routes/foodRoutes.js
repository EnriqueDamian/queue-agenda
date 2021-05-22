const express = require("express");
const router = express.Router();
const foodController = require("../controllers/foodController");
const jobs = require("../jobs/agenda");
const { placeOrder } = require("../jobs/restaurant");

/* router.get("/:id", foodController.getFoodById); */
router.post("/store", foodController.storeFood);
router.get("/queue", jobs.queueFood);
router.get("/", (req, res) => {
  res.send("😋 We are serving freshly cooked food 🍲");
});
router.post("/order", (req, res) => {
  let order = {
    dish: req.body.dish,
    qty: req.body.qty,
    orderNo: Date.now().toString(36),
  };

  if (order.dish && order.qty) {
    placeOrder(order)
      .then(() =>
        res.json({ done: true, message: "Your order will be ready in a while" })
      )
      .catch(() =>
        res.json({ done: false, message: "Your order could not be placed" })
      );
  } else {
    res.status(422);
  }
});
router.post('/order-legacy', (req, res) => {
    let order = {
        dish: req.body.dish,
        qty: req.body.qty,
        orderNo: Date.now().toString(36)
    }
    if (order.dish && order.qty) {
        setTimeout(() => console.log("Getting the ingredients ready... 🥬 🧄 🧅 🍄"), 1000);
        setTimeout(() => console.log(`🍳 Preparing ${order.dish}`), 1500);
        setTimeout(() => {
            console.log(`🧾 Order ${order.orderNo}: ${order.dish} ready`);
            res.json({ done: true, message: `Your ${order.qty}x ${order.dish} is ready` })
        }, order.qty * 5000);
    } else {
        console.log("Incomplete order rejected");
        res.status(422).json({ done: false, message: "Your order could not be placed" });
    }
});

module.exports = router;
