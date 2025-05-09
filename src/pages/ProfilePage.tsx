import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import { useNotification } from '../contexts/NotificationContext';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import InputField from '../components/ui/InputField';
import { User, Mail, AtSign, Globe, Image, Save } from 'lucide-react';

function ProfilePage() {
  const { user, updateUserProfile } = useAuth();
  const { userCoins } = useUser();
  const { addNotification } = useNotification();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    username: user?.username || '',
    bio: user?.bio || '',
    website: user?.website || '',
  });
  
  const [profileImage, setProfileImage] = useState<string | null>(user?.avatar || null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      
      // Simulate upload delay
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setProfileImage(event.target.result as string);
          }
          setIsUploading(false);
        };
        reader.readAsDataURL(e.target.files[0]);
      }, 1000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      updateUserProfile({
        ...formData,
        avatar: profileImage
      });
      
      addNotification({
        id: Date.now().toString(),
        title: 'Profile Updated',
        message: 'Your profile information has been successfully updated.',
        type: 'success',
      });
      
      setIsSaving(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600">Manage your account information and settings</p>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-8 text-white">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="flex items-center mb-4 sm:mb-0">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-white/20 overflow-hidden flex items-center justify-center">
                    {profileImage ? (
                      <img 
                        src={profileImage} 
                        alt="Profile" 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User className="h-12 w-12 text-white/70" />
                    )}
                    
                    {isUploading && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full">
                        <div className="h-8 w-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                  <label 
                    htmlFor="profile-image" 
                    className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-md cursor-pointer"
                  >
                    <Image className="h-4 w-4 text-gray-600" />
                    <input 
                      id="profile-image" 
                      type="file" 
                      accept="image/*"
                      className="hidden"
                      onChange={handleProfileImageChange}
                      disabled={isUploading}
                    />
                  </label>
                </div>
                <div className="ml-4 text-center sm:text-left">
                  <h2 className="text-xl font-bold">{formData.name || 'Your Name'}</h2>
                  <p className="text-purple-100">@{formData.username || 'username'}</p>
                </div>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-lg">
                <p className="text-sm text-purple-100">Balance</p>
                <p className="text-2xl font-bold">{userCoins} Coins</p>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <InputField
                label="Full Name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your full name"
                required
                icon={<User size={18} className="text-gray-400" />}
              />
              
              <InputField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your email address"
                required
                icon={<Mail size={18} className="text-gray-400" />}
              />
              
              <InputField
                label="Username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Your username"
                required
                icon={<AtSign size={18} className="text-gray-400" />}
              />
              
              <InputField
                label="Website"
                name="website"
                type="url"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="Your website (optional)"
                icon={<Globe size={18} className="text-gray-400" />}
              />
              
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  rows={4}
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell others about yourself..."
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end">
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
      </div>
    </Layout>
  );
}

export default ProfilePage;