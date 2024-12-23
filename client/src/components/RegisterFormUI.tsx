import React from 'react';
import { Link } from 'react-router-dom';
import { FormInput } from './FormInput';

interface RegisterFormUIProps {
  formData: {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
  };
  loading: boolean;
  error: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const RegisterFormUI: React.FC<RegisterFormUIProps> = ({
  formData,
  loading,
  error,
  onChange,
  onSubmit
}) => (
  <div className="min-h-screen flex items-center justify-center bg-background text-text">
    <div className="max-w-md w-full space-y-8 p-8 bg-surface rounded-lg border border-border">
      <div>
        <h2 className="mt-6 text-center text-3xl font-bold">
          Create your account
        </h2>
      </div>
      <form className="mt-8 space-y-6" onSubmit={onSubmit}>
        {error && (
          <div className="rounded bg-error/10 p-4">
            <div className="text-sm text-error">{error}</div>
          </div>
        )}
        <div className="space-y-4">
          <FormInput
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={onChange}
            label="Name"
            placeholder="Full name"
            className="bg-background border-border text-text placeholder-text-light"
          />
          <FormInput
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={onChange}
            label="Email address"
            placeholder="Email address"
            className="bg-background border-border text-text placeholder-text-light"
          />
          <FormInput
            id="password"
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={onChange}
            label="Password"
            placeholder="Password"
            className="bg-background border-border text-text placeholder-text-light"
          />
          <FormInput
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={onChange}
            label="Confirm Password"
            placeholder="Confirm password"
            className="bg-background border-border text-text placeholder-text-light"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 transition-colors duration-200"
          >
            {loading ? (
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </span>
            ) : null}
            Create Account
          </button>
        </div>
      </form>
      <div className="text-sm text-center mt-4">
        <Link
          to="/login"
          className="font-medium text-primary hover:text-primary-hover"
        >
          Already have an account? Sign in
        </Link>
      </div>
    </div>
  </div>
);