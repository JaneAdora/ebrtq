import React from 'react';

interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
  leftLabel: string;
  rightLabel: string;
  className?: string;
}

export function ToggleSwitch({ 
  isOn, 
  onToggle, 
  leftLabel, 
  rightLabel, 
  className = "" 
}: ToggleSwitchProps) {
  return (
    <div 
      className={`relative inline-block w-32 h-10 rounded-full cursor-pointer transition-all duration-300 ease-in-out border-2 ${
        isOn 
          ? 'bg-green-500 border-green-500' 
          : 'bg-blue-500 border-blue-500'
      } ${className}`}
      onClick={onToggle}
    >
      {/* Slider */}
      <div 
        className={`absolute top-1 left-1 w-7 h-7 bg-white rounded-full transition-all duration-300 ease-in-out shadow-md z-10 ${
          isOn ? 'transform translate-x-20' : 'transform translate-x-0'
        }`}
      />
      
      {/* Text Labels */}
      <span 
        className={`absolute top-1/2 transform -translate-y-1/2 text-xs font-semibold text-white transition-all duration-300 ease-in-out pointer-events-none z-0 ${
          isOn 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 -translate-x-2'
        }`}
        style={{ left: '8px' }}
      >
        {leftLabel}
      </span>
      
      <span 
        className={`absolute top-1/2 transform -translate-y-1/2 text-xs font-semibold text-white transition-all duration-300 ease-in-out pointer-events-none z-0 ${
          isOn 
            ? 'opacity-0 translate-x-2' 
            : 'opacity-100 translate-x-0'
        }`}
        style={{ right: '8px' }}
      >
        {rightLabel}
      </span>
    </div>
  );
}
