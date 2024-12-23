import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export const FormInput: React.FC<FormInputProps> = ({ label, id, className = '', ...props }) => (
  <div>
    <label htmlFor={id} className="sr-only">
      {label}
    </label>
    <input
      id={id}
      className={`appearance-none relative block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm ${className}`}
      {...props}
    />
  </div>
);
