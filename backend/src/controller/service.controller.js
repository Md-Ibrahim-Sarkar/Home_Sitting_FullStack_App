import Service from "../models/service.model.js";

export const addService = async (req, res) => {
  try {
    const data = req.body;

    const newService = new Service(data);
    await newService.save();

    res.status(201).json({ message: "Service added successfully", service: newService });
  } catch (error) {
    console.error("Failed to add service:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getServices = async (req, res) => {
  try {
    const searchValue = req.query.search || ""; // সার্চ না থাকলে empty string
    let query = {
      name: {
        $regex: searchValue,
        $options: 'i'
      }
    };
    const services = await Service.find(query); // ✅ ঠিকমতো সার্চ করা হচ্ছে
    res.json(services);
  } catch (error) {
    console.error("Failed to get services:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getOneService = async (req, res) => {
  try {
    const query = await Service.findById(req.params.id);
    const service = await Service.find(query);
    res.json(service);
  } catch (error) {
    console.error("Failed to get services:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const deleteOneService = async (req, res) => {
  try {
    const query = await Service.findById(req.params.id);
    const service = await Service.deleteOne(query);
    res.json(service);
  } catch (error) {
    console.error("Failed to get services:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const updateOneService = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!id) {
      return res.status(400).json({ message: "Service ID is required" });
    }

    if (!Object.keys(data).length) {
      return res.status(400).json({ message: "At least one field must be updated" });
    }

    const allowedFields = ["name", "description", "price", "image", "category"];
    const updateData = Object.keys(data)
      .filter(key => allowedFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {});

    const updatedService = await Service.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.status(200).json({
      message: "Service updated successfully",
      service: updatedService,
    });
  } catch (error) {
    console.error("Failed to update service:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
