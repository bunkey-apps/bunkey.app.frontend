/**
 * Interactive List
 */
import React, { Component } from 'react';
import List, { ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, ListItemAvatar } from 'material-ui/List';
import { FormGroup, FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';

// intl messages
import IntlMessages from '../../../../util/IntlMessages';

// rct card box
import RctCollapsibleCard from '../../../../components/RctCollapsibleCard/RctCollapsibleCard';

// Function for interactive List
function generate(element) {
      return [0, 1, 2].map(value =>
            React.cloneElement(element, {
                  key: value,
            }),
      );
}

export default class InteractiveList extends Component {

      state = {
            dense: false,
            secondary: false
      }

      render() {
            const { dense, secondary } = this.state;
            return (
                  <RctCollapsibleCard
                        heading={<IntlMessages id="widgets.InteractiveLists" />}
                  >
                              <FormGroup row>
                                    <FormControlLabel control={
                                          <Checkbox className="text-primary" checked={dense} onChange={(event, checked) => this.setState({ dense: checked })} value="dense" />
                                    } label="Enable dense" />
                                    <FormControlLabel control={
                                          <Checkbox className="text-primary" checked={secondary} onChange={(event, checked) => this.setState({ secondary: checked })} value="secondary" />
                                    } label="Enable secondary text" />
                              </FormGroup>
                              <Grid container>
                                    <Grid item xs={12} md={6}>
                                          <Typography type="title"> Text only </Typography>
                                          <div>
                                                <List dense={dense}>
                                                      {generate(
                                                            <ListItem button>
                                                                  <ListItemText primary="Single-line item" secondary={secondary ? 'Secondary text' : null} />
                                                            </ListItem>
                                                            , )}
                                                </List>
                                          </div>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                          <Typography type="title">Icon with text</Typography>
                                          <div>
                                                <List dense={dense}>
                                                      {generate(
                                                            <ListItem button><ListItemIcon><i className="zmdi zmdi-folder text-primary"></i></ListItemIcon><ListItemText primary="Single-line item" secondary={secondary ? 'Secondary text' : null} />
                                                            </ListItem>,
                                                      )}
                                                </List>
                                          </div>
                                    </Grid>
                              </Grid>
                              <Grid container>
                                    <Grid item xs={12} md={6}>
                                          <Typography type="title">Avatar with text</Typography>
                                          <div>
                                                <List dense={dense}>
                                                      {generate(
                                                            <ListItem button>
                                                                  <ListItemAvatar>
                                                                        <Avatar className="bg-primary"><i className="zmdi zmdi-star"></i></Avatar>
                                                                  </ListItemAvatar>
                                                                  <ListItemText primary="Single-line item" secondary={secondary ? 'Secondary text' : null} />
                                                            </ListItem>,
                                                      )}
                                                </List>
                                          </div>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                          <Typography type="title">
                                                Avatar with text and icon
                                          </Typography>
                                          <div>
                                                <List dense={dense}>
                                                      {generate(
                                                            <ListItem button>
                                                                  <ListItemAvatar>
                                                                        <Avatar className="bg-primary"><i className="zmdi zmdi-star"></i></Avatar>
                                                                  </ListItemAvatar>
                                                                  <ListItemText primary="Single-line item" secondary={secondary ? 'Secondary text' : null} />
                                                                  <ListItemSecondaryAction>
                                                                        <IconButton aria-label="Delete"><i className="zmdi zmdi-delete text-primary"></i></IconButton>
                                                                  </ListItemSecondaryAction>
                                                            </ListItem>,
                                                      )}
                                                </List>
                                          </div>
                                    </Grid>
                              </Grid>
                  </RctCollapsibleCard>
            );
      }
}
