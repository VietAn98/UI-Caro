import React from 'react';
import { Icon, Button } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  ifPlayWithPerson,
  ifPlayWithAI,
  isHiddenOrNot,
  resetSquares
} from '../../actions/index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../index.css'

class Home extends React.PureComponent {
  onPlayWithPerson = () => {
    const {
      ifPlayWithPersonn,
      history,
      isHiddenOrNott,
      resetSquaress
    } = this.props;
    resetSquaress();
    ifPlayWithPersonn();
    isHiddenOrNott();
    history.push('/playwithperson');
  };

  onPlayWithAI = () => {
    const {
      ifPlayWithAIs,
      isHiddenOrNott,
      history,
      resetSquaress
    } = this.props;
    resetSquaress();
    ifPlayWithAIs();
    isHiddenOrNott();
    history.push('/playwithai');
  };
  render() {
    return (
      <Router>
        <div className="homePage">
          <h6>
            <b>Hãy chọn Chế độ chơi:</b>
          </h6>
          <Button onClick={this.onPlayWithAI}>Đánh với máy</Button>
          <br></br>
          <Button onClick={this.onPlayWithPerson}>Đánh với người</Button>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  state: state.appReducer
});

const mapDispatchToProps = dispatch => ({
  ifPlayWithPersonn: () => dispatch(ifPlayWithPerson()),
  ifPlayWithAIs: () => dispatch(ifPlayWithAI()),
  isHiddenOrNott: () => dispatch(isHiddenOrNot()),
  resetSquaress: () => dispatch(resetSquares())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Home));
