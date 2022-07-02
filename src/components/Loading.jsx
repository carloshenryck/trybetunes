import React from 'react';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';

import '../styles/loading.css';

class Loading extends React.Component {
  render() {
    const { type, color, height, width, textcolor, fontSize } = this.props;

    return (
      <div className="loading">
        <p style={ { color: textcolor, fontSize } }>Carregando...</p>
        <ReactLoading
          type={ type }
          color={ color }
          height={ height }
          width={ width }
          textcolor={ textcolor }
        />
      </div>
    );
  }
}

Loading.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  textColor: PropTypes.string,
}.required;

export default Loading;
