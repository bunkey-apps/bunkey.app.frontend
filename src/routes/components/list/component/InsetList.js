/**
 * Inset List
 */
import React from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

// intl messages
import IntlMessages from '../../../../util/IntlMessages';

// rct card box
import RctCollapsibleCard from '../../../../components/RctCollapsibleCard/RctCollapsibleCard';

const InsetList = () => (
    <RctCollapsibleCard
        heading={<IntlMessages id="widgets.insetLists" />}
    >
        <List className="m-0">
            <ListItem button>
                <Avatar className="bg-warning"><i className="zmdi zmdi-star zmdi-hc-lg"></i></Avatar>
                <ListItemText inset primary="Chelsea Otakan" />
            </ListItem>
            <ListItem button>
                <Avatar className="bg-primary"><i className="zmdi zmdi-account-circle zmdi-hc-lg"></i></Avatar>
                <ListItemText inset primary="Jhon Otakan" />
            </ListItem>
            <ListItem button>
                <ListItemText inset primary="Eric Hoffman" />
            </ListItem>
            <ListItem button>
                <Avatar className="bg-danger"><i className="zmdi zmdi-attachment-alt zmdi-hc-lg"></i></Avatar>
                <ListItemText inset primary="Roze Smith" />
            </ListItem>
        </List>
    </RctCollapsibleCard>
);

export default InsetList;
