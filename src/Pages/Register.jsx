import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPath';

function Register({ onClose }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axiosInstance.post(API_PATHS.AUTH.REGISTER, formData);
      toast.success('Registration successful! Please login.');
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Create an Account</h2>
      <p className="text-sm text-gray-600 text-center mb-6">Sign up to get started</p>

      <form onSubmit={handleRegister} className="space-y-5">
        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
          <input
            id="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 text-white font-medium rounded-lg transition ${
            isLoading ? 'bg-pink-400 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-700'
          }`}
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>

      <button
        onClick={onClose}
        className="mt-4 w-full py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-medium transition"
        disabled={isLoading}
      >
        Cancel
      </button>
    </div>
  );
}

export default Register;
