import React from 'react';
import Square from './Square';

class Board extends React.Component {
  renderSquare = i => {
    const { winSquares, squares, onHandleClick } = this.props;
    if (winSquares.length === 0) {
      return (
        <Square
          key={i}
          styles="white"
          value={squares[i]}
          onClick={() => onHandleClick(i)}
        />
      );
    }

    let check = false;
    winSquares.forEach(element => {
      if (element === i) {
        check = true;
      }
    });
    if (check) {
      return (
        <Square
        key={i}
          styles="red"
          value={squares[i]}
          onClick={() => onHandleClick(i)}
        />
      );
    } 
      return (
        <Square
        key={i}
          styles="white"
          value={squares[i]}
          onClick={() => onHandleClick(i)}
        />
      );
    
  };

  render() {
    // console.log('winSquares', this.props.winSquares);

    let items = [];
    const listItems = [];
    for (let i = 0; i < 20; i+=1) {
      for (let j = 20 * i; j < 20 * (i + 1); j+=1) {
        items.push(this.renderSquare(j));
      }
      listItems.push(<div key={i} className="board-row">{items}</div>);
      items = [];
    }

    return (
      <div>
        <div>{listItems}</div>
      </div>
    );
  }
}
export default Board;
