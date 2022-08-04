import React, { Component } from 'react';

class Loading extends Component {
  render() {
    return (
      <div data-testid="page-loading" className="loading">
        Carregando...
      </div>
    );
  }
}

export default Loading;
