import React from 'react';
import Currency from './Currency/Currency.js';
import {getAvailCurrencies} from '../lib/helpers.js';
import Modal from 'react-responsive-modal';
import currencyNames from '../constants/currencies.json'

class EditCurrencies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false, // state for Modal
      selectedCurrencies: [], // see getDerivedStateFromProps()
      displayCurrencies: getAvailCurrencies()
    };
  }

  static getDerivedStateFromProps(props, state) {
    // Any time props change and when the model is NOT open,
    // update selectedCurrencies state from props.data
    const {baseCurrency, changeCurrencies} = props.data;

    return state.open
      ? null
      : { selectedCurrencies: [baseCurrency, ...changeCurrencies], }
  }

  onOpenModal = () => {
    this.setState({
      open: true,
      displayCurrencies: getAvailCurrencies(),
    });
  };

  onCloseModal = () => {
    this.props.updateCurrencies(this.state.selectedCurrencies);
    this.setState({
      open: false,
    });
  };

  addRemove = (code) => {
    const currencies = this.state.selectedCurrencies;

    if ( currencies.includes(code) ) {
      // Remove this code if it exists in the current selected currencies
      // Do not let it less than 2 currencies too
      if ( currencies.length > 2 ) currencies.splice( currencies.indexOf(code), 1);
    } else {
      // Otherwise, add it
      currencies.push(code)
    }

    this.setState({
      selectedCurrencies: currencies
    })

  }

  search = (e) => {

    const availCurrencies = getAvailCurrencies();
    const regex = new RegExp(e.target.value.toLowerCase())

    const result = availCurrencies.filter(code => {
      const text = (code + ' ' + currencyNames[code]).toLowerCase();
      return regex.test(text)
    })

    this.setState({
      displayCurrencies: result
    })

  }

  render() {
    const { selectedCurrencies, displayCurrencies, open } = this.state;

    const printSelectedCurrencies = selectedCurrencies.map(code => {
      return displayCurrencies.includes(code) && (
        <li className="selected-currency" key={code} onClick={() => this.addRemove(code)}>
          <Currency code={code}/> <span role="img" aria-label="selected">★</span>
        </li>
        );
    })

    const printOtherCurrencies = displayCurrencies.map(code => {
      return ! selectedCurrencies.includes(code) && (
          <li key={code} onClick={() => this.addRemove(code)}>
            <Currency code={code} /> 
          </li>
        );
    })

    return (
      <>
        <button onClick={this.onOpenModal}>Edit Currencies</button>
        <Modal open={open} onClose={this.onCloseModal}>
          <h1>Select currencies</h1>
          <input type="text" placeholder="Search currencies" onChange={this.search}/>
          <ul className="edit-currencies">
            {printSelectedCurrencies}
            {printOtherCurrencies}
          </ul>
        </Modal>
      </>
    )

  };
}

export default EditCurrencies;
