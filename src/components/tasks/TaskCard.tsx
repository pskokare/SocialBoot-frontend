import { useState } from 'react';
import { Camera, Users, CheckCircle, ChevronRight } from 'lucide-react';
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

interface TaskCardProps {
  task: Task;
  onComplete: (taskId: string) => void;
}

function TaskCard({ task, onComplete }: TaskCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  
  const getIcon = () => {
    switch (task.type) {
      case 'upload-reels':
        return <Camera className="h-7 w-7 text-blue-500" />;
      case 'get-followers':
        return <Users className="h-7 w-7 text-purple-500" />;
      default:
        return <CheckCircle className="h-7 w-7 text-green-500" />;
    }
  };
  
  const getBackgroundColor = () => {
    switch (task.type) {
      case 'upload-reels':
        return 'bg-blue-50';
      case 'get-followers':
        return 'bg-purple-50';
      default:
        return 'bg-green-50';
    }
  };
  
  const getProgressColor = () => {
    switch (task.type) {
      case 'upload-reels':
        return 'bg-blue-500';
      case 'get-followers':
        return 'bg-purple-500';
      default:
        return 'bg-green-500';
    }
  };
  
  const handleCompleteTask = () => {
    if (task.progress >= task.goal && !task.completed) {
      setIsLoading(true);
      // Simulate API delay
      setTimeout(() => {
        onComplete(task.id);
        setIsLoading(false);
      }, 1000);
    }
  };
  
  const progressPercent = Math.min((task.progress / task.goal) * 100, 100);
  
  return (
    <div className={`rounded-lg shadow-sm overflow-hidden transition duration-300 transform hover:scale-105 ${getBackgroundColor()}`}>
      <div className="p-5">
        <div className="flex justify-between mb-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 p-1 rounded-md">
              {getIcon()}
            </div>
            <div className="ml-3">
              <h3 className="font-semibold text-gray-900">{task.title}</h3>
              <p className="text-sm text-gray-600">{task.description}</p>
            </div>
          </div>
          <div className="flex-shrink-0 bg-white px-3 py-1 rounded-full flex items-center shadow-sm">
            <span className="mr-1 text-yellow-500">💰</span>
            <span className="font-medium">{task.reward}</span>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span className="font-medium">{task.progress}/{task.goal}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ease-out ${getProgressColor()}`}
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
        
        <div className="mt-4">
          {task.completed ? (
            <div className="flex items-center justify-center py-2 bg-green-100 text-green-700 font-medium rounded-md">
              <CheckCircle className="h-5 w-5 mr-2" />
              Completed
            </div>
          ) : (
            <Button
              onClick={handleCompleteTask}
              disabled={task.progress < task.goal || isLoading}
              isLoading={isLoading}
              variant={task.progress >= task.goal ? "primary" : "outline"}
              fullWidth
            >
              {task.progress >= task.goal ? 'Claim Reward' : 'In Progress'}
              {!isLoading && task.progress >= task.goal && <ChevronRight className="h-4 w-4 ml-1" />}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskCard;