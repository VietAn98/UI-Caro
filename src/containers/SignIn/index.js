import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import 'antd/dist/antd.css';
import '../index.css';
import { fetchLogin, resetSquares } from '../../actions';

class SignIn extends React.PureComponent {
  handleSubmit = e => {
    const { form, fetchedLogin, history, resetSquaress } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        Promise.resolve(fetchedLogin(values.username, values.password)).then(
          () => {
            resetSquaress();
            history.push('/');
          }
        )
        .catch(() => {
          Swal.fire({
            title: 'Thất Bại!',
            text:
              'Mật khẩu/Tên đăng nhập không đúng, xin hãy kiểm tra lại',
            type: 'error',
          })
        })
      }
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div style={{ paddingTop: '30px', paddingBottom: "50px" }}>
        <h3 style={{ textAlign: 'center' }}>ĐĂNG NHẬP</h3>
        <div className="create-acc-container">
          <Form onSubmit={this.handleSubmit} className="register-form">
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  { required: true, message: 'Không được để trống Tên đăng nhập!' }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Tên đăng nhập"
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
          </Form>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  fetchedLogin: (username, password) => dispatch(fetchLogin(username, password)),
  resetSquaress: () => dispatch(resetSquares()),
});

export default connect(
  null,
  mapDispatchToProps
)(Form.create()(withRouter(SignIn)));
