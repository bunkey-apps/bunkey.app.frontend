/**
 * Shop Grid
 */
/* eslint-disable */
import React, { Component } from 'react';
import MatButton from 'material-ui/Button';
import { FormGroup, Input } from 'reactstrap';
import StarRatingComponent from 'react-star-rating-component';
import axios from 'axios';

// page title bar
import PageTitleBar from '../../../components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from '../../../util/IntlMessages';

import { RctCard, RctCardContent } from '../../../components/RctCard/index';

// app config
import AppConfig from '../../../constants/AppConfig';

export default class ShopGrid extends Component {

  state = {
    products: null
  }

  componentWillMount() {
    this.getProducts();
  }

  // get products
  getProducts() {
    axios.get(`${AppConfig.appUrl}/data/products.js`)
      .then((response) => {
        this.setState({ products: response.data });
      })
      .catch(error => {
        // error handling
      })
  }

  render() {
    const { products } = this.state;
    return (
      <div className="Shop-grid-wrapper">
        <PageTitleBar title={<IntlMessages id="sidebar.shopGrid" />} match={this.props.match} />
        <div className="shop-head row mb-20">
          <div className="col-sm-12 col-md-6 col-xl-6 mb-10">
            <form>
              <FormGroup className="has-wrapper mb-0">
                <Input type="search" name="search" id="search-todo" className="has-input-right input-lg-icon" placeholder="Search Mail List" />
                <span className="has-icon-left"><i className="ti-search"></i></span>
              </FormGroup>
            </form>
          </div>
          <div className="col-sm-12 col-md-3 col-xl-3 mb-10">
            <div className="app-selectbox">
              <FormGroup className="mb-0">
                <Input type="select" name="select" id="exampleSelect">
                  <option>Filter: Popularity</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </FormGroup>
            </div>
          </div>
          <div className="col-sm-12 col-md-3 col-xl-3 mb-10 d-xs-none">
            <div className="rct-filter">
              <ul className="list-inline mb-0">
                <li className="list-inline-item"><a href="javascript:void(0);"><i className="ti-layout-grid2"></i></a></li>
                <li className="list-inline-item"><a href="javascript:void(0);"><i className="ti-view-list-alt"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="shop-grid">
          <div className="row">
            {products && products.map((product, key) => (
              <div className="col-sm-6 col-md-4 col-xl-3" key={key}>
                <RctCard>
                  <RctCardContent>
                    <div className="product-image mb-20">
                      <img src={product.thumbnail} alt="product" className="img-fluid" width="300" height="300" />
                    </div>
                    <div className="rpoduct-detail">
                      <h4 className="mb-15">{product.productName}</h4>
                      <h2>${product.sellingPrice}<sup className="super">{product.offer}</sup></h2>
                      <StarRatingComponent
                        name="rate2"
                        editing={false}
                        starCount={5}
                        value={product.ratings}
                        renderStarIcon={() => <i className="zmdi zmdi-star"></i>}
                        renderStarIconHalf={() => <i className="zmdi zmdi-star-half"></i>}
                      />
                      <p>{product.description}</p>
                      <MatButton variant="raised" className="btn-success text-white btn-icon"><i className="ti-shopping-cart-full"></i> <IntlMessages id="components.addToCart" /></MatButton>
                    </div>
                  </RctCardContent>
                </RctCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
