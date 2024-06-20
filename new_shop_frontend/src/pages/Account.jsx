import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Components
import AccountForm from '../components/AccountForm';

const Account = () => {
    
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        county: '',
        postcode: '',
    });
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('')

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('auth-token');
            const response = await fetch('/api/user/details', {
                method: 'GET',
                headers: {
                    'auth-token': token,
                },
            });
            const responseData = await response.json();
            if (responseData.success) {
                const { username, email, personalDetails } = responseData.userData;
                setUserData({
                    username: username || '', 
                    email: email || '',
                    firstName: personalDetails.FirstName || '',
                    lastName: personalDetails.LastName || '',
                    addressLine1: personalDetails.AddressLine1 || '',
                    addressLine2: personalDetails.AddressLine2 || '',
                    city: personalDetails.City || '',
                    county: personalDetails.County || '',
                    postcode: personalDetails.Postcode || '',
                });
                
            } else {
                console.error("Error fetching user data:", responseData.message);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitPassword = async (e) => {
        e.preventDefault();
      
        try {
          const token = localStorage.getItem('auth-token');
          const response = await fetch('/api/auth/changePassword', {
            method: 'PUT',
            headers: {
              'auth-token': token,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ oldPassword, newPassword }),
          });
      
          const responseData = await response.json();
          
          if (response.ok) {
            alert('Password changed successfully!');
            setShowModal(false);
          } else {
            alert(responseData.message || 'Failed to change password.');
          }
        } catch (error) {
          console.error('Error changing password:', error);
          alert('An error occurred while changing password.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <section className="max-padd-container flexCenter flex-col pt-16 bg-primary">
            <div className="w-full max-w-[666px] h-[600px] bg-primary m-auto px-14">
                <h3 className="h3">My Account</h3>
                <AccountForm userData={userData} setUserData={setUserData} fetchUserData={fetchUserData} />
                <div className='flexBetween'>
                    <button onClick={() => setShowModal(true)} type="submit" className="btn-dark-outline !bg-red-500 rounded-xl my-5 !py-1">
                        Change Password
                    </button>
                    {/* Modal */}
                    {showModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="modal-overlay absolute inset-0 bg-gray-500 opacity-75"></div>

                        <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                            <div className="modal-content py-4 text-left px-6">
                            {/* Title */}
                            <div className="flex justify-between items-center pb-3">
                                <p className="text-2xl font-bold">Change Password</p>
                                <button
                                onClick={() => setShowModal(false)}
                                className="modal-close cursor-pointer z-50"
                                >
                                <span className="text-3xl">&times;</span>
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmitPassword}>
                                <div className="mb-4">
                                <label htmlFor="oldPassword" className="block text-gray-700 text-sm font-bold mb-2">
                                    Old Password:
                                </label>
                                <input
                                    type="password"
                                    id="oldPassword"
                                    name="oldPassword"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    required
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                </div>
                                <div className="mb-6">
                                <label htmlFor="newPassword" className="block text-gray-700 text-sm font-bold mb-2">
                                    New Password:
                                </label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                                </div>
                                <div className="flex items-center justify-end">
                                <button
                                    type="submit"
                                    className="btn-dark text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
                                >
                                    Submit
                                </button>
                                </div>
                            </form>
                            </div>
                        </div>
                        </div>
                    )}
                    <Link to={'/orders'}>
                        <button  type="submit" className="btn-dark  rounded-xl my-5 !py-1">
                            Orders History
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Account;
