/**
 * Quick Links
 */
import React from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Link } from 'react-router-dom';

// intl messages
import IntlMessages from '../../util/IntlMessages';

const QuickLinks = () => (
    <UncontrolledDropdown nav className="list-inline-item rct-dropdown tour-step-1">
        <DropdownToggle caret nav className="dropdown-group-link">
            <i className="ti-link"></i> <IntlMessages id="widgets.QuickLinks" />
        </DropdownToggle>
        <DropdownMenu className="mt-15" right>
            <ul className="list-unstyled mb-0">
                <li>
                    <Link to="/app/pages/report">
                        <i className="ti-notepad"></i>
                        <IntlMessages id="sidebar.report" />
                    </Link>
                </li>
                <li>
                    <Link to="/app/tables/react-table">
                        <i className="ti-layout"></i>
                        <IntlMessages id="sidebar.reactTable" />
                    </Link>
                </li>
                <li>
                    <Link to="/app/users/user-management">
                        <i className="ti-settings"></i>
                        <IntlMessages id="sidebar.userManagement" />
                    </Link>
                </li>
                <li>
                    <Link to="/app/ecommerce/invoice">
                        <i className="ti-agenda"></i>
                        <IntlMessages id="sidebar.invoice" />
                    </Link>
                </li>
                <li>
                    <Link to="/app/mail/folder/inbox">
                        <i className="ti-email"></i>
                        <IntlMessages id="sidebar.inbox" />
                    </Link>
                </li>
                <li>
                    <Link to="/app/calendar/basic">
                        <i className="ti-calendar"></i>
                        <IntlMessages id="sidebar.calendar" />
                    </Link>
                </li>
            </ul>
        </DropdownMenu>
    </UncontrolledDropdown>
);

export default QuickLinks;
