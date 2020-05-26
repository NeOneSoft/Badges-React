import React from 'react';

import './styles/PageError.css';

function PageError(props) {
  // eslint-disable-next-line
  return <div className="PageError">❌{props.error.message}😱</div>;
}

export default PageError;