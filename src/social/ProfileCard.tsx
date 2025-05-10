import React from 'react';
import { Edit2, Trash2, ExternalLink } from 'lucide-react';
import { SocialProfile } from '../types';
import { formatNumber } from '../utils/helpers';

interface ProfileCardProps {
  profile: SocialProfile;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onEdit, onDelete }) => {
  const getPlatformIcon = (platform: string) => {
    const iconProps = { size: 20, className: 'text-white' };
    
    // This function should be imported from a common utility
    // but for simplicity it's defined here
    switch (platform) {
      case 'instagram': return '📸';
      case 'youtube': return '🎬';
      case 'twitter': return '🐦';
      case 'tiktok': return '🎵';
      case 'linkedin': return '💼';
      case 'facebook': return '👥';
      default: return '🔗';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'instagram': return 'bg-gradient-to-r from-purple-600 to-pink-600';
      case 'youtube': return 'bg-red-600';
      case 'twitter': return 'bg-blue-500';
      case 'tiktok': return 'bg-black';
      case 'linkedin': return 'bg-blue-700';
      case 'facebook': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md hover:translate-y-[-2px]">
      <div className={`h-3 ${getPlatformColor(profile.platform)}`} />
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${getPlatformColor(profile.platform)}`}>
              <span className="text-xl">{getPlatformIcon(profile.platform)}</span>
            </div>
            <div className="ml-4">
              <p className="font-medium text-gray-900 capitalize">{profile.platform}</p>
              <p className="text-sm text-gray-500">@{profile.username}</p>
            </div>
          </div>
          
          <div className="flex space-x-1">
            <button 
              onClick={() => onEdit(profile.id)}
              className="p-1.5 rounded-md text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              aria-label="Edit profile"
            >
              <Edit2 size={16} />
            </button>
            <button 
              onClick={() => onDelete(profile.id)}
              className="p-1.5 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
              aria-label="Delete profile"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div>
            <p className="text-xs font-medium uppercase text-gray-500">Followers</p>
            <p className="text-lg font-semibold text-gray-900">{formatNumber(profile.followers)}</p>
          </div>
          
          <a 
            href={profile.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors"
          >
            Visit <ExternalLink size={14} className="ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;