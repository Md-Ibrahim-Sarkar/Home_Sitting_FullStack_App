const ContactMessage = require('../models/contactMessage.model');
const { validateObjectId } = require('../utils/validation');

// Get all contact messages
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching contact messages:', error);
    res.status(500).json({ message: 'Error fetching contact messages' });
  }
};

// Get a single contact message
exports.getMessage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!validateObjectId(id)) {
      return res.status(400).json({ message: 'Invalid message ID' });
    }

    const message = await ContactMessage.findById(id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.status(200).json(message);
  } catch (error) {
    console.error('Error fetching contact message:', error);
    res.status(500).json({ message: 'Error fetching contact message' });
  }
};

// Create a new contact message
exports.createMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const newMessage = new ContactMessage({
      name,
      email,
      phone,
      subject,
      message
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error creating contact message:', error);
    res.status(500).json({ message: 'Error creating contact message' });
  }
};

