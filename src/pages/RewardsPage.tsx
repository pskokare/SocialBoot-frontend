import { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useNotification } from '../contexts/NotificationContext';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import { Gift, Award, Star, Crown, ChevronRight } from 'lucide-react';

interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  icon: typeof Gift;
  color: string;
}

function RewardsPage() {
  const { userCoins, removeCoins } = useUser();
  const { addNotification } = useNotification();
  const [claimingReward, setClaimingReward] = useState<string | null>(null);

  const rewards: Reward[] = [
    {
      id: '1',
      title: 'Premium Badge',
      description: 'Get a special badge next to your name',
      cost: 500,
      icon: Star,
      color: 'text-yellow-500',
    },
    {
      id: '2',
      title: 'Profile Boost',
      description: 'Increase your profile visibility for 24 hours',
      cost: 300,
      icon: Crown,
      color: 'text-purple-500',
    },
    {
      id: '3',
      title: 'Custom Theme',
      description: 'Unlock exclusive profile themes',
      cost: 800,
      icon: Award,
      color: 'text-blue-500',
    },
  ];

  const handleClaimReward = async (reward: Reward) => {
    if (userCoins < reward.cost) {
      addNotification({
        id: Date.now().toString(),
        title: 'Insufficient Coins',
        message: `You need ${reward.cost - userCoins} more coins to claim this reward.`,
        type: 'error',
      });
      return;
    }

    setClaimingReward(reward.id);

    // Simulate API call
    setTimeout(() => {
      removeCoins(reward.cost);
      addNotification({
        id: Date.now().toString(),
        title: 'Reward Claimed!',
        message: `You've successfully claimed ${reward.title}`,
        type: 'success',
      });
      setClaimingReward(null);
    }, 1500);
  };

  return (
    <Layout>
      <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Rewards</h1>
          <p className="text-gray-600">Redeem your coins for exclusive rewards</p>
        </div>

        {/* Coins Balance */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Your Balance</p>
              <p className="text-3xl font-bold text-white mt-1">
                {userCoins} Coins
              </p>
            </div>
            <Award className="h-12 w-12 text-white opacity-75" />
          </div>
        </div>

        {/* Available Rewards */}
        <div className="space-y-4">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className="bg-white rounded-lg shadow-sm p-6 transition duration-300 hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${reward.color} bg-opacity-10`}>
                    <reward.icon className={`h-6 w-6 ${reward.color}`} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {reward.title}
                    </h3>
                    <p className="text-gray-600">{reward.description}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="mr-4 text-right">
                    <p className="text-sm text-gray-500">Cost</p>
                    <p className="font-semibold text-gray-900">{reward.cost} Coins</p>
                  </div>
                  <Button
                    onClick={() => handleClaimReward(reward)}
                    disabled={userCoins < reward.cost || claimingReward === reward.id}
                    isLoading={claimingReward === reward.id}
                  >
                    {userCoins >= reward.cost ? (
                      <>
                        Claim
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </>
                    ) : (
                      'Insufficient Coins'
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default RewardsPage;