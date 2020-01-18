import React from 'react';
import { toastr } from 'react-redux-toastr';
import loadScript from '../../utils/loadScript';

const Uploader = ({
  savePost,
  history,
  children
}) => {

  const uploadWidget = () => {
    loadScript('//widget.cloudinary.com/global/all.js').then(
      () => showUploader(),
      () => {
        toastr.error(`Can't connect to network. Please try again!`);
      }
    );
  };

  const showUploader = () => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        upload_preset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
        sources: ['local', 'url', 'camera', 'facebook', 'google_photos'],
        tags: ['dashboard'],
        theme: 'white',
        multiple: false
      },
      (error, result) => {
        if (!error) {
          savePost(result.map(image => image.public_id));
          history.push('/');
          return;
        }

        if (error.message !== 'User closed widget') toastr.error(error.message);
      }
    );
  }

  return (
    <a onClick={uploadWidget}>{children}</a>
  );
};

export default Uploader;
