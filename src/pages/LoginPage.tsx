import { useState, useEffect } from 'react';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import Button from '../components/ui/Button';
import InputField from '../components/ui/InputField';
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void; // Optional callback for successful login
}

export default function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // For Signup
  const [confirmPassword, setConfirmPassword] = useState(''); // For Signup
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // Track whether the modal is for login or signup
  const navigate = useNavigate();  // Hook for navigation

  // Inside the component
  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setConfirmPassword('');
    setError('');
    setIsLogin(true); // Optional: reset to login mode
  };

  // Reset form every time modal is opened
  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      onSuccess?.();
      resetForm(); // <- Reset only on success
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Signup failed');

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      resetForm();       // <- Reset only on success
      setIsLogin(true);  // Stay in modal, switch to login view
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Modify onClose to also optionally reset
  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-b bg-black/50 to-transparent backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl relative">
        <button
          onClick={handleClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-lg"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>

        {error && <div className="text-red-600 text-sm mb-3">{error}</div>}

        <form
          onSubmit={isLogin ? handleLoginSubmit : handleSignupSubmit}
          className="space-y-4"
        >
          {/* Signup Fields */}
          {!isLogin && (
            <InputField
              label="Full Name"
              type="text"
              value={name}
              placeholder="Enter your full name"
              onChange={(e) => setName(e.target.value)}
              required
              icon={<User size={18} />}
            />
          )}

          <InputField
            label="Email"
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
            icon={<Mail size={18} />}
          />

          <div className="relative">
            <InputField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
              icon={<Lock size={18} />}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-9 right-3"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password Field (Only for Signup) */}
          {!isLogin && (
            <div className="relative">
              <InputField
                label="Confirm Password"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                placeholder="Confirm your password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                icon={<Lock size={18} />}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-9 right-3"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          )}

          <Button type="submit" fullWidth isLoading={isLoading}>
            {isLogin ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:underline"
          >
            {isLogin
              ? 'Don’t have an account? Sign up'
              : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
}
