import { User, UserPlus, UserMinus, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';

interface UserData {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  followsYou: boolean;
  isFollowing: boolean;
}

interface UserCardProps {
  user: UserData;
  onFollow: () => void;
  onUnfollow: () => void;
}

function UserCard({ user, onFollow, onUnfollow }: UserCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden transform transition-all duration-300 hover:shadow-md">
      <div className="p-5">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <User className="h-6 w-6 text-purple-600" />
              </div>
            )}
          </div>
          <div className="ml-3 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
              {user.followsYou && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Follows You
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500">{user.username}</p>
            <p className="mt-2 text-sm text-gray-600 line-clamp-2">{user.bio}</p>
            
            <div className="mt-4">
              {user.isFollowing ? (
                <Button
                  onClick={onUnfollow}
                  variant="outline"
                  className="w-full"
                >
                  <UserMinus className="h-4 w-4 mr-2" />
                  Unfollow
                </Button>
              ) : (
                <Button
                  onClick={onFollow}
                  className="w-full"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Follow
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCard;