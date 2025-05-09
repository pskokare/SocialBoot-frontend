import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import InputField from '../components/ui/InputField';
import { Bell, Lock, Eye, EyeOff, Shield, Save } from 'lucide-react';

function SettingsPage() {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    emailNotifications: true,
    pushNotifications: true,
    twoFactorAuth: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    // Validate password change
    if (formData.newPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        addNotification({
          id: Date.now().toString(),
          title: 'Error',
          message: 'New passwords do not match',
          type: 'error',
        });
        setIsSaving(false);
        return;
      }

      if (formData.newPassword.length < 8) {
        addNotification({
          id: Date.now().toString(),
          title: 'Error',
          message: 'Password must be at least 8 characters long',
          type: 'error',
        });
        setIsSaving(false);
        return;
      }
    }

    // Simulate API call
    setTimeout(() => {
      addNotification({
        id: Date.now().toString(),
        title: 'Settings Updated',
        message: 'Your settings have been successfully updated',
        type: 'success',
      });
      setIsSaving(false);
      
      // Reset password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
    }, 1500);
  };

  return (
    <Layout>
      <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        <form onSubmit={handleSaveSettings}>
          {/* Security Settings */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Lock className="h-5 w-5 mr-2 text-gray-500" />
              Security
            </h2>

            <div className="space-y-4">
              <div className="relative">
                <InputField
                  label="Current Password"
                  name="currentPassword"
                  type={showCurrentPassword ? "text" : "password"}
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="relative">
                <InputField
                  label="New Password"
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <InputField
                label="Confirm New Password"
                name="confirmPassword"
                type={showNewPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm new password"
              />

              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Two-Factor Authentication</span>
                </div>
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="twoFactorAuth"
                      className="sr-only"
                      checked={formData.twoFactorAuth}
                      onChange={handleInputChange}
                    />
                    <div className={`block w-14 h-8 rounded-full transition-colors ${
                      formData.twoFactorAuth ? 'bg-purple-600' : 'bg-gray-200'
                    }`}></div>
                    <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform transform ${
                      formData.twoFactorAuth ? 'translate-x-6' : ''
                    }`}></div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Bell className="h-5 w-5 mr-2 text-gray-500" />
              Notifications
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-700">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive updates and alerts via email</p>
                </div>
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="emailNotifications"
                      className="sr-only"
                      checked={formData.emailNotifications}
                      onChange={handleInputChange}
                    />
                    <div className={`block w-14 h-8 rounded-full transition-colors ${
                      formData.emailNotifications ? 'bg-purple-600' : 'bg-gray-200'
                    }`}></div>
                    <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform transform ${
                      formData.emailNotifications ? 'translate-x-6' : ''
                    }`}></div>
                  </div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-700">Push Notifications</p>
                  <p className="text-sm text-gray-500">Receive real-time notifications in your browser</p>
                </div>
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="pushNotifications"
                      className="sr-only"
                      checked={formData.pushNotifications}
                      onChange={handleInputChange}
                    />
                    <div className={`block w-14 h-8 rounded-full transition-colors ${
                      formData.pushNotifications ? 'bg-purple-600' : 'bg-gray-200'
                    }`}></div>
                    <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform transform ${
                      formData.pushNotifications ? 'translate-x-6' : ''
                    }`}></div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              isLoading={isSaving}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default SettingsPage;