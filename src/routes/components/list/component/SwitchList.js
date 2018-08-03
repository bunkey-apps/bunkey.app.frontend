/**
 * Switch List Component
 */
import React, { Component } from 'react';
import List, { ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader } from 'material-ui/List';
import Switch from 'material-ui/Switch';

// intl messages
import IntlMessages from '../../../../util/IntlMessages';

// rct card box
import RctCollapsibleCard from '../../../../components/RctCollapsibleCard/RctCollapsibleCard';

const items = [
    {
        name: 'Wi-Fi',
        status: false,
        icon: 'zmdi zmdi-wifi-alt zmdi-hc-lg'
    },
    {
        name: 'bluetooth',
        status: false,
        icon: 'zmdi zmdi-bluetooth-setting zmdi-hc-lg'
    },
    {
        name: 'dark-mode',
        status: false,
        icon: 'zmdi zmdi-tonality zmdi-hc-lg'
    },
    {
        name: 'brightness',
        status: false,
        icon: 'zmdi zmdi-brightness-7 zmdi-hc-lg'
    }
]

class SwitchListComponent extends Component {
    // Interactive State
    state = {
        items,
        checked: [0]
    };

    handleToggle(key) {
        let items = this.state.items;
        items[key].status = !items[key].status;
        this.setState({ items });
    }

    render() {
        return (
            <RctCollapsibleCard
                heading={<IntlMessages id="widgets.switchLists" />}
            >
                <List subheader={<ListSubheader>Settings</ListSubheader>}>
                    {this.state.items.map((data, key) => (
                        <ListItem key={key}>
                            <ListItemIcon><i className={data.icon}></i></ListItemIcon>
                            <ListItemText primary={data.name} />
                            <ListItemSecondaryAction>
                                <Switch onChange={() => this.handleToggle(key)} checked={data.status} />
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </RctCollapsibleCard>
        );
    }
}

export default SwitchListComponent;