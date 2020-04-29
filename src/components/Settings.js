import React from 'react';
import Modal from 'react-responsive-modal';
import rateSources from '../const/sources.json';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      source: this.props.data.source,
      key: this.props.data.key,
    };
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  changeSource = (event) => {
    this.setState({source: event.target.value});
  };

  changeKey = (event) => {
    this.setState({key: event.target.value});
  };

  saveSettings = () => {

    this.props.saveAppSettings({
      source: this.state.source,
      key: this.state.key,
    });

    this.onCloseModal();

  }

  render() {
    const { open, source } = this.state;

    const options = Object.keys(rateSources).map( item => {
      const keyInfo = rateSources[item].keyRequired ? '(free - key required)' : '(free - no key)'
      return (
        <option value={item} key={item}>
            {rateSources[item].name} {keyInfo}
        </option>
      )
    });

    const keyField = ! rateSources[this.state.source].keyRequired
      ? null
      : (
        <>
          <label htmlFor="data-key">Key: </label>
          <input type="text" id="data-key"
          onChange={this.changeKey}
          defaultValue={this.state.key}
          />
        </>
      )

    return (
      <>
        <button onClick={this.onOpenModal}>
          Settings
        </button>
        <Modal open={open} onClose={this.onCloseModal}>
          <h1>Settings</h1>
          <label htmlFor="data-source">Source: </label>
          <select id="data-source" value={source} onChange={this.changeSource}>
            {options}
          </select>
          <br/><br/>

          {keyField}

          <br/><br/>

          <button onClick={this.onCloseModal}>Cancel</button> |
          <button onClick={this.saveSettings}>Save</button>
        </Modal>
      </>
    )

  };
}
