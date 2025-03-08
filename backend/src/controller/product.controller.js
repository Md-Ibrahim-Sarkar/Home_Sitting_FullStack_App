import Product from "../models/product.model.js";
import asyncHandler from "express-async-handler";
import mongoose from 'mongoose';


export const addProduct = async (req, res) => {
  try {
    const data = req.body;

    // Validate required fields
    if (!data.name || !data.price || !data.category) {
      return res.status(400).json({
        message: "Name, price, and category are required fields"
      });
    }

    // Convert numeric fields to numbers
    const productData = {
      ...data,
      price: Number(data.price),
      quantity: Number(data.quantity) || 0,
      discount: Number(data.discount) || 0,
      sold: Number(data.sold) || 0,
      isStock: Boolean(data.isStock),
      shippingCost: Number(data.shippingCost) || 0
    };

    // Handle variants if present
    if (data.variants && Array.isArray(data.variants)) {
      productData.variants = data.variants.map(variant => ({
        ...variant,
        price: Number(variant.price),
        quantity: Number(variant.quantity) || 0,
        discount: Number(variant.discount) || 0
      }));
    }

    // Handle specifications if present
    if (data.specifications && Array.isArray(data.specifications)) {
      productData.specifications = data.specifications.map(spec => ({
        ...spec,
        value: String(spec.value)
      }));
    }

    // Handle additional info if present - ensure it's an array of strings
    if (data.additionalInfo && Array.isArray(data.additionalInfo)) {
      productData.additionalInfo = data.additionalInfo
        .filter(info => info && typeof info === 'string' && info.trim() !== '')
        .map(info => String(info.trim()));
    }

    const newProduct = new Product(productData);
    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: newProduct
    });
  } catch (error) {
    console.error("Failed to add Product:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};

export const getProductsbypagination = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    category,
    brand,
    sort = '-createdAt'
  } = req.query;

  try {
    // Build query
    const query = {};
    if (category) query.category = category;
    if (brand) query.brand = brand;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query with pagination
    const [products, total] = await Promise.all([
      Product.find(query)
        .select('title description price image category version brand')
        .limit(parseInt(limit))
        .skip(skip)
        .sort(sort)
        .lean(),
      Product.countDocuments(query)
    ]);

    const pages = Math.ceil(total / parseInt(limit));

    return res.json({
      success: true,
      data: {
        products,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages
        }
      }
    });
  } catch (error) {
    console.error('Get products error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
});

export const getProducts = async (req, res) => {
  try {
    const searchValue = req.query.search || ""; // সার্চ না থাকলে empty string
    let query = {
      name: {
        $regex: searchValue,
        $options: 'i'
      }
    };
    const Products = await Product.find(query); // ✅ ঠিকমতো সার্চ করা হচ্ছে
    res.json(Products);
  } catch (error) {
    console.error("Failed to get Products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProductsByCategory = asyncHandler(async (req, res) => {
  try {
    const { category } = req.params;

    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }

    // কেস-ইনসেনসিটিভ সার্চ
    const products = await Product.find({ category: { $regex: new RegExp(category, "i") } })

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found for this category" });
    }

    res.json(products);
  } catch (error) {
    console.error("Failed to get products:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



export const searchProducts = asyncHandler(async (req, res) => {
  const { q: search, limit = 10, page = 1 } = req.query;

  // Validate search query
  if (!search || typeof search !== "string") {
    return res.status(400).json({
      success: false,
      message: "Search query is required",
    });
  }

  try {
    // Create search query with multiple fields
    const searchRegex = new RegExp(search.trim(), "i");
    const query = {
      $or: [
        { name: searchRegex }, // যদি title না থাকে তাহলে name ব্যবহার করো
        { description: searchRegex },
        { category: searchRegex },
        { brand: searchRegex },
      ],
    };

    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const skip = (pageNumber - 1) * limitNumber;

    // Execute search query and get total count
    const [products, total] = await Promise.all([
      Product.find(query)
        .select("name description price image category brand")
        .limit(limitNumber)
        .skip(skip)
        .sort({ createdAt: -1 })
        .lean(),
      Product.countDocuments(query),
    ]);

    // Calculate total pages
    const pages = Math.ceil(total / limitNumber);

    // Return formatted response
    return res.json({
      success: true,
      data: {
        products,
        pagination: {
          page: pageNumber,
          limit: limitNumber,
          total,
          pages,
        },
      },
    });
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({
      success: false,
      message: "Error searching products",
      error: error.message,
    });
  }
});

export const getOneProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID format"
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.json({
      success: true,
      product
    });
  } catch (error) {
    console.error("Failed to get product:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message
    });
  }
};



export const deleteOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Product.deleteOne({ _id: req.params.id });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Failed to delete product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const updateOneProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    if (!Object.keys(data).length) {
      return res.status(400).json({ message: "At least one field must be updated" });
    }

    const allowedFields = [
      "name",
      "description",
      "price",
      "image",
      "category",
      "quantity",
      "isStock",
      "brand",
      "sku",
      "tags",
      "discount",
      "sold",
      "supplier",
      "warranty",
      "returnPolicy",
      "shippingDetails",
      "shippingCost",
      "variants",
      "specifications",
      "additionalInfo"
    ];

    // ফিল্টার করে শুধু অনুমোদিত ফিল্ডগুলো রাখো
    const updateData = Object.keys(data).reduce((obj, key) => {
      if (allowedFields.includes(key)) {
        obj[key] = data[key];
      }
      return obj;
    }, {});

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    // প্রোডাক্ট খুঁজে বের করো
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ডাটা আপডেট করো
    Object.keys(updateData).forEach((key) => {
      product[key] = updateData[key];
    });

    // নতুন ডাটা সেভ করো
    await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      product: product,
    });

  } catch (error) {
    console.error("Failed to update product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
