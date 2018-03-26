import React from 'react';
import Profile from './Profile';
import Posts from './Posts';
import './Styles.css';

export default () => (
  <div className="profile-container">
    <div className="gutter" />
    <div className="profile-main">
      <Profile />
      <Posts />
    </div>
    <div className="gutter" />
  </div>
);
