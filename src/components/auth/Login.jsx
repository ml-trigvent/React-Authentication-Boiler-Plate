import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/api';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required.';
    if (!formData.password.trim()) newErrors.password = 'Password is required.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const userDetail = await loginUser(formData);
        if (userDetail.token) {
          localStorage.setItem('token', userDetail.token);
          navigate('/home'); // Redirect on success
        } else {
          setLoginError('Invalid email or password. Please try again.');
        }
      } catch (error) {
        setLoginError(error.response?.data?.error ?? 'Invalid email or password. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Welcome Back!</h1>
        <p className="text-gray-500 text-center mb-6">Sign in to continue</p>
        <form onSubmit={handleSubmit}>
          {loginError && <div className="text-red-500 text-center mb-4">{loginError}</div>}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">Email Address <span className='text-red-500'> *</span></label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your email"
            />
            {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium">Password <span className='text-red-500'> *</span></label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your password"
            />
            {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 mt-4 rounded-lg text-white font-semibold transition-all duration-300 ${isSubmitting ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
              }`}
          >
            {isSubmitting ? 'Logging In...' : 'Log In'}
          </button>
          <div className="flex justify-between items-center mt-4">
            <Link to="/sent/email" className="text-purple-600 hover:text-purple-700 text-sm">Forgot Password?</Link>
            <Link to="/register" className="text-purple-600 hover:text-purple-700 text-sm">Create Account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
