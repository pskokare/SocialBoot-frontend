export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const formatNumber = (number: number): string => {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'K';
  } else {
    return number.toString();
  }
};

export const getPlatformColor = (platform: string): string => {
  switch (platform) {
    case 'instagram':
      return 'bg-gradient-to-r from-purple-500 to-pink-500';
    case 'youtube':
      return 'bg-red-600';
    case 'twitter':
      return 'bg-blue-400';
    case 'tiktok':
      return 'bg-black';
    case 'linkedin':
      return 'bg-blue-700';
    case 'facebook':
      return 'bg-blue-600';
    default:
      return 'bg-gray-600';
  }
};

export const getPlatformIcon = (platform: string): string => {
  switch (platform) {
    case 'instagram':
      return 'instagram';
    case 'youtube':
      return 'youtube';
    case 'twitter':
      return 'twitter';
    case 'tiktok':
      return 'music';
    case 'linkedin':
      return 'linkedin';
    case 'facebook':
      return 'facebook';
    default:
      return 'link';
  }
};

export const calculateProgress = (received: number, needed: number): number => {
  return Math.min(Math.round((received / needed) * 100), 100);
};