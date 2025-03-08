import Category from "../models/category.model.js";

export const addCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(201).json({ message: "Category added successfully", newCategory });
  } catch (error) {
    console.error("Failed to add Category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



export const getCategories = async (req, res) => {
  try {
    const Categories = await Category.find();
    res.json(Categories);
  } catch (error) {
    console.error("Failed to retrieve Categories:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const deleteOneCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Failed to delete Category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }

};


export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params; // ক্যাটাগরি আইডি প্যারাম থেকে নিচ্ছি
    const { sub } = req.body; // সাব-ক্যাটাগরি নিচ্ছি

    // ক্যাটাগরি খুঁজে পাওয়া গেলে সাব-ক্যাটাগরি আপডেট করা
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { $push: { sub: sub } }, // সাব-এ নতুন সাব-ক্যাটাগরি যোগ
      { new: true } // নতুন আপডেটেড ডকুমেন্টটি রিটার্ন করবে
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    // সফলভাবে সাব-ক্যাটাগরি যোগ করার পর
    res.status(200).json({
      message: "Sub-category added successfully",
      updatedCategory
    });

  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const deleteSubCategory = async (req, res) => {
  try {
    const { id, subCategory } = req.params;

    // ক্যাটাগরির সাব-ক্যাটাগরি ফিল্টার করে আপডেট করা
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { $pull: { sub: subCategory } }, // সাব-ক্যাটাগরিটি সরিয়ে ফেলবে
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Sub-category deleted successfully", updatedCategory });
  } catch (error) {
    console.error("Failed to delete sub-category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
