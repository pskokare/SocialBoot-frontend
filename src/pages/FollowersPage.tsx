import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTask } from '../contexts/TaskContext';
import { useNotification } from '../contexts/NotificationContext';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import UserCard from '../components/users/UserCard';
import { Search, Filter, UserPlus } from 'lucide-react';

// Mock data for suggested users
const MOCK_USERS = [
  { 
    id: '1', 
    name: 'Emma Watson', 
    username: '@emmawatson', 
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Digital content creator & lifestyle blogger',
    followsYou: true,
    isFollowing: false
  },
  { 
    id: '2', 
    name: 'James Smith', 
    username: '@jamessmith', 
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Photographer | Travel enthusiast',
    followsYou: false,
    isFollowing: false
  },
  { 
    id: '3', 
    name: 'Sophia Chen', 
    username: '@sophiachen', 
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Fashion designer & style curator',
    followsYou: true,
    isFollowing: false
  },
  { 
    id: '4', 
    name: 'Michael Brown', 
    username: '@michaelbrown', 
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Tech entrepreneur | Web3 enthusiast',
    followsYou: false,
    isFollowing: false
  },
  { 
    id: '5', 
    name: 'Olivia Garcia', 
    username: '@oliviagarcia', 
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Travel vlogger | Adventure seeker',
    followsYou: true,
    isFollowing: false
  },
  { 
    id: '6', 
    name: 'Daniel Kim', 
    username: '@danielkim', 
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Fitness coach & nutrition expert',
    followsYou: false,
    isFollowing: false
  },
];

function FollowersPage() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterFollowsYou, setFilterFollowsYou] = useState(false);
  const { updateTaskProgress } = useTask();
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const followedCount = users.filter(user => user.isFollowing).length;

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.username.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = !filterFollowsYou || user.followsYou;
    return matchesSearch && matchesFilter;
  });

  const handleFollow = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, isFollowing: true } 
        : user
    ));

    // Update task progress
    updateTaskProgress('get-followers', 1);
    
    // Notification of successful follow
    addNotification({
      id: Date.now().toString(),
      title: 'New Follow',
      message: `You're now following ${users.find(u => u.id === userId)?.name}`,
      type: 'success',
    });
  };

  const handleUnfollow = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, isFollowing: false } 
        : user
    ));

    // Update task progress (decrement)
    updateTaskProgress('get-followers', -1);
    
    // Notification of unfollow
    addNotification({
      id: Date.now().toString(),
      title: 'Unfollowed',
      message: `You've unfollowed ${users.find(u => u.id === userId)?.name}`,
      type: 'info',
    });
  };

  return (
    <Layout>
      <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Find Followers</h1>
          <p className="text-gray-600">Connect with people who will follow you back</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 bg-white rounded-lg shadow p-6">
          <div className="flex justify-between mb-2">
            <span className="font-medium">Follower Goal Progress</span>
            <span className="font-medium">{followedCount}/10</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-purple-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(followedCount / 10) * 100}%` }}
            ></div>
          </div>
          <p className="mt-3 text-sm text-gray-600">
            {followedCount >= 10 
              ? "Congratulations! You've reached your follower goal."
              : `Follow ${10 - followedCount} more users to complete your goal.`
            }
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              placeholder="Search users by name or username"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <button
              className={`flex items-center px-4 py-2 rounded-md border ${
                filterFollowsYou 
                  ? 'bg-purple-50 text-purple-700 border-purple-200' 
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
              onClick={() => setFilterFollowsYou(!filterFollowsYou)}
            >
              <Filter className="h-4 w-4 mr-2" />
              <span>Follows You</span>
            </button>
          </div>
        </div>

        {/* User Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onFollow={() => handleFollow(user.id)}
              onUnfollow={() => handleUnfollow(user.id)}
            />
          ))}

          {filteredUsers.length === 0 && (
            <div className="col-span-full bg-white rounded-lg shadow p-6 text-center">
              <UserPlus className="h-12 w-12 mx-auto text-gray-400 mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No users found</h3>
              <p className="text-gray-500">
                Try adjusting your search or filters to find more users.
              </p>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-end">
          <Button 
            variant="outline" 
            className="mr-4"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </Layout>
  );
}

export default FollowersPage;