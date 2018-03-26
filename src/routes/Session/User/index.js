import React from 'react';
import Profile from './Profile';
import Posts from './Posts';
import './Styles.css';

export default (props) => (
  <div className="profile-container">
    <div className="gutter" />
    <div className="profile-main">
      <Profile id={parseInt(props.match.params.id, 10)} />
      <Posts id={parseInt(props.match.params.id, 10)} />
    </div>
    <div className="gutter" />
  </div>
);
