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

class Home extends React.PureComponent {
  onPlayWithPersonClick = () => {
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
    history.push('/playwithperson');
  };
  render() {
    return (
      <Router>
        <div style={{ marginBottom: '100px' }}>
          <h6>
            <b>Hãy chọn Chế độ chơi:</b>
          </h6>
          <Button onClick={this.onPlayWithAI}>Đánh với máy</Button>
          <br></br>
          <Button onClick={this.onPlayWithPersonClick}>Đánh với người</Button>
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
