import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import Button from '../components/ui/Button';
import InputField from '../components/ui/InputField';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');  // Clear any previous errors
    setIsLoading(true);  // Start loading

    try {
      // Send login request
      const res = await fetch('https://socialboot-backend-iq4t.vercel.app/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      // Check if the response was successful
      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token in localStorage
      localStorage.setItem('token', data.token);

      // Navigate to the dashboard after successful login
      navigate('/dashboard');
    } catch (err: any) {
      // Handle any errors during the login process
      setError(err.message);
    } finally {
      setIsLoading(false);  // Stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h1>

        {/* Show error message if any */}
        {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Email"
            type="email"
            value={email}
            placeholder='Enter Email'
            onChange={(e) => setEmail(e.target.value)}
            required
            icon={<Mail size={18} />}
          />

          <div className="relative">
            <InputField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              placeholder='Enter Password'
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

          {/* Submit Button */}
          <Button type="submit" fullWidth isLoading={isLoading}>
            Sign In
          </Button>

          <p className="text-sm text-center text-gray-600 mt-4">
            Don't have an account?{' '}
            <Link to="/signup" className="text-purple-600 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
