import Settings from '../models/settings.model.js';

// Get settings
export const getSettings = async (req, res) => {
  try {
    const settings = await Settings.findOne();
    res.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ message: 'Error fetching settings' });
  }
};

// Update settings
export const updateSettings = async (req, res) => {
  try {
    const settings = await Settings.findOne();

    // Update fields
    Object.keys(req.body).forEach(key => {
      if (key === 'socialMedia') {
        settings.socialMedia = {
          ...settings.socialMedia,
          ...req.body.socialMedia
        };
      } else {
        settings[key] = req.body[key];
      }
    });

    await settings.save();
    res.json(settings);
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ message: 'Error updating settings' });
  }
}; 