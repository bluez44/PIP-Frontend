import React, { useState } from 'react';
import './UserInfoPage.css';

const UserInfoPage = () => {
    const [userInfo, setUserInfo] = useState({
        fullName: 'Alexa Rawles',
        email: 'alexarawles@gmail.com',
        gender: '',
        language: '',
        phone: '',
        birthday: '',
        country: '',
        cv: '',
        status: '',
    });

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUserInfo({ ...userInfo, [id]: value });
    };

    return (
        <div className="user-info-page">
            <div className="group-container">
                {/* User Card */}
                <div class="user-card">
                    <div class="user-avatar"></div>
                    <div class="user-details">
                        <h2>Alexa Rawles</h2>
                        <p class="email">alexarawles@gmail.com <a href="#" class="edit-email-link">✏️</a></p>
                    </div>
                    <button class="edit-button">Edit</button>
                </div>

                {/* Info Groups */}
                <div className="info-groups">
                    <div className="info-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            placeholder="Your First Name"
                            value={userInfo.fullName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="info-group">
                        <label htmlFor="birthday">Birthday</label>
                        <input
                            type="date"
                            id="birthday"
                            placeholder="Your First Name"
                            value={userInfo.birthday}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="info-group">
                        <label htmlFor="gender">Gender</label>
                        <select id="gender" value={userInfo.gender} onChange={handleInputChange}>
                            <option value="">Select Gender</option>
                            <option value="Female">Female</option>
                            <option value="Male">Male</option>
                        </select>
                    </div>
                    <div className="info-group">
                        <label htmlFor="country">Country</label>
                        <input
                            type="text"
                            id="country"
                            placeholder="Your First Name"
                            value={userInfo.country}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="info-group">
                        <label htmlFor="language">Language</label>
                        <select id="language" value={userInfo.language} onChange={handleInputChange}>
                            <option value="">Select Language</option>
                            <option value="English">English</option>
                            <option value="French">French</option>
                        </select>
                    </div>
                    <div className="info-group">
                        <label htmlFor="status">Status</label>
                        <input
                            type="text"
                            id="status"
                            placeholder="Your First Name"
                            value={userInfo.status}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="info-group">
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="text"
                            id="phone"
                            placeholder="Your First Name"
                            value={userInfo.phone}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="info-group">
                        <label htmlFor="cv">My CV</label>
                        <input type="file" id="cv" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInfoPage;
