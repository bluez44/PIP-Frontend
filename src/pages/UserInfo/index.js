import React, { useState } from 'react';
import './style.css';

const UserInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showCVPopup, setShowCVPopup] = useState(false);

  const toggleEditing = () => setIsEditing(!isEditing);
  const toggleCVPopup = () => setShowCVPopup(!showCVPopup);

  return (
    <div className="user-info__wrapper">
      <div className="user-info__container">
        <div className="user-info__left">
          <label>
            Name:
            {isEditing ? <input type="text" defaultValue="John Doe" /> : <span>John Doe</span>}
          </label>
          <label>
            Email:
            {isEditing ? <input type="email" defaultValue="johndoe@example.com" /> : <span>johndoe@example.com</span>}
          </label>
          <label>
            Full Name:
            {isEditing ? <input type="text" defaultValue="Johnathan Doe" /> : <span>Johnathan Doe</span>}
          </label>
          <label>
            Gender:
            {isEditing ? (
              <select>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            ) : (
              <span>Male</span>
            )}
          </label>
          <label>
            Language:
            {isEditing ? <input type="text" defaultValue="English" /> : <span>English</span>}
          </label>
          <label>
            Phone Number:
            {isEditing ? <input type="tel" defaultValue="+1234567890" /> : <span>+1234567890</span>}
          </label>
        </div>

        <div className="user-info__right">
          <label>
            Birthday:
            {isEditing ? <input type="date" defaultValue="2000-01-01" /> : <span>2000-01-01</span>}
          </label>
          <label>
            Country:
            {isEditing ? (
              <select>
                <option>United States</option>
                <option>Canada</option>
                <option>Vietnam</option>
                <option>Other</option>
              </select>
            ) : (
              <span>United States</span>
            )}
          </label>
          <label>
            Status:
            {isEditing ? <input type="text" defaultValue="Active" /> : <span>Active</span>}
          </label>
        </div>
      </div>

      <div className="user-info__actions">
        <button onClick={toggleEditing}>{isEditing ? 'Save' : 'Edit'}</button>
        {isEditing && <button onClick={toggleCVPopup}>Add More CV</button>}
      </div>

      {showCVPopup && (
        <div className="cv-popup">
          <div className="cv-popup__content">
            <h3>Add More CV</h3>
            <label>
              Degree:
              <input type="text" />
            </label>
            <label>
              Field:
              <input type="text" />
            </label>
            <label>
              Institution:
              <input type="text" />
            </label>
            <label>
              Skills:
              <textarea></textarea>
            </label>
            <label>
              Experience:
              <textarea></textarea>
            </label>
            <div className="cv-popup__actions">
              <button onClick={toggleCVPopup}>Save</button>
              <button onClick={toggleCVPopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
