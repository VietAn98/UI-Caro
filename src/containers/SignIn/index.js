import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import 'antd/dist/antd.css';
import '../index.css';
import FacebookLogin from 'react-facebook-login';
import { fetchLogin, resetSquares, fetchRegister } from '../../actions';
import { GoogleLogin } from 'react-google-login';
// import moment from 'moment';

class SignIn extends React.PureComponent {
  state = {
    isLoggedIn: false
  };

  handleSubmit = e => {
    const { form, fetchedLogin, history, resetSquaress } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        Promise.resolve(fetchedLogin(values.email, values.password))
          .then(() => {
            resetSquaress();
            history.push('/');
          })
          .catch(() => {
            Swal.fire({
              title: 'Thất Bại!',
              text: 'Mật khẩu/Tên đăng nhập không đúng, xin hãy kiểm tra lại',
              type: 'error'
            });
          });
      }
    });
  };

  onClickFacebookIcon = () => {
    console.log('clicked');
  };

  responseFacebook = response => {
    console.log('response-Facebook', response);

    const { fetchedRegister, fetchedLogin, history } = this.props;
    fetchedRegister(
      response.email,
      response.name,
      response.id, //as password
      null,
      '',
      response.picture.data.url
    );
    Promise.resolve(fetchedLogin(response.email, response.id)).then(() => {
      history.push('/');
    });
  };

  responseGoogle = response => {
    console.log('Google response', response);

    const { fetchedRegister, fetchedLogin, history } = this.props;
    fetchedRegister(
      response.profileObj.email,
      response.profileObj.name,
      response.profileObj.googleId, //as password
      null,
      null,
      response.profileObj.imageUrl
    );
    Promise.resolve(
      fetchedLogin(response.profileObj.email, response.profileObj.googleId)
    ).then(() => {
      history.push('/');
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    let fbContent;
    if (this.state.isLoggedIn) {
      fbContent = null;
    } else {
      fbContent = (
        <FacebookLogin
          appId="547220829428743"
          autoLoad={false}
          fields="name,email,picture"
          callback={this.responseFacebook}
          onClick={this.onClickFacebookIcon}
        />
      );
    }
    return (
      <div style={{ paddingTop: '30px', paddingBottom: '50px' }}>
        <h3 style={{ textAlign: 'center' }}>ĐĂNG NHẬP</h3>
        <div className="create-acc-container">
          <Form onSubmit={this.handleSubmit} className="register-form">
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [
                  { required: true, message: 'Không được để trống Email!' }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Email"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Không được để trống Mật khẩu!' }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="Mật khẩu"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true
              })(<Checkbox>Lưu đăng nhập</Checkbox>)}
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Đăng nhập
              </Button>
            </Form.Item>
            <Form.Item>{fbContent}</Form.Item>
            <Form.Item>
              <GoogleLogin
                clientId="246107652164-0c2g1us38ojg2o95f3l180h0tllh2tkp.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={'single_host_origin'}
              />
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  fetchedLogin: (email, password) => dispatch(fetchLogin(email, password)),
  resetSquaress: () => dispatch(resetSquares()),
  fetchedRegister: (email, username, password, date, gender, avatar) =>
    dispatch(fetchRegister(email, username, password, date, gender, avatar))
});

export default connect(
  null,
  mapDispatchToProps
)(Form.create()(withRouter(SignIn)));
