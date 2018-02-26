import React, { Component } from 'react';
import Moment from 'react-moment';
import { Image } from 'cloudinary-react';
import { Link } from 'react-router-dom';
import './Styles.css';

class Card extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-heading">
          <div className="card-heading-user">
            <div className="card-heading-user-image">
              <img src={this.props.post.user.thumbUrl} alt={this.props.post.user.username} />
            </div>
            <div className="card-heading-user-name">
              <a href="">{this.props.post.user.username}</a>
            </div>
          </div>
          <div className="card-heading-time text-right">
            <Link to={'/posts/' + this.props.post.id}>
              <Moment fromNow ago unix>
                {this.props.post.createdAt}
              </Moment>
            </Link>
          </div>
        </div>
        <div className="card-photo">
          <Image
            className="image-100"
            cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}
            publicId={this.props.post.cloudinaryPublicId}
            crop="fit"
            height="600"
            width="600"
            secure
          />
        </div>
      </div>
    );
  }
}

export default Card;
