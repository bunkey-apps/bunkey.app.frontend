/**
 * Uncontrolled ALerts
 */
import React from 'react';
import { UncontrolledAlert } from 'reactstrap';

// intl messages
import IntlMessages from '../../../../util/IntlMessages';

// rct card box
import RctCollapsibleCard from '../../../../components/RctCollapsibleCard/RctCollapsibleCard';

const UncontrolledAlerts = () => (
    <RctCollapsibleCard
        heading={<IntlMessages id="widgets.uncontrolledDisableAlerts" />}
    >
        <UncontrolledAlert color="primary">
            I am an alert and I can be dismissed!
        </UncontrolledAlert>
    </RctCollapsibleCard>
);

export default UncontrolledAlerts;
