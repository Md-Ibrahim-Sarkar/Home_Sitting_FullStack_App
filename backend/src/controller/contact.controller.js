import Contact from "../models/contact.model.js";

export const addContact = async (req, res) => {
  try {
    const data = req.body;
    const contact = new Contact(data);
    await contact.save();
    res.status(201).json({ message: "Contact added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add contact" });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Failed to get contacts" });
  }
};


// Update message status
export const updateMessageStatus = async (req, res) => {
   try {
    const { id } = req.params;
    const { status } = req.body;
    const message = await Contact.findByIdAndUpdate(id, { status }, { new: true });
    res.status(200).json(message);
   } catch (error) {
    res.status(500).json({ message: "Failed to update message status" });
   }
};

// Delete a contact message
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Contact.findByIdAndDelete(id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact message:', error);
    res.status(500).json({ message: 'Error deleting contact message' });
  }
}; 