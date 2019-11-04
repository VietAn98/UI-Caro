import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Icon, Button, Form, Input } from 'antd';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import App from './App';
import SignIn from './containers/SignIn';
import Register from './containers/Register';
import Update from './containers/SignIn/update';
import { logoutUser, fetchProfile, resetSquares } from './actions';

const jwt = require('jsonwebtoken');

class Game extends React.PureComponent {
  componentDidMount = () => {
    const { fetchedProfile } = this.props;
    fetchedProfile();
    console.log('/me');
  };

  handleClick = e => {
    e.preventDefault();
    localStorage.removeItem('token');
    const { userLogout, resetSquaress } = this.props;
    userLogout();
    resetSquaress();
  };

  render() {
    const tokenn = localStorage.token;

    if (tokenn != null) {
      const { state } = this.props;
      const { currentUser } = state;
      console.log('state', state);

      // const decodeToken = jwt.decode(tokenn);
      // console.log('state.currentUser.username', currentUser.username);
      return (
        <Router>
          <div className="container">
            <div className="listDisplay">
              <ul style={{ listStyleType: 'none', fontSize: '20px' }}>
                {currentUser.username !== '' ? (
                  <li>
                    <Icon type="user" /> {currentUser.username}
                  </li>
                ) : null}
                <li>
                  <Link to="/">
                    <Icon
                      type="home"
                      style={{ color: 'rgba(103, 166, 128)' }}
                    />{' '}
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link to="/updateProfile">
                    <Icon
                      type="setting"
                      style={{ color: 'rgba(250, 147, 207)' }}
                    />{' '}
                    Cập nhập thông tin
                  </Link>
                </li>
                <li>
                  <Button type="dashed" onClick={this.handleClick}>
                    Đăng xuất
                  </Button>
                </li>
              </ul>
            </div>
            {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
            <div className="actionDisplay">
              <Switch>
                <Route path="/updateProfile">
                  <Update />
                </Route>
                <Route path="/register">
                  <Register />
                </Route>
                <Route path="/signin">
                  <SignIn />
                </Route>
                <Route path="/">
                  <App />
                </Route>
              </Switch>
            </div>
          </div>
          <br />
        </Router>
      );
    }
    return (
      <Router>
        <div className="container">
          <div className="listDisplay">
            <ul style={{ listStyleType: 'none', fontSize: '20px' }}>
              <li>
                <Link to="/">
                  <Icon type="home" /> Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <Icon type="smile" theme="twoTone" twoToneColor="#eb2f96" />{' '}
                  Đăng ký
                </Link>
              </li>
              <li>
                <Link to="/signin">
                  <Icon type="heart" theme="twoTone" twoToneColor="#52c41a" />{' '}
                  Đăng nhập
                </Link>
              </li>
            </ul>
          </div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <div className="actionDisplay">
            <Switch>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/signin">
                <SignIn />
              </Route>
              <Route path="/">
                <App />
              </Route>
            </Switch>
          </div>
        </div>
        <br />
      </Router>
    );
  }
}
const mapStateToProps = state => ({
  state: state.appReducer
});
const mapDispatchToProps = dispatch => ({
  fetchedProfile: () => dispatch(fetchProfile()),
  userLogout: () => dispatch(logoutUser()),
  resetSquaress: () => dispatch(resetSquares())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
