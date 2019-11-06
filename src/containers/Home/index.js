import React from 'react';
import { Button } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  ifPlayWithPerson,
  ifPlayWithAI,
  isHiddenOrNot,
  resetSquares
} from '../../actions/index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import '../index.css';
import Swal from 'sweetalert2';

class Home extends React.PureComponent {
  onPlayWithPerson = () => {
    const { state, history } = this.props;
    const { currentUser } = state;

    if (currentUser === {}) {
      const { ifPlayWithPersonn, isHiddenOrNott, resetSquaress } = this.props;
      resetSquaress();
      ifPlayWithPersonn();
      isHiddenOrNott();
      history.push('/playwithperson');
    } else {
      Swal.fire({
        title: 'Warning!',
        text: 'Bạn chưa đăng nhập, hãy đăng nhập để tiến hành chơi game!',
        type: 'error',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đăng nhập'
      }).then(result => {
        if (result.value) {
          history.push('/signin');
        }
      });
    }
  };

  onPlayWithAI = () => {
    const { state, history } = this.props;
    const { currentUser } = state;

    if (currentUser === {}) {
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
    } else {
      Swal.fire({
        title: 'Warning!',
        text: 'Bạn chưa đăng nhập, hãy đăng nhập để tiến hành chơi game!',
        type: 'error',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đăng nhập'
      }).then(result => {
        if (result.value) {
          history.push('/signin');
        }
      });
    }
  };
  render() {
    return (
      <Router>
        <h1 style={{ textAlign: 'center' }}>
          <b>WELCOME TO CARO GAME PLAY</b>
        </h1>
        <div className="homePage">
          <h6>
            <b>Hãy chọn Chế độ chơi:</b>
          </h6>
          <Button onClick={this.onPlayWithAI} style={{ marginBottom: '20px' }}>
            Đánh với máy
          </Button>
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
