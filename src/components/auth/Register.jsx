import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/api';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    // last_name: '',
    email: '',
    phone_no: '',
    password: '',
    confirm_password: '',
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [registrationError, setRegistrationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

// Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'First Name is required.';
    // if (!formData.last_name.trim()) newErrors.last_name = 'Last Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }
    if (!formData.phone_no.trim()) newErrors.phone_no = 'Phone No is required.';
    if (!formData.password.trim()) newErrors.password = 'Password is required.';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters long.';
    if (formData.password !== formData.confirm_password) newErrors.confirm_password = 'Passwords do not match.';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    const newErrors = validateForm();
    setErrors(newErrors);

    // Handel Api for login
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      try {
        await registerUser(formData);
        navigate('/');
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            setRegistrationError('Email already registered');
          } else {
            setRegistrationError('An unexpected error occurred. Please try again later.');
          }
        } else {
          setRegistrationError('Network error. Please check your connection.');
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Create an Account</h1>
        <p className="text-gray-600 text-center mb-6">Sign up to get started!</p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {registrationError && <div className="text-red-500 text-center mb-4">{registrationError}</div>}

          <div>
            <label className="block text-gray-700 font-semibold">Full Name  <span className='text-red-500'> *</span></label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-indigo-200 focus:outline-none"
              placeholder="Enter your first name"
            />
            {submitted && errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
          </div>
          {/* For Last Name */}
          {/* 
          <div>
            <label className="block text-gray-700 font-semibold">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-indigo-200 focus:outline-none"
              placeholder="Enter your last name"
            />
            {submitted && errors.last_name && <div className="text-red-500 text-sm">{errors.last_name}</div>}
          </div> */}

          <div>
            <label className="block text-gray-700 font-semibold">Email <span className='text-red-500'>*</span></label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-indigo-200 focus:outline-none"
              placeholder="Enter your email"
            />
            {submitted && errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Phone No <span className='text-red-500'>*</span></label>
            <input
              type="tel"
              name="phone_no"
              value={formData.phone_no}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-indigo-200 focus:outline-none"
              placeholder="Enter your phone number"
            />
            {submitted && errors.phone_no && <div className="text-red-500 text-sm">{errors.phone_no}</div>}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Password <span className='text-red-500'>*</span></label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-indigo-200 focus:outline-none"
              placeholder="Enter your password"
            />
            {submitted && errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Confirm Password <span className='text-red-500'>*</span></label>
            <input
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-indigo-200 focus:outline-none"
              placeholder="Confirm your password"
            />
            {submitted && errors.confirm_password && <div className="text-red-500 text-sm">{errors.confirm_password}</div>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 mt-4 rounded-lg text-white font-semibold transition-all duration-300 ${isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{' '}
            <Link to="/" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
