import React from 'react'
import './style.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'

export default function Footer() {
  return (
    <footer>
        <div className='container'>
            <div className='row'>
                
                <div className="col-md-4 col-sm-12 text-center text-md-start">
                    <div className="footer-info">
                        <div className="section-title">
                            <h2>Headquarter</h2>
                        </div>
                        <address>
                            <p>212 Barrington Court <br/>New York, ABC 10001</p>
                        </address>

                        <ul className="social-icon">
                            <li><FontAwesomeIcon icon={faFacebook} /></li>
                            <li><FontAwesomeIcon icon={faTwitter} /></li>
                            <li><FontAwesomeIcon icon={faInstagram} /></li>
                        </ul>

                        <div className="copyright-text"> 
                            <p>Copyright &copy; 2020 Company Name</p>
                            <p>Template by: <a href="https://www.phpjabbers.com/">PHPJabbers.com</a></p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 col-sm-12 text-center text-md-start">
                    <div className="footer-info">
                        <div className="section-title">
                            <h2>Contact Info</h2>
                        </div>
                        <address>
                            <p>+1 333 4040 5566</p>
                            <p><a href="mailto:contact@company.com">contact@company.com</a></p>
                        </address>

                        <div className="footer_menu">
                            <h2>Quick Links</h2>
                            <ul className="p-0">
                                <li><a href="index.html">Home</a></li>
                                <li><a href="about-us.html">About Us</a></li>
                                <li><a href="terms.html">Terms & Conditions</a></li>
                                <li><a href="contact.html">Contact Us</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 col-sm-12 text-center text-md-start">
                    <div className="footer-info newsletter-form">
                        <div className="section-title">
                            <h2>Newsletter Signup</h2>
                        </div>
                        <div>
                            <div className="form-group">
                                
                                <span><sup>*</sup> Please note - we do not spam your email.</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </footer>
  )
}
