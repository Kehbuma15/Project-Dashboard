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
  EyeOff,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// Toast Notification Component
const Toast = ({ message, type, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }}
    className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg flex items-center gap-2 ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`}
  >
    {type === 'success' ? (
      <CheckCircle className="w-5 h-5" />
    ) : (
      <AlertCircle className="w-5 h-5" />
    )}
    <span>{message}</span>
    <button onClick={onClose} className="ml-4">
      <X className="w-4 h-4" />
    </button>
  </motion.div>
);

// Form Error Message Component
const ErrorMessage = ({ message }) => (
  <p className="text-red-400 text-sm mt-1">{message}</p>
);

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
const Input = ({ label, error, ...props }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      className={`w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 
        ${error ? 'border border-red-500 focus:ring-red-500' : 'focus:ring-indigo-500'}`}
      {...props}
    />
    {error && <ErrorMessage message={error} />}
  </div>
);

const SettingsPage = () => {
  // State for settings
  const [darkMode, setDarkMode] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Toast notification state
  const [toast, setToast] = useState(null);

  // Form states
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890'
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Form error states
  const [profileErrors, setProfileErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Validation functions
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^\+?[\d\s-]{10,}$/;
    return re.test(phone);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  // Form submission handlers
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!profile.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!validateEmail(profile.email)) {
      errors.email = 'Invalid email address';
    }

    if (!validatePhone(profile.phone)) {
      errors.phone = 'Invalid phone number';
    }

    if (Object.keys(errors).length > 0) {
      setProfileErrors(errors);
      return;
    }

    // Here you would typically make an API call
    // For now, we'll just show a success message
    showToast('Profile updated successfully');
    setIsProfileModalOpen(false);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!passwordForm.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }

    if (!validatePassword(passwordForm.newPassword)) {
      errors.newPassword = 'Password must be at least 8 characters long';
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }

    // Here you would typically make an API call
    // For now, we'll just show a success message
    showToast('Password updated successfully');
    setIsPasswordModalOpen(false);
  };

  // ... (previous SettingsSection and SettingsRow components remain the same)

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Settings" />
      
      <main className="max-w-4xl mx-auto py-6 px-4 lg:px-8">
        {/* ... (previous sections remain the same) */}

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
              error={profileErrors.name}
            />
            <Input
              label="Email"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              error={profileErrors.email}
            />
            <Input
              label="Phone"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              error={profileErrors.phone}
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
                  className={`w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 pr-10 
                    ${passwordErrors.currentPassword ? 'border border-red-500 focus:ring-red-500' : 'focus:ring-indigo-500'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {passwordErrors.currentPassword && (
                <ErrorMessage message={passwordErrors.currentPassword} />
              )}
            </div>
            <Input
              label="New Password"
              type="password"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              error={passwordErrors.newPassword}
            />
            <Input
              label="Confirm New Password"
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
              error={passwordErrors.confirmPassword}
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

        {/* Toast Notification */}
        <AnimatePresence>
          {toast && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast(null)}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default SettingsPage;