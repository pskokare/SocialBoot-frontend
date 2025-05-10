import { Link, useLocation } from 'react-router-dom';
import { Home, Upload, Users, User, Award, Settings, X } from 'lucide-react';

interface SidebarProps {
  closeSidebar: () => void;
}

function Sidebar({ closeSidebar }: SidebarProps) {
  const { pathname } = useLocation();
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Social Profiles', href: '/socialprofiles', icon: Home },
    { name: 'Upload Reels', href: '/upload', icon: Upload },
    { name: 'Find Followers', href: '/followers', icon: Users },
    {name : 'AiTools', href: '/aitools', icon: Users},
    { name: 'My Profile', href: '/profile', icon: User },

    // { name: 'Rewards', href: '/rewards', icon: Award },
    // { name: 'Settings', href: '/settings', icon: Settings },
  ];
  
  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-200">
      <div className="flex items-center justify-between h-16 flex-shrink-0 px-4 border-b border-gray-200">
        <div className="text-2xl font-bold text-purple-600">SocialBoost</div>
        <button
          type="button"
          className="md:hidden rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onClick={closeSidebar}
        >
          <span className="sr-only">Close sidebar</span>
          <X className="h-6 w-6" />
        </button>
      </div>
      
      <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-2 py-3 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-purple-50 text-purple-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={closeSidebar}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    isActive ? 'text-purple-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.name}
                {item.name === 'Find Followers' && (
                  <span className="ml-auto bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-xs font-medium">
                    New
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
        <div className="flex-shrink-0 w-full group block">
          <div className="flex items-center">
            <div className="h-9 w-9 rounded-full bg-purple-200 flex items-center justify-center">
              <User className="h-5 w-5 text-purple-600" />
            </div>
            {/* <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                User Name
              </p>
              <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                View profile
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;