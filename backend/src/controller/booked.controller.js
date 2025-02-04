import BookingServices from "../models/booked.model.js";


export const addbookedService = async (req, res) => {
  try {
    const data = req.body;

    const newBookingService = new BookingServices(data);

    await newBookingService.save();

    res.status(201).json({ message: "Service booked successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const getBookedServices = async (req, res) => {
  try {
    const bookedServices = await BookingServices.find();
    res.json(bookedServices);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const updateBookedServices = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;



    const updatedService = await BookingServices.findByIdAndUpdate(id,

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


export const deleteOneBookingService = async (req, res) => {
  try {
    const query = await BookingServices.findById(req.params.id);
    const Booked = await BookingServices.deleteOne(query);
    res.json(Booked);
  } catch (error) {
    console.error("Failed to get BookingServices:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
