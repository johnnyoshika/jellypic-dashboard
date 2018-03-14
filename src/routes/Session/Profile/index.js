import React from 'react';
import './Styles.css'

export default () => (
  <div className="profile-container">
    <div className="gutter" />
    <div className="profile-main">
      <div className="profile-headline">
        <div className="profile-headline-photo">
          <img
            className="image-100"
            alt=""
            src="https://res.cloudinary.com/dfk3jxiqp/image/upload/c_fill,g_auto:faces,h_152,r_max,w_152/v1427815401/bd0ar4wsjxmqtqvqcycf.png"
          />
        </div>
        <div className="profile-info">
          <div className="profile-info-username">johnnyoshika</div>
          <div className="profile-info-social-stats">
            <div>
              <strong>169</strong> posts
            </div>
            <div>
              <strong>71</strong> followers
            </div>
            <div>
              <strong>22</strong> following
            </div>
          </div>
          <div className="profile-info-name">
            <strong>Johnny Oshika</strong>
          </div>
        </div>
      </div>
      <div className="profile-photos">
        <div className="profile-photo">
          <img
            className="image-100"
            alt=""
            src="https://res.cloudinary.com/dfk3jxiqp/image/upload/c_fill,g_auto:faces,h_293,w_293/v1433342408/zacrepwlrqac6x5tozu9.jpg"
          />
        </div>
        <div className="profile-photo">
          <img
            className="image-100"
            alt=""
            src="https://res.cloudinary.com/dfk3jxiqp/image/upload/c_fill,g_auto:faces,h_293,w_293/v1433342408/zacrepwlrqac6x5tozu9.jpg"
          />
        </div>
        <div className="profile-photo">
          <img
            className="image-100"
            alt=""
            src="https://res.cloudinary.com/dfk3jxiqp/image/upload/c_fill,g_auto:faces,h_293,w_293/v1433342408/zacrepwlrqac6x5tozu9.jpg"
          />
        </div>
        <div className="profile-photo">
          <img
            className="image-100"
            alt=""
            src="https://res.cloudinary.com/dfk3jxiqp/image/upload/c_fill,g_auto:faces,h_293,w_293/v1433342408/zacrepwlrqac6x5tozu9.jpg"
          />
        </div>
        <div className="profile-photo">
          <img
            className="image-100"
            alt=""
            src="https://res.cloudinary.com/dfk3jxiqp/image/upload/c_fill,g_auto:faces,h_293,w_293/v1433342408/zacrepwlrqac6x5tozu9.jpg"
          />
        </div>
      </div>
      <div className="gutter" />
    </div>
  </div>
);
