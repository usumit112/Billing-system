import { useState } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner'; 
import Cookies from 'js-cookie';

const fetchUserDetails = async () => {
  const token = Cookies.get('sessionid');
  const response = await axios.get('http://127.0.0.1:8000/api/agent/get-user-details', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data.user;
};

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const { data: userDetails, isLoading, error } = useQuery({
    queryKey: ['userDetails'],
    queryFn: fetchUserDetails,
  });

  const handleUpdateImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      console.log("File uploaded:", selectedFile);
      setIsModalOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ThreeDots color="#00BFFF" height={80} width={80} />
      </div>
    );
  }

  if (error) {
    return <div>Error fetching user details: {error.message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 flex flex-col border-r-2 border-red-300">
          <h3 className="text-xl font-semibold mb-4">Personal Details</h3>
          <div className='flex flex-col items-center'>
            <img
              src={`http://127.0.0.1:8000/${userDetails.image}`}
              alt="Profile"
              className="rounded-full w-24 h-24 mb-4"
            />
            <button className="bg-cyan-500 text-white px-4 py-2 rounded-full mb-4">
              {userDetails.partner_type}
            </button>
            <h3 className="text-lg font-semibold mb-2">{userDetails.company_name}</h3>
            <p className="text-gray-600">{userDetails.phone}</p>
            <p className="text-gray-600">{userDetails.email}</p>
            <div className="flex items-center mt-2">
              {userDetails.phone_verified ? (
                <AiOutlineCheckCircle className="text-green-500 mr-2" />
              ) : (
                <AiOutlineCheckCircle className="text-red-500 mr-2" />
              )}
              <span className={`font-semibold ${userDetails.phone_verified ? 'text-green-500' : 'text-red-500'}`}>
                {userDetails.phone_verified ? 'VERIFIED' : 'NOT VERIFIED'}
              </span>
            </div>
            <button 
              onClick={handleUpdateImageClick}
              className="mt-4 bg-gray-300 text-gray-700 py-2 px-4 rounded w-full"
            >
              Update Image
            </button>
            <Link to="/admin/updateProfile" className="mt-2 text-center bg-gray-300 text-gray-700 py-2 px-4 rounded w-full">
              Update Details
            </Link>
          </div>
        </div>
        <div className="p-4">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Personal Details</h3>
            <p><strong>Province:</strong> {userDetails.user_detail?.province || 'Not Provided'}</p>
            <p><strong>District:</strong> {userDetails.user_detail?.district || 'Not Provided'}</p>
            <p><strong>Local Body:</strong> {userDetails.user_detail?.local_body || 'Not Provided'}</p>
            <p><strong>Ward No:</strong> {userDetails.user_detail?.ward_no || 'Not Provided'}</p>
            <p><strong>Street:</strong> {userDetails.user_detail?.street || 'Not Provided'}</p>
          </div>
          <h3 className="text-xl font-semibold mb-2">Institution Details</h3>
          <p><strong>Company Name:</strong> {userDetails.company_name || 'Not Provided'}</p>
          <p><strong>Business Type:</strong> {userDetails.business_type || 'Not Provided'}</p>
          <p><strong>Associated With:</strong> {userDetails.associated_with || 'Not Provided'}</p>
          <p><strong>PAN/VAT:</strong> {userDetails.pan_vat || 'Not Provided'}</p>
          <p><strong>Register Number:</strong> {userDetails.register_number || 'Not Provided'}</p>
          <p><strong>Company Phone:</strong> {userDetails.company_phone || 'Not Provided'}</p>
          <p><strong>Company Email:</strong> {userDetails.company_email || 'Not Provided'}</p>
          <p><strong>Company Website:</strong> {userDetails.company_website || 'Not Provided'}</p>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Upload Profile Image</h3>
            <input type="file" onChange={handleFileChange} className="mb-4" />
            {selectedFile && (
              <p className="text-sm text-gray-600 mb-4">Selected file: {selectedFile.name}</p>
            )}
            <div className="flex justify-end">
              <button
                onClick={handleUploadClick}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mr-2"
              >
                Upload
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
