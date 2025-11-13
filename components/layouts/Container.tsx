import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return (
    <main className={`flex-1 p-8 bg-gradient-to-br from-white via-primary-50/30 to-secondary-50/30 min-h-screen ${className}`}>
      <div className="container mx-auto">
        {children}
      </div>
    </main>
  );
};

