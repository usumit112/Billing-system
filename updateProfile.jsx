import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    salutation: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    gender: '',
    email: '',
    phone: '',
    organization_name: '',
    associatedWith: '',
    businessType: '',
    pan_vat: '',
    registration_number: '',
    companyPhone: '',
    companyEmail: '',
    companyWebsite: '',
    bank_name: '',
    bank_branch: '',
    bank_account: '',
    account_holder_name: '',
    province: '',
    district: '',
    local_body: '',
    ward_no: '',
    toleStreetName: '',
    organizationLogo: null,
  });

  useEffect(() => {
    const token = Cookies.get('sessionid');

    axios
      .get('http://127.0.0.1:8000/api/agent/get-user-details', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const userDetails = response.data;
        setFormData({
          ...formData,
          salutation: userDetails.salutation || '',
          first_name: userDetails.first_name || '',
          middle_name: userDetails.middle_name || '',
          last_name: userDetails.last_name || '',
          gender: userDetails.gender || '',
          email: userDetails.email || '',
          phone: userDetails.phone || '',
          organization_name: userDetails.organization_name || '',
          associatedWith: userDetails.associated_with || '',
          businessType: userDetails.business_type || '',
          pan_vat: userDetails.pan_vat || '',
          registration_number: userDetails.registration_number || '',
          companyPhone: userDetails.company_phone || '',
          companyEmail: userDetails.company_email || '',
          companyWebsite: userDetails.company_website || '',
          bank_name: userDetails.bank_name || '',
          bank_branch: userDetails.bank_branch || '',
          bank_account: userDetails.bank_account || '',
          account_holder_name: userDetails.account_holder_name || '',
          province: userDetails.province || '',
          district: userDetails.district || '',
          local_body: userDetails.local_body || '',
          ward_no: userDetails.ward_no || '',
          toleStreetName: userDetails.tole_street_name || '',
        });
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'organizationLogo') {
      setFormData({
        ...formData,
        organizationLogo: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = Cookies.get('sessionid');

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    axios
      .post('http://127.0.0.1:8000/api/agent/update-profile', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('Profile updated successfully:', response.data);
        alert('Profile updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating profile:', error);
        alert('Error updating profile. Please try again.');
      });
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b-2 pb-4">
        Contact Person Detail:
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Salutation *
            </label>
            <select
              name="salutation"
              value={formData.salutation}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="Mr.">Mr.</option>
              <option value="Mrs.">Mrs.</option>
              <option value="Ms.">Ms.</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              First Name *
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Middle Name
            </label>
            <input
              type="text"
              name="middle_name"
              value={formData.middle_name}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Gender *
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Phone *
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Business Details */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b-2 pb-4">
          Business Details:
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Organization Name
            </label>
            <input
              type="text"
              name="organization_name"
              value={formData.organization_name}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Business Type
            </label>
            <input
              type="text"
              name="businessType"
              value={formData.businessType}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Registration Number
            </label>
            <input
              type="text"
              name="registration_number"
              value={formData.registration_number}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              PAN/VAT Number
            </label>
            <input
              type="text"
              name="pan_vat"
              value={formData.pan_vat}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Bank Details */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b-2 pb-4">
          Bank Details:
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Bank Name
            </label>
            <input
              type="text"
              name="bank_name"
              value={formData.bank_name}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Bank Branch
            </label>
            <input
              type="text"
              name="bank_branch"
              value={formData.bank_branch}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Account Holder Name
            </label>
            <input
              type="text"
              name="account_holder_name"
              value={formData.account_holder_name}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Account Number
            </label>
            <input
              type="text"
              name="bank_account"
              value={formData.bank_account}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Address Details */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b-2 pb-4">
          Address Details:
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Province
            </label>
            <input
              type="text"
              name="province"
              value={formData.province}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              District
            </label>
            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Local Body
            </label>
            <input
              type="text"
              name="local_body"
              value={formData.local_body}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Ward No.
            </label>
            <input
              type="text"
              name="ward_no"
              value={formData.ward_no}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Tole/Street Name
            </label>
            <input
              type="text"
              name="toleStreetName"
              value={formData.toleStreetName}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Organization Logo */}
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 border-b-2 pb-4">
          Organization Logo:
        </h2>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Upload Organization Logo
          </label>
          <input
            type="file"
            name="organizationLogo"
            onChange={handleInputChange}
            className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
