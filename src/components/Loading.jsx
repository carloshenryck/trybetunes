import React from 'react';
import ReactLoading from 'react-loading';

import '../styles/loading.css';

class Loading extends React.Component {
  render() {
    return (
      <div className="loading">
        <h1>Carregando...</h1>
        <ReactLoading type="spin" color="black" size="small" />
      </div>
    );
  }
}

export default Loading;
