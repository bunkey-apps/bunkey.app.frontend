/**
 * Faq Page
 */
import React, { Component } from 'react';
import ExpansionPanel, { ExpansionPanelDetails, ExpansionPanelSummary } from 'material-ui/ExpansionPanel';
import axios from 'axios';

// app config
import AppConfig from '../../../constants/AppConfig';

//Components
import SearchIdeas from './components/SearchIdeas';

class Faq extends Component {

  state = {
    faqs: null
  }

  componentWillMount() {
    this.getFaqs();
  }

  // get faqs
  getFaqs() {
    axios.get(`${AppConfig.appUrl}/data/faqs.js`)
      .then((response) => {
        this.setState({ faqs: response.data });
      })
      .catch(error => {
        // error handling
      })
  }

  render() {
    const { faqs } = this.state;
    return (
      <div className="faq-page-wrapper">
        <SearchIdeas />
        <div className="row row-eq-height">
          {faqs && faqs.map((faq, key) => (
            <div className="col-md-6" key={key} >
              <ExpansionPanel className="mb-30 panel" defaultExpanded>
                <ExpansionPanelSummary expandIcon={<i className="zmdi zmdi-chevron-down"></i>} className="m-0 panel-heading">
                  <h4>{faq.title}</h4>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <p>
                    {faq.content}
                  </p>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default Faq;
