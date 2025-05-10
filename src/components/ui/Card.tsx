import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = false,
}) => {
  const hoverClasses = hoverable
    ? 'transform transition-all duration-300 hover:shadow-lg hover:scale-[1.02]'
    : '';

  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Card;