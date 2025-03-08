import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

// Get user's cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id })
      .populate('items.productId');

    if (!cart) {
      return res.json([]);
    }

    const cartItems = cart.items.map(item => ({
      productId: item.productId._id,
      name: item.productId.name,
      price: item.productId.price,
      image: item.productId.image[0],
      quantity: item.quantity
    }));

    res.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });
    }

    const existingItem = cart.items.find(item =>
      item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart" });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    await Cart.findOneAndUpdate(
      { userId: req.user._id },
      { $pull: { items: { productId } } }
    );

    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update item quantity
export const updateQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    await Cart.findOneAndUpdate(
      {
        userId: req.user._id,
        'items.productId': productId
      },
      {
        $set: { 'items.$.quantity': quantity }
      }
    );

    res.status(200).json({ message: "Quantity updated" });
  } catch (error) {
    console.error('Error updating quantity:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Sync local storage cart with database
export const syncCart = async (req, res) => {
  try {
    const { items } = req.body;

    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });
    }

    // Merge local storage items with existing cart
    for (const item of items) {
      const existingItem = cart.items.find(cartItem =>
        cartItem.productId.toString() === item.productId
      );

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        cart.items.push({
          productId: item.productId,
          quantity: item.quantity
        });
      }
    }

    await cart.save();
    res.status(200).json({ message: "Cart synced successfully" });
  } catch (error) {
    console.error('Error syncing cart:', error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}; 