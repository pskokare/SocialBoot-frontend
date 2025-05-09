import { useState, useEffect } from 'react';
import { X, AlertTriangle, CheckCircle, Bell } from 'lucide-react';
import { useNotification } from '../../contexts/NotificationContext';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  timestamp?: number;
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
}

function NotificationPanel({ isOpen, onClose, notifications }: NotificationPanelProps) {
  const [animateOut, setAnimateOut] = useState(false);
  const { clearNotifications, removeNotification } = useNotification();
  
  const handleClose = () => {
    setAnimateOut(true);
    setTimeout(() => {
      onClose();
      setAnimateOut(false);
    }, 300);
  };
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Bell className="h-5 w-5 text-blue-500" />;
    }
  };
  
  const getTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };
  
  return (
    <div 
      className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-xl z-30 transform transition-transform duration-300 ease-in-out ${
        isOpen 
          ? 'translate-x-0' 
          : 'translate-x-full'
      } ${animateOut ? 'translate-x-full' : ''}`}
    >
      <div className="h-full flex flex-col">
        <div className="px-4 py-5 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
          <div className="flex space-x-2">
            {notifications.length > 0 && (
              <button
                type="button"
                className="text-sm text-gray-500 hover:text-gray-700"
                onClick={() => clearNotifications()}
              >
                Clear all
              </button>
            )}
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500"
              onClick={handleClose}
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <Bell className="h-12 w-12 mb-3" />
              <p className="text-center">No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div 
                key={notification.id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 relative transition-all duration-200 hover:shadow-md"
              >
                <button
                  type="button"
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-500"
                  onClick={() => removeNotification(notification.id)}
                >
                  <X className="h-4 w-4" />
                </button>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-3">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 pr-6">
                    <h3 className="text-sm font-medium text-gray-900">{notification.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
                    {notification.timestamp && (
                      <p className="mt-2 text-xs text-gray-400">
                        {getTimeAgo(notification.timestamp)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationPanel;