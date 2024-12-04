import React, { useState } from 'react';
import './UserInfoPage.css';

const UserInfoPage = () => {
    const [userInfo, setUserInfo] = useState({
        fullName: 'Alexa Rawles',
        email: 'alexarawles@gmail.com',
        gender: 'Female',
        language: 'English',
        phone: '123-456-7890',
        birthday: '1995-05-15',
        country: 'USA',
        cv: '',
        status: 'Active',
    });

    const [isEditing, setIsEditing] = useState(false);  // Track if we are in edit mode
    const [tempInfo, setTempInfo] = useState(userInfo);  // Temporary state for editing

    // Handle input changes
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setTempInfo({ ...tempInfo, [id]: value });
    };

    // Confirm edit and save the changes
    const handleConfirm = () => {
        setUserInfo(tempInfo);
        setIsEditing(false);  // Exit edit mode
    };

    // Cancel edit and revert to original values
    const handleCancel = () => {
        setTempInfo(userInfo);
        setIsEditing(false);  // Exit edit mode
    };

    return (
        <div className="user-info-page">
            <div className="group-container">
                {/* User Card */}
                <div className="user-card">
                    <div className="user-avatar"></div>
                    <div className="user-details">
                        <h2>{userInfo.fullName}</h2>
                        <p className="email">
                            {userInfo.email} <a href="#" className="edit-email-link">✏️</a>
                        </p>
                    </div>

                    <div className="edit-buttons-container">
                        {!isEditing ? (
                            <button
                                className="edit-button"
                                onClick={() => setIsEditing(true)}
                            >
                                Edit
                            </button>
                        ) : (
                            <>
                                <button className="confirm-button" onClick={handleConfirm}>
                                    Confirm
                                </button>
                                <button className="cancel-button" onClick={handleCancel}>
                                    Cancel
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Info Groups */}
                <div className="info-groups">
                    <div className="info-group">
                        <label htmlFor="fullName">Full Name</label>
                        {isEditing ? (
                            <input
                                type="text"
                                id="fullName"
                                value={tempInfo.fullName}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <input
                                type="text"
                                id="fullName"
                                value={userInfo.fullName}
                                readOnly
                                className="readonly-input"
                            />
                        )}
                    </div>

                    <div className="info-group">
                        <label htmlFor="birthday">Birthday</label>
                        {isEditing ? (
                            <input
                                type="date"
                                id="birthday"
                                value={tempInfo.birthday}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <input
                                type="text"
                                id="birthday"
                                value={userInfo.birthday}
                                readOnly
                                className="readonly-input"
                            />
                        )}
                    </div>

                    <div className="info-group">
                        <label htmlFor="gender">Gender</label>
                        {isEditing ? (
                            <select
                                id="gender"
                                value={tempInfo.gender}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Gender</option>
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                            </select>
                        ) : (
                            <input
                                type="text"
                                id="gender"
                                value={userInfo.gender}
                                readOnly
                                className="readonly-input"
                            />
                        )}
                    </div>

                    <div className="info-group">
                        <label htmlFor="country">Country</label>
                        {isEditing ? (
                            <input
                                type="text"
                                id="country"
                                value={tempInfo.country}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <input
                                type="text"
                                id="country"
                                value={userInfo.country}
                                readOnly
                                className="readonly-input"
                            />
                        )}
                    </div>

                    <div className="info-group">
                        <label htmlFor="language">Language</label>
                        {isEditing ? (
                            <select
                                id="language"
                                value={tempInfo.language}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Language</option>
                                <option value="English">English</option>
                                <option value="French">French</option>
                            </select>
                        ) : (
                            <input
                                type="text"
                                id="language"
                                value={userInfo.language}
                                readOnly
                                className="readonly-input"
                            />
                        )}
                    </div>

                    <div className="info-group">
                        <label htmlFor="status">Status</label>
                        {isEditing ? (
                            <input
                                type="text"
                                id="status"
                                value={tempInfo.status}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <input
                                type="text"
                                id="status"
                                value={userInfo.status}
                                readOnly
                                className="readonly-input"
                            />
                        )}
                    </div>

                    <div className="info-group">
                        <label htmlFor="phone">Phone</label>
                        {isEditing ? (
                            <input
                                type="text"
                                id="phone"
                                value={tempInfo.phone}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <input
                                type="text"
                                id="phone"
                                value={userInfo.phone}
                                readOnly
                                className="readonly-input"
                            />
                        )}
                    </div>

                    <div className="info-group">
                        <label htmlFor="cv">My CV</label>
                        {isEditing ? (
                            <input type="file" id="cv" />
                        ) : (
                            <input
                                type="text"
                                id="cv"
                                value={userInfo.cv}
                                readOnly
                                className="readonly-input"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfoPage;
