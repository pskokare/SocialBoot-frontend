import { useState } from 'react';
import { useTask } from '../../contexts/TaskContext';
import { Camera, Users, X } from 'lucide-react';
import Button from '../ui/Button';

interface Task {
  id: string;
  title: string;
  description: string;
  type: 'upload-reels' | 'get-followers';
  reward: number;
  progress: number;
  goal: number;
  completed: boolean;
  acknowledged: boolean;
}

interface TaskAssignmentModalProps {
  task: Task;
  onClose: () => void;
}

function TaskAssignmentModal({ task, onClose }: TaskAssignmentModalProps) {
  const [animateOut, setAnimateOut] = useState(false);
  const { acknowledgeTask } = useTask();
  
  const handleClose = () => {
    setAnimateOut(true);
    setTimeout(() => {
      acknowledgeTask(task.id);
      onClose();
    }, 300);
  };
  
  const getIcon = () => {
    switch (task.type) {
      case 'upload-reels':
        return <Camera className="h-12 w-12 text-blue-500" />;
      case 'get-followers':
        return <Users className="h-12 w-12 text-purple-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 transition-opacity" 
          aria-hidden="true"
          onClick={handleClose}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div 
          className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full ${
            animateOut ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              onClick={handleClose}
            >
              <span className="sr-only">Close</span>
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-blue-50 sm:mx-0 sm:h-14 sm:w-14">
                {getIcon()}
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-xl leading-6 font-bold text-gray-900 mb-1">
                  New Task Assigned!
                </h3>
                <div className="mt-2">
                  <h4 className="text-lg font-semibold text-gray-900">{task.title}</h4>
                  <p className="text-gray-600 mt-1">{task.description}</p>
                  
                  <div className="mt-4 bg-purple-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-purple-700 font-medium">Reward</span>
                      <span className="text-xl font-bold text-purple-700">
                        <span className="mr-1">💰</span>
                        {task.reward} Coins
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <Button
              onClick={handleClose}
              className="w-full sm:w-auto sm:ml-3"
            >
              Let's Go!
            </Button>
            <Button
              variant="outline"
              onClick={handleClose}
              className="mt-3 w-full sm:mt-0 sm:w-auto"
            >
              Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskAssignmentModal;