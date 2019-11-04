import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Icon, Button } from 'antd';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import App from './App';
import SignIn from './containers/SignIn';
import Register from './containers/Register';
import { logoutUser, fetchProfile, resetSquares } from './actions';

const jwt = require('jsonwebtoken');

class Game extends React.PureComponent {
  // componentDidMount = () => {
  //   const { fetchedProfile } = this.props;
  //   fetchedProfile();
  // };

  handleClick = e => {
    e.preventDefault();
    localStorage.removeItem('token');
    const { userLogout, resetSquaress } = this.props;
    userLogout();
    resetSquaress();
  };

  render() {
    const tokenn = localStorage.token;
    if (tokenn) {
      const decodeToken = jwt.decode(tokenn);
      // const { state } = this.props;
      return (
        <Router>
          <div className="container">
            <div className="listDisplay">
              <ul style={{ listStyleType: 'none', fontSize: '20px' }}>
                <li>
                  <Icon type="user" /> {decodeToken.username}
                </li>
                <li>
                  <Link to="/">
                    <Icon type="home" /> Trang chủ
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
