/**
 * Rct Collapsible Card
 */
/* eslint-disable */
import React, { Component, Fragment } from 'react';
import { Collapse } from 'reactstrap';
import classnames from 'classnames';

// rct section loader
import RctSectionLoader from '../RctSectionLoader/RctSectionLoader';

class RctCollapsibleCard extends Component {

    state = {
        reload: false,
        collapse: true,
        close: false
    }

    onCollapse() {
        this.setState({ collapse: !this.state.collapse });
    }

    onReload() {
        this.setState({ reload: true });
        let self = this;
        setTimeout(() => {
            self.setState({ reload: false });
        }, 1500);
    }

    onCloseSection() {
        this.setState({ close: true });
    }

    render() {
        const { close, reload, collapse } = this.state;
        const { children, collapsible, closeable, reloadable, heading, fullBlock, colClasses, customClasses, headingCustomClasses, contentCustomClasses } = this.props;
        return (
            <div className={colClasses ? colClasses : ''}>
                <div className={classnames(`rct-block ${customClasses ? customClasses : ''}`, { 'd-none': close })}>
                    {heading &&
                        <div className={`rct-block-title ${headingCustomClasses ? headingCustomClasses : ''}`}>
                            <h4>{heading}</h4>
                            <div className="contextual-link">
                                {collapsible && <a href="javascript:void(0)" onClick={() => this.onCollapse()}><i className="ti-minus"></i></a>}
                                {reloadable && <a href="javascript:void(0)" onClick={() => this.onReload()}><i className="ti-reload"></i></a>}
                                {closeable && <a href="javascript:void(0)" onClick={() => this.onCloseSection()}><i className="ti-close"></i></a>}
                            </div>
                        </div>
                    }
                    <Collapse isOpen={collapse}>
                        <div className={classnames(contentCustomClasses ? contentCustomClasses : '', { "rct-block-content": !fullBlock, 'rct-full-block': fullBlock })}>
                            {children}
                        </div>
                    </Collapse>
                    {reload && <RctSectionLoader />}
                </div>
            </div>
        );
    }
}

export default RctCollapsibleCard;
