import React from 'react';

export default class LastFetchTime extends React.Component {

  render() {

    return ( this.props.time )
      ? (
          <div>
              Exchange rates - last update: <span>{new Date(this.props.time).toString()}</span>
          </div>
        )
      : null

  }

}
