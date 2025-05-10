import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { SocialProfile } from '../types';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Layout from '../components/layout/Layout';
import ProfileCard from '../social/ProfileCard';
import ProfileForm from '../social/ProfileForm';

// Example profiles for demonstration
const exampleProfiles: SocialProfile[] = [
  {
    id: '1',
    platform: 'instagram',
    username: 'designmaster',
    url: 'https://instagram.com/designmaster',
    followers: 12500,
    userId: 'user1'
  },
  {
    id: '2',
    platform: 'twitter',
    username: 'techtweets',
    url: 'https://twitter.com/techtweets',
    followers: 8750,
    userId: 'user1'
  },
  {
    id: '3',
    platform: 'youtube',
    username: 'tutorialschannel',
    url: 'https://youtube.com/tutorialschannel',
    followers: 25400,
    userId: 'user1'
  }
];

const SocialProfiles: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [profiles, setProfiles] = useState<SocialProfile[]>(exampleProfiles);
  const [editingProfileId, setEditingProfileId] = useState<string | null>(null);

  const handleAddProfile = (profileData: Omit<SocialProfile, 'id' | 'userId'>) => {
    const newProfile: SocialProfile = {
      ...profileData,
      id: Date.now().toString(),
      userId: 'user1' // In a real app, this would come from auth context
    };

    setProfiles((prev) => [...prev, newProfile]);
    setShowForm(false);
  };

  const handleEditProfile = (id: string) => {
    setEditingProfileId(id);
    setShowForm(true);
  };

  const handleUpdateProfile = (profileData: Omit<SocialProfile, 'id' | 'userId'>) => {
    if (!editingProfileId) return;
    
    setProfiles((prev) => 
      prev.map((profile) => 
        profile.id === editingProfileId
          ? { ...profile, ...profileData }
          : profile
      )
    );
    
    setEditingProfileId(null);
    setShowForm(false);
  };

  const handleDeleteProfile = (id: string) => {
    setProfiles((prev) => prev.filter((profile) => profile.id !== id));
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProfileId(null);
  };

  const getEditingProfile = () => {
    if (!editingProfileId) return undefined;
    const profile = profiles.find((p) => p.id === editingProfileId);
    if (!profile) return undefined;
    
    return {
      platform: profile.platform as any,
      username: profile.username,
      url: profile.url,
      followers: profile.followers
    };
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header section with stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Your Social Presence</h3>
              <p className="text-gray-500 mt-1">Manage all your social media profiles in one place</p>
            </div>
            
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                setEditingProfileId(null);
                setShowForm(!showForm);
              }}
              className="flex items-center space-x-2"
            >
              <PlusCircle size={18} />
              <span>Add Profile</span>
            </Button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
            <div>
              <p className="text-sm text-gray-500">Total Profiles</p>
              <p className="text-2xl font-bold text-gray-900">{profiles.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Followers</p>
              <p className="text-2xl font-bold text-gray-900">
                {profiles.reduce((sum, profile) => sum + profile.followers, 0).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Top Platform</p>
              <p className="text-2xl font-bold text-gray-900 capitalize">
                {profiles.length > 0 
                  ? profiles.reduce((max, profile) => 
                      profile.followers > max.followers ? profile : max
                    ).platform
                  : '—'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Profile form section */}
        {showForm && (
          <ProfileForm
            onSubmit={editingProfileId ? handleUpdateProfile : handleAddProfile}
            onCancel={handleCancelForm}
            initialData={getEditingProfile()}
            isEdit={!!editingProfileId}
          />
        )}
        
        {/* Profiles grid section */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            {profiles.length} {profiles.length === 1 ? 'Profile' : 'Profiles'}
          </h3>
          
          {profiles.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-4">You haven't added any social profiles yet.</p>
              <Button
                variant="primary"
                size="md"
                onClick={() => setShowForm(true)}
              >
                Add Your First Profile
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {profiles.map((profile) => (
                <ProfileCard
                  key={profile.id}
                  profile={profile}
                  onEdit={handleEditProfile}
                  onDelete={handleDeleteProfile}
                />
              ))}
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default SocialProfiles;