import React from 'react';

class Botao extends React.Component {
  render() {
    const backgroundColor = 'red'
    return (
      <button style={{
        backgroundColor
      }}>
        Botão
      </button>
    )
  }
}

export default Botao;