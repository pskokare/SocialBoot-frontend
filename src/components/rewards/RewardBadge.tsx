import { Award } from 'lucide-react';

interface RewardBadgeProps {
  amount: number;
  animate?: boolean;
}

function RewardBadge({ amount, animate = false }: RewardBadgeProps) {
  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 ${
      animate ? 'animate-pulse' : ''
    }`}>
      <Award className="h-4 w-4 mr-1" />
      <span className="font-medium">{amount} Coins</span>
    </div>
  );
}

export default RewardBadge;