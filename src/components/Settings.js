import React from 'react';
import Modal from 'react-responsive-modal';
import rateSources from '../const/sources.json';
import { canFetchData } from '../lib/helpers.js';

function keyCheckInfo(txt) {
  return ! txt ? null : <div>{txt}</div>
}

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      infoTxt: '',
      source: this.props.data.source,
      key: this.props.data.key,
    };

    this.saveSettings = this.saveSettings.bind(this)
  }

  onOpenModal = () => {
    this.setState({
      open: true,
      infoTxt: '',

      // Reset these state values back to their parent values
      // This is a bit different from handling for EditCurrencies
      // @TODO - make sure EditCurrencies and Settings components having the same approach
      source: this.props.data.source,
      key: this.props.data.key,
    });
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

  async saveSettings() {

    this.setState({
      infoTxt: '⌛Checking the API Data...'
    })
    const keyGood = await canFetchData(this.state.source, this.state.key);

    if ( rateSources[this.state.source].keyRequired ) {

      // Set infoTxt
      const txt = keyGood
        ? '' // Good key, say nothing
        : '❌ Oh, wrong! Check your key or switch to a source without key'

      this.setState({
        infoTxt: txt
      })

      if ( ! keyGood ) return ''
    }

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

    const sourceInfo = <a href={rateSources[this.state.source].info} target='_blank' rel="noopener noreferrer">Learn more about this source.</a>

    const keyField = ! rateSources[this.state.source].keyRequired
      ? null
      : (
        <>
          <label htmlFor="data-key">Key: </label>
          <input type="text" id="data-key"
          onChange={this.changeKey}
          defaultValue={this.state.key}
          />
          {keyCheckInfo(this.state.infoTxt)}
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
          <br/>

          {sourceInfo}

          <br/><br/>

          {keyField}

          <br/>

          <button onClick={this.onCloseModal}>Cancel</button> | <button onClick={this.saveSettings}>Save</button>
        </Modal>
      </>
    )

  };
}
