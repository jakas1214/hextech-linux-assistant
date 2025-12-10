import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  icon,
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center px-6 py-2 font-display font-bold uppercase tracking-wider transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed group border-2";
  
  const variants = {
    primary: "border-[#c8aa6e] bg-[#1e2328] text-[#cdbe91] hover:bg-[#c8aa6e] hover:text-[#0a1428] shadow-[0_0_10px_rgba(200,170,110,0.3)] hover:shadow-[0_0_20px_rgba(200,170,110,0.6)]",
    secondary: "border-[#0ac8b9] bg-[#010a13] text-[#0ac8b9] hover:bg-[#0ac8b9] hover:text-[#010a13] shadow-[0_0_10px_rgba(10,200,185,0.2)] hover:shadow-[0_0_20px_rgba(10,200,185,0.5)]",
    danger: "border-red-600 bg-[#1a0505] text-red-500 hover:bg-red-600 hover:text-white shadow-[0_0_10px_rgba(220,38,38,0.3)]"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {/* Decorative corner bits for Hextech feel */}
      <span className="absolute top-0 left-0 w-1 h-1 bg-current opacity-50"></span>
      <span className="absolute top-0 right-0 w-1 h-1 bg-current opacity-50"></span>
      <span className="absolute bottom-0 left-0 w-1 h-1 bg-current opacity-50"></span>
      <span className="absolute bottom-0 right-0 w-1 h-1 bg-current opacity-50"></span>
      
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;