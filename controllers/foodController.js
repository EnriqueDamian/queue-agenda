const Food = require("../models/food");

/* exports.getFoodById = (req, res, next) => {

  res.json({ mensaje: "hola" });
};
 */


exports.storeFood = async (req, res, next) => {
  const { name, price } = req.body;
  const createFood = new Food({
    name,
    price,
  });
  try {
    await createFood.save();
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({ food: createFood });
};

