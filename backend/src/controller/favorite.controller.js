


import favoriteServices from "../models/favorite.model.js";


export const addFavorites = async (req, res) => {
  try {
    const data = req.body;

    const newBookingService = new favoriteServices(data);

    await newBookingService.save();

    res.status(201).json({ message: "Service added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const getFavorites = async (req, res) => {
  try {
    const bookedServices = await favoriteServices.find();
    res.json(bookedServices);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}


export const deleteFavorite = async (req, res) => {
  try {
    const query = await favoriteServices.findById(req.params.id);
    const service = await favoriteServices.deleteOne(query);
    res.json(service);
  } catch (error) {
    console.error("Failed to get services:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
