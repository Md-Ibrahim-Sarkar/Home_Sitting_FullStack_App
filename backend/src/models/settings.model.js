import mongoose from 'mongoose';


const settingsSchema = new mongoose.Schema({
  headerLogo: {
    type: String,
    default: ''
  },
  footerLogo: {
    type: String,
    default: ''
  },
  siteName: {
    type: String,
    default: 'Sowda'
  },
  siteDescription: {
    type: String,
    default: 'Your one-stop shop for all your needs'
  },
  contactEmail: {
    type: String,
    default: ''
  },
  contactPhone: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  socialMedia: {
    facebook: {
      type: String,
      default: ''
    },
    twitter: {
      type: String,
      default: ''
    },
    instagram: {
      type: String,
      default: ''
    },
    youtube: {
      type: String,
      default: ''
    }
  }
}, {
  timestamps: true
});


export default mongoose.model('Settings', settingsSchema); 