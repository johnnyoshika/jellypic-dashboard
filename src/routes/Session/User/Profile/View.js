import React, { Component } from 'react';
import ErrorMessage from '../../../../components/ErrorMessage';
import { selectUser, selectProfile } from '../../../../utils/selectors';

class ProfileView extends Component {
  componentDidMount() {
    this.props.fetchProfile(this.props.id);
  }

  // had to put this here b/c when router goes from /users/1 to /user/2, new component doesn't get mounted.
  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.props.fetchProfile(nextProps.id);
    }
  }

  user() {
    return selectUser(this.props.entities, this.props.userProfile.id);
  }

  profile() {
    return selectProfile(this.props.entities, this.props.userProfile.id);
  }

  renderError() {
    if (this.profile())
      return (null);

    return (
      <div className="text-center">
        <ErrorMessage message={this.props.userProfile.error} />
      </div>
    );
  }

  renderSpinner() {
    if (this.profile())
      return (null);

    return (
      <div className="text-center">
        <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw" />
      </div>
    );
  }

  renderProfile() {
    // use id in redux state (this.props.userProfile.id) instead of this.props.id
    // which comes from the router, as this.props.id gets immediately changed when the route
    // changes before this.props.userProfile.status has a chance to switch from 'success' to 'loading'

    const user = this.user();
    const profile =this.profile();

    if (!user || !profile)
      return (null);

    return (
      <div className="profile-headline">
        <div className="profile-headline-photo">
          <img
            className="image-100"
            alt=""
            src={user.pictureUrl}
            crossOrigin="anonymous"
          />
        </div>
        <div className="profile-info">
          <div className="profile-info-username">{user.username}</div>
          <div className="profile-info-social-stats">
            <div>
              <strong>{profile.postCount}</strong> posts
            </div>
            <div>
              <strong>{profile.likeCount}</strong> likes
            </div>
            <div>
              <strong>{profile.commentCount}</strong> comments
            </div>
          </div>
          <div className="profile-info-name">
            <strong>
              {user.firstName} {user.lastName}
            </strong>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="vertical-center">
        {this.renderProfile()}
        {this.props.userProfile.status === 'error' && this.renderError()}
        {this.props.userProfile.status === 'loading' && this.renderSpinner()}
      </div>
    );
  }
}

export default ProfileView;
