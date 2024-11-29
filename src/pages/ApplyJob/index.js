// FormComponent.js
import React from 'react';
import './style.css'; // Import the CSS file

const FormComponent = () => {
    return (
        <div className="group-239197">
            <div className="rectangle-26"></div>
            <div className="rectangle-6692"></div>
            <div className="ellipse-11"></div>

            <h1 className="confirm-info">Confirm your information</h1>
            <div className="email">alexarawles@gmail.com</div>

            <div className="group-239179">
                <div className="full-name">Full Name</div>
                <div className="rectangle-name">
                    <input type="text" className="first-name" placeholder="Your First Name" />
                </div>
            </div>

            <div className="group-239190">
                <div className="phone">Phone</div>
                <div className="rectangle-phone">
                    <input type="text" className="phone-input" placeholder="Enter Phone Number" />
                </div>
            </div>

            <button className="button-confirm">
                <div className="rectangle-confirm">
                    <div className="edit-confirm">Edit</div>
                </div>
            </button>

            <button className="button-edit">
                <div className="rectangle-edit">
                    <div className="edit-edit">Save</div>
                </div>
            </button>
        </div>
    );
}

export default FormComponent;
