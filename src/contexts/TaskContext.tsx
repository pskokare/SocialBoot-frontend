import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

interface TaskContextType {
  tasks: Task[];
  completeTask: (taskId: string) => void;
  acknowledgeTask: (taskId: string) => void;
  updateTaskProgress: (taskType: Task['type'], amount: number) => void;
}

const TaskContext = createContext<TaskContextType | null>(null);

export function useTask() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
}

interface TaskProviderProps {
  children: ReactNode;
}

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  
  useEffect(() => {
    // Initialize with default tasks
    const initialTasks: Task[] = [
      {
        id: '1',
        title: 'Upload 10 Reels',
        description: 'Create and upload 10 engaging short videos',
        type: 'upload-reels',
        reward: 200,
        progress: 0,
        goal: 10,
        completed: false,
        acknowledged: false,
      },
      {
        id: '2',
        title: 'Get 10 Followers',
        description: 'Follow other users who will follow you back',
        type: 'get-followers',
        reward: 150,
        progress: 0,
        goal: 10,
        completed: false,
        acknowledged: true,
      },
    ];
    
    // Check for saved tasks in localStorage
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      setTasks(initialTasks);
    }
  }, []);
  
  useEffect(() => {
    // Save tasks to localStorage whenever they change
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  const completeTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: true } 
        : task
    ));
  };
  
  const acknowledgeTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, acknowledged: true } 
        : task
    ));
  };
  
  const updateTaskProgress = (taskType: Task['type'], amount: number) => {
    setTasks(tasks.map(task => 
      task.type === taskType 
        ? { 
            ...task, 
            progress: Math.max(0, Math.min(task.goal, task.progress + amount)) 
          } 
        : task
    ));
  };
  
  const value = {
    tasks,
    completeTask,
    acknowledgeTask,
    updateTaskProgress,
  };
  
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}