import React from 'react';
import Currency from './Currency/Currency.js';
import {getAvailCurrencies} from '../lib/rates.js';
import Modal from 'react-responsive-modal';

class EditCurrencies extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false, // state for Modal
      selectedCurrencies: [] // see getDerivedStateFromProps()
    };
  }

  static getDerivedStateFromProps(props, state) {
    // Any time props change and when the model is NOT open,
    // update selectedCurrencies state from props.data 
    const {baseCurrency, changeCurrencies} = props.data;
    const selectedCurrencies = [baseCurrency, ...changeCurrencies]
    if ( state.open ) {
      return null
    } else {
      return {
        selectedCurrencies: selectedCurrencies, // TEMP @todo
      };
    }
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

  render() {
    const availCurrencies = getAvailCurrencies();
    const { selectedCurrencies } = this.state;
    const printSelectedCurrencies = selectedCurrencies.map(code => {
      return (
        <li onClick={() => this.addRemove(code)}>
          <Currency code={code}/> ⭐
        </li>
      );
    })

    const printAvailCurrencies = availCurrencies.map(code => {
      if ( selectedCurrencies.indexOf(code) !== -1 ) {
        return null;
      }
      return (
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
          <ol>
            {printSelectedCurrencies}
          </ol>
          <hr/>
          <ol>
            {printAvailCurrencies}
          </ol>
        </Modal>
      </>
    )

  };
}

export default EditCurrencies;
