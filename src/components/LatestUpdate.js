import React from 'react';

function LatestUpdate() {
  return (
    <div>
      Exchange rates - last update: <span>{Date(Date.now()).toString()}</span>
    </div>
  );
}

export default LatestUpdate;
