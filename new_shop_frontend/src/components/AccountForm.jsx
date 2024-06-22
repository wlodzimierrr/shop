import React from 'react';

const AccountForm = ({ userData, setUserData, fetchUserData }) => {

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('auth-token');
            const response = await fetch('/api/auth/updateDetails', {
                method: 'PUT',
                headers: {
                    'auth-token': token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            const responseData = await response.json();
            if (responseData.success) {
                alert("Details updated successfully!");
                fetchUserData();
            } else {
                alert(responseData.message || "Failed to update details.");
            }
        } catch (error) {
            console.error("Error updating details:", error);
            alert("An error occurred while updating details.");
        }
    };

    return (
        <form className="flex flex-col gap-2 mt-2" onSubmit={handleSubmit}>
            <input
                name="username"
                type="text"
                value={userData.username}
                onChange={handleChange}
                placeholder="Username"
                className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
            />
            <input
                name="firstName"
                type="text"
                value={userData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
                autoComplete="given-name"
            />
            <input
                name="lastName"
                type="text"
                value={userData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
                autoComplete="family-name"
            />
            <input
                name="addressLine1"
                type="text"
                value={userData.addressLine1}
                onChange={handleChange}
                placeholder="Address Line 1"
                className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
                autoComplete="address-line1"
            />
            <input
                name="addressLine2"
                type="text"
                value={userData.addressLine2}
                onChange={handleChange}
                placeholder="Address Line 2"
                className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
                autoComplete="address-line2"
            />
            <input
                name="city"
                type="text"
                value={userData.city}
                onChange={handleChange}
                placeholder="City"
                className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
                autoComplete="address-level2"
            />
            <input
                name="county"
                type="text"
                value={userData.county}
                onChange={handleChange}
                placeholder="County"
                className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
                autoComplete="address-level1"
            />
            <input
                name="postcode"
                type="text"
                value={userData.postcode}
                onChange={handleChange}
                placeholder="Postcode"
                className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
                autoComplete="postal-code"
            />
            <input
                name="email"
                type="email"
                value={userData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="h-8 w-full pl-5 bg-white outline-none rounded-xl text-sm"
                autoComplete="email"
            />
            <button type="submit" className="btn-dark rounded-xl my-5 !py-1">
                Update Details
            </button>
        </form>
    );
};

export default AccountForm;
