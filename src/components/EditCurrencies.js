import React from 'react';
import Currency from './Currency/Currency.js';
import {getAvailCurrencies} from '../lib/rates.js';
import Modal from 'react-responsive-modal';
import currencyNames from '../const/currencies.json';



class EditCurrencies extends React.Component {
  constructor(props) {
    super(props);

    this.availCurrencies = getAvailCurrencies();

    this.state = {
      open: false, // state for Modal
      selectedCurrencies: [], // see getDerivedStateFromProps()
      displayCurrencies: this.availCurrencies
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
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.props.updateCurrencies(this.state.selectedCurrencies);
    this.setState({ open: false });
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

    const availCurrencies = this.availCurrencies;
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
    const { selectedCurrencies, displayCurrencies } = this.state;

    const printSelectedCurrencies = selectedCurrencies.map(code => {
      return ! displayCurrencies.includes(code)
        ? null
        :  (
        <li onClick={() => this.addRemove(code)}>
          <Currency code={code}/> ⭐
        </li>
        );
    })

    const printOtherCurrencies = displayCurrencies.map(code => {
      return selectedCurrencies.includes(code)
        ? null
        : (
          <li onClick={() => this.addRemove(code)}>
            <Currency code={code} />
          </li>
        );
    })

    const { open } = this.state;

    return (
      <>
        <button onClick={this.onOpenModal}>Add / Remove / Settings</button>
        <Modal open={open} onClose={this.onCloseModal} center>
          <h1>Select currencies</h1>
          <input type="text" placeHolder="Search currencies" onChange={this.search}/>
          <ol>
            {printSelectedCurrencies}
            {printOtherCurrencies}
          </ol>
        </Modal>
      </>
    )

  };
}

export default EditCurrencies;
