import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTask } from '../contexts/TaskContext';
import { useUser } from '../contexts/UserContext';
import { useNotification } from '../contexts/NotificationContext';
import Layout from '../components/layout/Layout';
import TaskCard from '../components/tasks/TaskCard';
// import RewardBadge from '../components/rewards/RewardBadge';
import TaskAssignmentModal from '../components/tasks/TaskAssignmentModal';
import { Camera, Users, Award, TrendingUp, User } from 'lucide-react';

function Dashboard() {
  const { user } = useAuth();
  const { tasks, completeTask } = useTask();
  const { userCoins } = useUser();
  const { addNotification } = useNotification();
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [currentTask, setCurrentTask] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Show task assignment modal after successful login
    if (tasks.length > 0 && !tasks[0].acknowledged) {
      setCurrentTask(tasks[0]);
      setShowTaskModal(true);
    }
  }, [tasks]);

  const handleTaskComplete = (taskId: string) => {
    completeTask(taskId);
    addNotification({
      id: Date.now().toString(),
      title: 'Task Completed!',
      message: 'You earned 200 coins for completing your task!',
      type: 'success',
    });
  };

  const statsData = [
    { 
      title: 'Coins Earned', 
      value: userCoins, 
      icon: <Award className="h-8 w-8 text-yellow-500" />,
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700'
    },
    { 
      title: 'Reels Uploaded', 
      value: '8/10', 
      icon: <Camera className="h-8 w-8 text-blue-500" />,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    { 
      title: 'Followers', 
      value: '5/10', 
      icon: <Users className="h-8 w-8 text-purple-500" />,
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    },
    // { 
    //   title: 'Engagement', 
    //   value: '72%', 
    //   icon: <TrendingUp className="h-8 w-8 text-green-500" />,
    //   bgColor: 'bg-green-50',
    //   textColor: 'text-green-700'
    // }
  ];

  return (
    <Layout>
      <div className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome</h1>
          <p className="text-gray-600">Here's what's happening with your account today.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {statsData.map((stat, index) => (
            <div 
              key={index}
              className={`${stat.bgColor} rounded-lg shadow-sm p-5 transition duration-300 transform hover:scale-105`}
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className={`mt-1 text-3xl font-semibold ${stat.textColor}`}>{stat.value}</p>
                </div>
                <div>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Active Tasks */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Tasks</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <TaskCard 
                key={task.id}
                task={task}
                onComplete={handleTaskComplete}
              />
            ))}

            {tasks.length === 0 && (
              <div className="col-span-full bg-white rounded-lg shadow p-6 text-center text-gray-500">
                <p>No active tasks. Check back later!</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <button 
              onClick={() => navigate('/upload')}
              className="flex items-center justify-center p-4 bg-blue-50 rounded-lg text-blue-700 font-medium hover:bg-blue-100 transition-colors"
            >
              <Camera className="h-5 w-5 mr-2" />
              Upload New Reel
            </button>
            <button 
              onClick={() => navigate('/followers')}
              className="flex items-center justify-center p-4 bg-purple-50 rounded-lg text-purple-700 font-medium hover:bg-purple-100 transition-colors"
            >
              <Users className="h-5 w-5 mr-2" />
              Find Followers
            </button>
            <button 
              onClick={() => navigate('/profile')}
              className="flex items-center justify-center p-4 bg-gray-50 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors"
            >
              <User className="h-5 w-5 mr-2" />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Task Assignment Modal */}
      {showTaskModal && currentTask && (
        <TaskAssignmentModal
          task={currentTask}
          onClose={() => setShowTaskModal(false)}
        />
      )}
    </Layout>
  );
}

export default Dashboard;