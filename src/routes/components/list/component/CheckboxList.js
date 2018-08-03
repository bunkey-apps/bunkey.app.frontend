/**
 * Checkbox List Component
 */
import React, { Component } from 'react';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import { Scrollbars } from 'react-custom-scrollbars';

// intl messages
import IntlMessages from '../../../../util/IntlMessages';

// rct card box
import RctCollapsibleCard from '../../../../components/RctCollapsibleCard/RctCollapsibleCard';

const listItems = [
    {
        itemName: 'Facebook',
        status: false,
        icon: 'zmdi zmdi-facebook zmdi-hc-lg'
    },
    {
        itemName: 'Google PLus',
        status: false,
        icon: 'zmdi zmdi-google zmdi-hc-lg'
    },
    {
        itemName: 'Twitter',
        status: false,
        icon: 'zmdi zmdi-twitter zmdi-hc-lg'
    },
    {
        itemName: 'RSS',
        status: false,
        icon: 'zmdi zmdi-rss zmdi-hc-lg'
    },
    {
        itemName: 'Android',
        status: false,
        icon: 'zmdi zmdi-android zmdi-hc-lg'
    }
]

class CheckboxListComponent extends Component {
    // Interactive State
    state = {
        listItems
    };
    handleToggleListItems(key) {
        let items = this.state.listItems;
        items[key].status = !items[key].status;
        this.setState({ [listItems]: items });
    }

    render() {
        return (
            <RctCollapsibleCard
                heading={<IntlMessages id="widgets.checkboxListControl" />}
            >
                <Scrollbars autoHeight autoHeightMin={100} autoHeightMax={260} autoHide>
                    <List>
                        {this.state.listItems.map((data, key) => (
                            <ListItem button onClick={() => this.handleToggleListItems(key)} key={key}>
                                <Checkbox checked={data.status} disableRipple />
                                <ListItemText primary={data.itemName} />
                                <ListItemSecondaryAction>
                                    <IconButton className="text-indigo"><i className={data.icon}></i></IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </Scrollbars>
            </RctCollapsibleCard>
        );
    }
}

export default CheckboxListComponent;