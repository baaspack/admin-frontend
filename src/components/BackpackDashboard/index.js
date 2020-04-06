import React, { Component } from 'react';
import apiClient from '../../lib/apiClient';

import BackpackList from '../BackpackList';
import BackpackAddFormToggle from '../BackpackAddFormToggle';
import Terminal from '../Terminal';

class BackpackDashboard extends Component {
  state = {
    backpacks: [],
    stackInTerminal: undefined,
    terminalMessages: {},
  };

  componentDidMount() {
    apiClient.send('GET', 'backpacks')
      .then(({ backpacks }) => {
        this.setState({
          backpacks,
        })
      });

    this.ws = apiClient.getWebsocket();

    this.ws.onmessage = (e) => {
      const { stack, message } = JSON.parse(e.data);

      this.setState({
        stackInTerminal: stack,
      });

      this.setState((prevState) => {
        const { [stack]: prevMessages, ...others } = prevState.terminalMessages;

        const newMessages = prevMessages ? [...prevMessages, message] : [message];

        const newTerminalMessages = { ...others, [stack]: newMessages };

        return {
          terminalMessages: newTerminalMessages,
        }
      })
    }
  };

  componentWillUnmount() {
    this.ws.close(1000, 'page_change');
  };

  addBackpack = (backpackName) => {
    const { handleFlash } = this.props;

    return apiClient.send('POST', 'backpacks', { name: backpackName })
      .then(({ message, backpack }) => {
        this.setState((prevState) => (
          {
            backpacks: [...prevState.backpacks, backpack]
          }
        ));

        handleFlash({ type: 'ok', message });

        return true;
      })
      .catch((message) => {
        handleFlash({ type: 'error', message });

        return false;
      });
  };

  deleteBackpack = (backpackId) => {
    const { handleFlash } = this.props;

    apiClient.send('DELETE', `backpacks/${backpackId}`)
      .then(({ id }) => {
        this.setState((prevState) => {
          const newBackpacks = prevState.backpacks.filter((backpack) => backpack.id !== id);

          return {
            backpacks: newBackpacks,
          };
        });
      })
      .catch((message) => {
        console.log(message);
        handleFlash({ type: 'error', message });
      });
  };

  hideTerminal = () => {
    this.setState({
      stackInTerminal: undefined,
    });
  };

  render() {
    const { backpacks, terminalMessages, stackInTerminal } = this.state;

    return (
      <div className="backpack-dashboard">
        {stackInTerminal && <Terminal terminalMessages={terminalMessages[stackInTerminal]} onTerminalClick={this.hideTerminal} />}
        <BackpackList backpacks={backpacks} onDeleteClick={this.deleteBackpack} />
        <BackpackAddFormToggle onAddSubmit={this.addBackpack} />
      </div>
    )
  }
};

export default BackpackDashboard;
