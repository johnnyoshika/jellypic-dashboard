import React, { Component } from 'react';
import MaybeStatus from '../../../../components/MaybeStatus';
import { selectUser, selectProfile } from '../../../../utils/selectors';

const getUser = props => selectUser(props.entities, props.userProfile.id);
const getProfile = props => selectProfile(props.entities, props.userProfile.id);

const Status = MaybeStatus(
  props => props.userProfile.status === 'error' && !getProfile(props),
  props => props.userProfile.status === 'loading' && !getProfile(props)
);

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

  renderProfile() {
    // use id in redux state (this.props.userProfile.id) instead of this.props.id
    // which comes from the router, as this.props.id gets immediately changed when the route
    // changes before this.props.userProfile.status has a chance to switch from 'success' to 'loading'

    const user = getUser(this.props);
    const profile = getProfile(this.props);

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
        <Status message={this.props.userProfile.error} {...this.props}>
          {this.renderProfile()}
        </Status>
      </div>
    );
  }
}

export default ProfileView;
