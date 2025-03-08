import React, { useState, useEffect, useContext } from 'react';
import { axiosInstance } from '../../../lib/axiosInstance';
import { toast } from 'react-toastify';
import { FaSave, FaSpinner } from 'react-icons/fa';
import UploadImage from '../../../components/uploadImage';
import { IndexContext } from '../../../context';

const Settings = () => {
  const [settings, setSettings] = useState({
    headerLogo: '',
    footerLogo: '',
    siteName: '',
    siteDescription: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: '',
      youtube: ''
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axiosInstance('/settings');
      setSettings(response.data);
      setSettings(response.data);
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setSettings(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axiosInstance.put('/settings', settings);
      toast.success('Settings updated successfully');
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Website Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Logo Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Logo Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Header Logo</label>
              <UploadImage
                setData={(url) => setSettings(prev => ({ ...prev, headerLogo: url }))}
                maxFileSize={2}
                allowedFileTypes={['image/jpeg', 'image/png', 'image/webp']}
                multiple={false}
                folder="logos"
                className="w-full"
              />
              {settings.headerLogo && (
                <img
                  src={settings.headerLogo}
                  alt="Header Logo"
                  className="mt-2 max-h-28 object-contain"
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Footer Logo</label>
              <UploadImage
                setData={(url) => setSettings(prev => ({ ...prev, footerLogo: url }))}
                maxFileSize={2}
                allowedFileTypes={['image/jpeg', 'image/png', 'image/webp']}
                multiple={false}
                folder="logos"
                className="w-full"
              />
              {settings.footerLogo && (
                <img
                  src={settings.footerLogo}
                  alt="Footer Logo"
                  className="mt-2 max-h-28 object-contain"
                />
              )}
            </div>
          </div>
        </div>

        {/* General Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">General Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Site Name</label>
              <input
                type="text"
                name="siteName"
                value={settings.siteName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Site Description</label>
              <textarea
                name="siteDescription"
                value={settings.siteDescription}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Contact Email</label>
              <input
                type="email"
                name="contactEmail"
                value={settings.contactEmail}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Contact Phone</label>
              <input
                type="tel"
                name="contactPhone"
                value={settings.contactPhone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Address</label>
              <textarea
                name="address"
                value={settings.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="3"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Social Media Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Facebook</label>
              <input
                type="url"
                name="socialMedia.facebook"
                value={settings.socialMedia.facebook}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Twitter</label>
              <input
                type="url"
                name="socialMedia.twitter"
                value={settings.socialMedia.twitter}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Instagram</label>
              <input
                type="url"
                name="socialMedia.instagram"
                value={settings.socialMedia.instagram}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">YouTube</label>
              <input
                type="url"
                name="socialMedia.youtube"
                value={settings.socialMedia.youtube}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <FaSpinner className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <FaSave />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings; 