import React from "react";

class Square extends React.PureComponent {
    render() {
      const {styles, onClick, value} = this.props;
      return (
        <button type = "button" style={{background: styles}} className="square" onClick={onClick}>
          {value}
        </button>
      );
    }
}
export default Square;
