/**
 * Product Report Widget
 */
import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import { Scrollbars } from 'react-custom-scrollbars';
import axios from 'axios';

// app config
import AppConfig from '../../constants/AppConfig';

class ProductReportsWidget extends Component {

    state = {
        products: null
    }

    componentWillMount() {
        this.getProductsReports();
    }

    // get products reports
    getProductsReports() {
        axios.get(`${AppConfig.appUrl}/data/productsReports.js`)
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
            <Scrollbars autoHeight autoHeightMin={100} autoHeightMax={410} autoHide>
                <ul className="list-group">
                    {products && products.map((product, key) => (
                        <li className="list-group-item d-flex justify-content-between" key={key}>
                            <div className="media">
                                <div className="media-left mr-15">
                                    <img src={product.photoUrl} alt="project logo" className="media-object" width="40" height="40" />
                                </div>
                                <div className="media-body">
                                    <span className="d-block fs-14">{product.name}</span>
                                    <span className="d-block fs-12 text-muted">{product.date}</span>
                                </div>
                            </div>
                            <IconButton className="import-report">
                                <i className="ti-import"></i>
                            </IconButton>
                        </li>
                    ))}
                </ul>
            </Scrollbars>
        );
    }
}

export default ProductReportsWidget;
