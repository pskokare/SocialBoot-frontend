import { useUser } from '../../contexts/UserContext';
import { Bell, Menu, ChevronDown, LogOut, Settings, User } from 'lucide-react';

interface NavbarProps {
  toggleSidebar: () => void;
  toggleNotifications: () => void;
  onLogout: () => void;
  notificationCount: number;
}

function Navbar({ toggleSidebar, toggleNotifications, onLogout, notificationCount }: NavbarProps) {
  const { userCoins } = useUser();

  return (
    <header className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
      <button
        type="button"
        className="md:hidden px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
        onClick={toggleSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" />
      </button>
      
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex items-center">
          <h1 className="text-2xl font-bold text-purple-600 hidden sm:block"></h1>
        </div>
        
        <div className="ml-4 flex items-center md:ml-6 space-x-4">
          {/* Coins Display */}
          <div className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full font-medium text-sm flex items-center">
            <span className="mr-1">💰</span>
            <span>{userCoins} Coins</span>
          </div>
          
          {/* Notifications */}
          <button
            type="button"
            className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 relative"
            onClick={toggleNotifications}
          >
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" />
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs font-medium flex items-center justify-center transform -translate-y-1/2 translate-x-1/2">
                {notificationCount}
              </span>
            )}
          </button>
          
          {/* Profile dropdown */}
          <div className="ml-3 relative group">
            <div>
              <button
                type="button"
                className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <span className="sr-only">Open user menu</span>
                <div className="h-8 w-8 rounded-full bg-purple-200 flex items-center justify-center">
                  <User className="h-5 w-5 text-purple-600" />
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400 ml-1" />
              </button>
            </div>
            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block">
              <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                <User className="h-4 w-4 mr-2" />
                Your Profile
              </a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </a>
              <button
                onClick={onLogout}
                className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;