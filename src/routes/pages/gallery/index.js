/**
 * Gallery
 */
/* eslint-disable */
import React, { Component } from 'react';
import axios from 'axios';

// page title bar
import PageTitleBar from '../../../components/PageTitleBar/PageTitleBar';

// app config
import AppConfig from '../../../constants/AppConfig';

// intl messages
import IntlMessages from '../../../util/IntlMessages';

class Gallery extends Component {

  state = {
    galleryImages: null
  }

  componentWillMount() {
    this.getGalleryImages();
  }

  // get gallery images
  getGalleryImages() {
    axios.get(`${AppConfig.appUrl}/data/galleryImages.js`)
      .then((response) => {
        this.setState({ galleryImages: response.data });
      })
      .catch(error => {
        // error handling
      })
  }

  render() {
    const { galleryImages } = this.state;
    return (
      <div className="gallery-wrapper">
        <PageTitleBar title={<IntlMessages id="widgets.gallery" />} match={this.props.match} />
        <div className="row">
          {galleryImages && galleryImages.map((image, key) => (
            <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3" key={key}>
              <figure className="img-wrapper">
                <img src={image.imageUrl} className="img-fluid" alt="gallery 1" />
                <figcaption>
                  <h4>{image.caption}</h4>
                  <h2>{image.title}</h2>
                </figcaption>
                <a href="javascript:void(0);">&nbsp;</a>
              </figure>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Gallery;
