import React from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Icon,
  Input,
  Button,
  DatePicker,
  Upload,
  message,
  Checkbox
} from 'antd';
import { withRouter } from 'react-router-dom';
import 'antd/dist/antd.css';
import Swal from 'sweetalert2';
import '../index.css';
import { fetchRegister } from '../../actions';
// import moment from 'moment';

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const options = [
  { label: 'Nam', value: 'Male' },
  { label: 'Nữ', value: 'Female' }
];

function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class Register extends React.PureComponent {
  state = {
    loading: false
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false
        })
      );
    }
  };

  handleSubmit = e => {
    const { form, fetchedRegister, history } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        Promise.resolve(
          fetchedRegister(
            values.email,
            values.username,
            values.password,
            values.date._d,
            values.gender[0],
            `https://caro-api-1612907.herokuapp.com/images/${values.avatar.file.name}`
          )
        )
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
              text: 'Đăng ký không thành công, xin hãy đăng ký lại',
              type: 'error'
            });
          });
      }
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;

    return (
      <div style={{ paddingTop: '30px', paddingBottom: '50px' }}>
        <h3 style={{ textAlign: 'center' }}>TẠO TÀI KHOẢN</h3>
        <div className="create-acc-container">
          <Form onSubmit={this.handleSubmit} className="register-form">
            <Form.Item>
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: 'Không được để trống Email!'
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="google" style={{ color: 'rgba(0,0,0,.25)'}} />
                  }
                  placeholder="Email"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: 'Không được để trống Tên đăng nhập!'
                  }
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
            <div className="flex-justify">
              <div className="flex-wrap">
                <Form.Item>
                  {getFieldDecorator('date', {
                    rules: [{ required: false }]
                  })(<DatePicker format={dateFormatList} />)}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('gender', {
                    rules: [{ required: false }]
                  })(<Checkbox.Group options={options} onChange={onChange} />)}
                </Form.Item>
              </div>
              <Form.Item>
                {getFieldDecorator('avatar', {
                  rules: [{ required: false }]
                })(
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="https://caro-api-1612907.herokuapp.com/photo"
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="avatar"
                        style={{ width: '100%' }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                )}
              </Form.Item>
            </div>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Tạo Tài Khoản
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchedRegister: (email, username, password, date, gender, avatar) =>
    dispatch(fetchRegister(email, username, password, date, gender, avatar))
});

export default connect(
  null,
  mapDispatchToProps
)(Form.create()(withRouter(Register)));
