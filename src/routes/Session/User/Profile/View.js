import React, { Component } from 'react';

class ProfileView extends Component {
  render() {
    return (
      <div className="profile-headline">
        <div className="profile-headline-photo">
          <img
            className="image-100"
            alt=""
            src="https://res.cloudinary.com/dfk3jxiqp/image/upload/c_fill,g_auto:faces,h_152,r_max,w_152/v1427815401/bd0ar4wsjxmqtqvqcycf.png"
            crossOrigin="anonymous"
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
    );
  }
}

export default ProfileView;
