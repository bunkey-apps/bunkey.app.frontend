/**
 * Tour Component
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Joyride from 'react-joyride';
import $ from 'jquery';

// app config
import AppConfig from '../../constants/AppConfig';

export default class TourComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      running: false,
      steps: [
        {
          title: 'Quick Links',
          text: 'Use this to quickly navigate to frequently used pages.',
          textAlign: 'left',
          selector: '.tour-step-1',
          position: 'bottom'
        },
        {
          title: 'Summary',
          text: 'Quickly become aquainted with your platform.',
          textAlign: 'left',
          selector: '.tour-step-2',
          position: 'right'
        },
        {
          title: 'Upgrade Plan',
          text: 'Upgrade to your preferred subscription plan.',
          textAlign: 'left',
          selector: '.tour-step-3',
          position: 'bottom'
        },
        {
          title: 'Multi Languages',
          text: 'Switch to your preferred language.',
          textAlign: 'left',
          selector: '.tour-step-4',
          position: 'left'
        },
        {
          title: 'Theme Options',
          text: 'Customise your dashboard with theme settings.',
          textAlign: 'left',
          selector: '.tour-step-5',
          position: 'left'
        },
        {
          title: 'Dynamic Breadcrumbs',
          text: 'Dynamic breadcrumbs to go back to your required page.',
          textAlign: 'left',
          selector: '.tour-step-6',
          position: 'left'
        },
        {
          title: 'Dynamic To do List',
          text: 'Fully functional widget with working add, delete, refresh and cancel buttons.',
          textAlign: 'left',
          selector: '.tour-step-7',
          position: 'left'
        }
      ],
      step: 0,
    };
    this.handleNextButtonClick = this.handleNextButtonClick.bind(this);
    this.handleJoyrideCallback = this.handleJoyrideCallback.bind(this);
  }

  // static props type for joyride (tour)
  static propTypes = {
    joyride: PropTypes.shape({
      autoStart: PropTypes.bool,
      callback: PropTypes.func,
      run: PropTypes.bool,
    }),
  };

  // set defaultProps for joyride (tour)
  static defaultProps = {
    joyride: {
      autoStart: false,
      resizeDebounce: false,
      run: false,
    },
  };

  // component life cycle hook to set the state when component is mounted
  componentDidMount() {
    if (window.outerWidth > 575) {
      this.setState({
        running: AppConfig.enableUserTour,
        step: 0
      });
    } else {
      this.setState({
        running: false,
        step: 0,
      });
    }

    // setup tour first
    this.joyride.addTooltip({
      title: 'The classic joyride',
      text: 'Let\'s go on a magical tour! Just click the big orange button.',
      selector: '.hero__tooltip',
      position: 'bottom',
      event: 'click',
      style: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        borderRadius: 0,
        color: '#fff',
        mainColor: '#5C6AC4',
        textAlign: 'left',
        width: '25rem'
      }
    });

    // setup tour second
    this.joyride.addTooltip({
      title: 'A fixed tooltip',
      text: 'For fixed elements, you know?',
      selector: '.demo__footer img',
      position: 'top',
      isFixed: true,
      event: 'hover',
      style: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 0,
        color: '#333',
        textAlign: 'left',
        width: '25rem'
      }
    });
  }

  // joyride next button click handler
  handleNextButtonClick() {
    if (this.state.step === 1) {
      this.joyride.next();
    }
  }

  // joyride callback function
  handleJoyrideCallback(result) {
    const { joyride } = this.props;

    if (result.type === 'step:before') {
      // Keep internal state in sync with joyride
      this.setState({ step: result.index });
    }

    if (result.type === 'finished' && this.state.running) {
      // Need to set our running state to false, so we can restart if we click start again.
      this.setState({ running: false });
    }

    if (result.type === 'error:target_not_found') {
      this.setState({
        step: result.action === 'back' ? result.index - 1 : result.index + 1,
        autoStart: result.action !== 'close' && result.action !== 'esc',
      });
    }

    if (typeof joyride.callback === 'function') {
      joyride.callback();
    }
  }

  render() {
    if(this.state.step <= this.state.steps.length) {
      $('body').css('overflow', '');
    } else {
      $('body').css('overflow', 'hidden');
    }
    const { joyride } = this.props;
    const joyrideProps = {
      autoStart: true,
      callback: this.handleJoyrideCallback,
      debug: false,
      disableOverlay: this.state.step === 1,
      resizeDebounce: joyride.resizeDebounce,
      run: joyride.run || this.state.running,
      scrollToFirstStep: joyride.scrollToFirstStep || true,
      stepIndex: joyride.stepIndex || this.state.step,
      steps: joyride.steps || this.state.steps,
      type: joyride.type || 'continuous',
      showSkipButton: true,
      scrollToSteps: false
    };
    return (
      <Joyride
        {...joyrideProps}
        ref={c => (this.joyride = c)} />
    )
  }
}
