import { useState } from 'react';
import { AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie';

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    try {
      const token = Cookies.get('sessionid');
      await axios.post(
        'http://127.0.0.1:8000/api/agent/change-password',
        {
          current_password: oldPassword,
          new_password: newPassword,
          new_password_confirmation: confirmPassword,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      toast.success('Password updated successfully!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      toast.error('Failed to update password. Please try again.');
      console.error(err.response ? err.response.data : err.message);
    }
  };

  return (
    <>
      <hr className="my-2" />
      <div className="flex p-4">
        <div className="bg-gray-100 p-6 md:p-8 rounded shadow-md max-w-md">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 flex items-center">
            <AiOutlineLock className="mr-2" />
            Change Password
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4 relative">
              <label className="block text-gray-700 mb-2" htmlFor="oldPassword">
                Old Password
              </label>
              <input
                type={showOldPassword ? 'text' : 'password'}
                id="oldPassword"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
              <span
                className="absolute right-3 top-10 cursor-pointer"
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>

            <div className="mb-4 relative">
              <label className="block text-gray-700 mb-2" htmlFor="newPassword">
                New Password
              </label>
              <input
                type={showNewPassword ? 'text' : 'password'}
                id="newPassword"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <span
                className="absolute right-3 top-10 cursor-pointer"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
              <p className="text-sm text-gray-600 mt-2">
                Password must be at least 8 characters long and contain at least one uppercase letter.
              </p>
            </div>

            <div className="mb-6 relative">
              <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
                Confirm New Password
              </label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                className="w-full px-3 py-2 border border-gray-300 rounded"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span
                className="absolute right-3 top-10 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
