import React, { useState } from 'react';
import Header from '../components/common/Header';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  Moon, 
  Sun, 
  User, 
  Shield, 
  Palette, 
  Mail, 
  Globe, 
  X,
  Eye,
  EyeOff 
} from 'lucide-react';

// Custom Toggle Switch Component
const Toggle = ({ checked, onChange }) => (
  <div 
    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer ${
      checked ? 'bg-indigo-600' : 'bg-gray-700'
    }`}
    onClick={() => onChange(!checked)}
  >
    <div 
      className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
        checked ? 'translate-x-5' : 'translate-x-0'
      }`}
    />
  </div>
);

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <motion.div 
          className="bg-gray-800 rounded-lg p-6 w-full max-w-md relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <button 
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// Form Input Component
const Input = ({ label, type = "text", value, onChange, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      {...props}
    />
  </div>
);

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Profile Form State
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890'
  });

  // Password Form State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Handle profile update logic here
    setIsProfileModalOpen(false);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Handle password update logic here
    setIsPasswordModalOpen(false);
  };
  
  const SettingsSection = ({ title, children }) => (
    <motion.div
      className="bg-gray-800 rounded-lg p-6 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </motion.div>
  );

  const SettingsRow = ({ icon: Icon, title, description, children }) => (
    <div className="flex items-start justify-between py-4 border-b border-gray-700 last:border-0">
      <div className="flex gap-4">
        <div className="mt-1">
          <Icon className="w-5 h-5 text-gray-400" />
        </div>
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
      <div className="ml-4">{children}</div>
    </div>
  );

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Settings" />
      
      <main className="max-w-4xl mx-auto py-6 px-4 lg:px-8">
        <SettingsSection title="Profile Settings">
          <SettingsRow
            icon={User}
            title="Personal Information"
            description="Update your name, email, and profile details"
          >
            <button 
              onClick={() => setIsProfileModalOpen(true)}
              className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
            >
              Edit Profile
            </button>
          </SettingsRow>
          
          <SettingsRow
            icon={Shield}
            title="Security Settings"
            description="Manage your password and security preferences"
          >
            <button 
              onClick={() => setIsPasswordModalOpen(true)}
              className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors"
            >
              Change Password
            </button>
          </SettingsRow>
        </SettingsSection>

        <SettingsSection title="Notification Preferences">
          <SettingsRow
            icon={Mail}
            title="Email Notifications"
            description="Receive email updates about your account activity"
          >
            <Toggle 
              checked={emailNotifs}
              onChange={setEmailNotifs}
            />
          </SettingsRow>

          <SettingsRow
            icon={Bell}
            title="Push Notifications"
            description="Get instant notifications about important updates"
          >
            <Toggle 
              checked={pushNotifs}
              onChange={setPushNotifs}
            />
          </SettingsRow>
        </SettingsSection>

        <SettingsSection title="Appearance">
          <SettingsRow
            icon={darkMode ? Moon : Sun}
            title="Dark Mode"
            description="Toggle between light and dark theme"
          >
            <Toggle 
              checked={darkMode}
              onChange={setDarkMode}
            />
          </SettingsRow>

          <SettingsRow
            icon={Palette}
            title="Color Theme"
            description="Choose your preferred accent color"
          >
            <select className="bg-gray-700 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Indigo</option>
              <option>Purple</option>
              <option>Blue</option>
              <option>Green</option>
            </select>
          </SettingsRow>
        </SettingsSection>

        <SettingsSection title="System">
          <SettingsRow
            icon={Globe}
            title="Language"
            description="Select your preferred language"
          >
            <select className="bg-gray-700 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </SettingsRow>
        </SettingsSection>

        {/* Profile Edit Modal */}
        <Modal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          title="Edit Profile"
        >
          <form onSubmit={handleProfileSubmit}>
            <Input
              label="Full Name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
            <Input
              label="Email"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
            <Input
              label="Phone"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            />
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setIsProfileModalOpen(false)}
                className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Modal>

        {/* Password Change Modal */}
        <Modal
          isOpen={isPasswordModalOpen}
          onClose={() => setIsPasswordModalOpen(false)}
          title="Change Password"
        >
          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Current Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <Input
              label="New Password"
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
            />
            <Input
              label="Confirm New Password"
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
            />
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setIsPasswordModalOpen(false)}
                className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 rounded-md hover:bg-indigo-500"
              >
                Update Password
              </button>
            </div>
          </form>
        </Modal>
      </main>
    </div>
  );
};

export default SettingsPage;