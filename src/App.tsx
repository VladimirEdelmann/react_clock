import { Component } from 'react';
import { Clock } from './components/Clock';
import './App.scss';

interface State {
  clockName: string
  hasClock: boolean
  timerId: number
}

const getRandomName = (): string => {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
};

export class App extends Component<{}, State> {
  state = {
    clockName: 'Clock-0',
    hasClock: true,
    timerId: 0,
  };

  componentDidMount() {
    this.setState({
      timerId: window.setInterval(() => {
        this.setState({
          clockName: getRandomName(),
        });
      }, 3300),
    });

    document.addEventListener('contextmenu', this.handleContextMenuClick);
    document.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    window.clearInterval(this.state.timerId);

    document.removeEventListener('click', this.handleClick);
    document.removeEventListener('contextmenu', this.handleContextMenuClick);
  }

  handleContextMenuClick = (event: MouseEvent) => {
    event.preventDefault();

    this.setState({
      hasClock: false,
    });
  };

  handleClick = () => {
    this.setState({
      hasClock: true,
    });
  };

  render() {
    return (
      <div className="App">
        <h1>React clock</h1>

        {this.state.hasClock && (
          <Clock clockName={this.state.clockName} />
        )}
      </div>
    );
  }
}
