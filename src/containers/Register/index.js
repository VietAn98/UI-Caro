import React from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import Swal from 'sweetalert2';
import '../index.css';
import { fetchRegister } from '../../actions';

class Register extends React.PureComponent {
  handleSubmit = e => {
    const { form, fetchedRegister, history } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        Promise.resolve(fetchedRegister(values.username, values.password))
          .then(() => {
            Swal.fire({
              title: 'Thành Công!',
              text:
                'Bạn đã đăng ký tài khoản thành công, hãy tiến hành đăng nhập!',
              type: 'success',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Đăng nhập'
            }).then(result => {
              if (result.value) {
                history.push('/signin');
              }
            });
          })
          .catch(() => {
            Swal.fire({
              title: 'Thất Bại!',
              text:
                'Đăng ký không thành công, xin hãy đăng ký lại',
              type: 'error',
            })
          });
      }
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div style={{ paddingTop: '30px', paddingBottom: "50px" }}>
        <h3 style={{ textAlign: 'center' }}>TẠO TÀI KHOẢN</h3>
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
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Tạo
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchedRegister: (username, password) =>
    dispatch(fetchRegister(username, password))
});

export default connect(
  null,
  mapDispatchToProps
)(Form.create()(withRouter(Register)));
