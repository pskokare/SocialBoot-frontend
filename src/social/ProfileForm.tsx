import React, { useState } from 'react';
import { PlusCircle, XCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import { SocialProfile } from '../types';

type Platform = 'instagram' | 'youtube' | 'twitter' | 'tiktok' | 'linkedin' | 'facebook';

interface FormData {
  platform: Platform | '';
  username: string;
  url: string;
  followers: number;
}

interface ProfileFormProps {
  onSubmit: (profile: Omit<SocialProfile, 'id' | 'userId'>) => void;
  onCancel: () => void;
  initialData?: FormData;
  isEdit?: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isEdit = false
}) => {
  const [formData, setFormData] = useState<FormData>(
    initialData || {
      platform: '',
      username: '',
      url: '',
      followers: 0,
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.platform) {
      newErrors.platform = 'Platform is required';
    }
    
    if (!formData.username) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.url) {
      newErrors.url = 'URL is required';
    } else if (!/^https?:\/\/.+/.test(formData.url)) {
      newErrors.url = 'URL must start with http:// or https://';
    }
    
    if (formData.followers < 0) {
      newErrors.followers = 'Followers cannot be negative';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    onSubmit({
      platform: formData.platform as Platform,
      username: formData.username,
      url: formData.url,
      followers: formData.followers
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'followers' ? Number(value) : value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <div className="mb-8">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-4 px-6">
          <h2 className="text-white font-semibold text-lg flex items-center">
            {isEdit ? 'Edit Social Profile' : 'Add New Social Profile'}
            <PlusCircle size={18} className="ml-2" />
          </h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">
                Platform<span className="text-red-500">*</span>
              </label>
              <select
                name="platform"
                value={formData.platform}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
                  errors.platform 
                    ? 'border-red-300 focus:ring-red-500' 
                    : 'border-gray-300'
                }`}
              >
                <option value="">Select platform</option>
                <option value="instagram">Instagram</option>
                <option value="youtube">YouTube</option>
                <option value="twitter">Twitter</option>
                <option value="tiktok">TikTok</option>
                <option value="linkedin">LinkedIn</option>
                <option value="facebook">Facebook</option>
              </select>
              {errors.platform && (
                <p className="mt-1 text-sm text-red-500">{errors.platform}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1.5 text-gray-700">
                Username<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  @
                </span>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="username"
                  className={`w-full pl-8 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
                    errors.username 
                      ? 'border-red-300 focus:ring-red-500' 
                      : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-red-500">{errors.username}</p>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-700">
              Profile URL<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="https://..."
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
                errors.url 
                  ? 'border-red-300 focus:ring-red-500' 
                  : 'border-gray-300'
              }`}
            />
            {errors.url && (
              <p className="mt-1 text-sm text-red-500">{errors.url}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1.5 text-gray-700">
              Followers
            </label>
            <input
              type="number"
              name="followers"
              value={formData.followers}
              onChange={handleChange}
              placeholder="0"
              className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
                errors.followers 
                  ? 'border-red-300 focus:ring-red-500' 
                  : 'border-gray-300'
              }`}
            />
            {errors.followers && (
              <p className="mt-1 text-sm text-red-500">{errors.followers}</p>
            )}
          </div>
          
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              size="md"
              type="button"
              onClick={onCancel}
              className="flex items-center"
            >
              <XCircle size={16} className="mr-1.5" />
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              type="submit"
              className="flex items-center"
            >
              <PlusCircle size={16} className="mr-1.5" />
              {isEdit ? 'Update Profile' : 'Save Profile'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;