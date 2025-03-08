import OrderProducts from "../models/order.model.js";


export const addorderProduct = async (req, res) => {
  try {
    const data = req.body;

    const newOrderProduct = new OrderProducts(data);

    await newOrderProduct.save();

    res.status(201).json({
      message: "Product ordered successfully",
      id: newOrderProduct._id  // ✅ অর্ডার আইডি রেসপন্সে পাঠানো
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const getorderProducts = async (req, res) => {
  try {
    const orderProducts = await OrderProducts.find();
    res.json(orderProducts);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}


export const getorderProductsbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const orderProduct = await OrderProducts.findById(id);
    if (!orderProduct) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(orderProduct);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}


export const getorderProductsbyUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const orderProducts = await OrderProducts.find({ userId: id });
    res.json(orderProducts);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}


export const updateorderProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;



    const updatedService = await OrderProducts.findByIdAndUpdate(id,

      {
        status: status,
      }
      , { new: true });

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({
      message: "Service updated successfully",
      service: updatedService,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


export const deleteOneOrderProduct = async (req, res) => {
  try {
    const query = await OrderProducts.findById(req.params.id);
    const Booked = await OrderProducts.deleteOne(query);
    res.json(Booked);
  } catch (error) {
    console.error("Failed to get OrderProducts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
