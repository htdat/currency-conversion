import React from 'react';

class Currency extends React.Component {
  render() {
    return (
      <div className="Currency">
        <span className="Flag">🇺🇸</span>
        <span className="Code">USD</span>
        <span className="Country">United States</span>
      </div>
    );
  }
}

export default Currency;
