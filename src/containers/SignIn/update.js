import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import '../index.css';
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
import moment from 'moment';
import { fetchEdit, fetchProfile } from '../../actions';
import Swal from 'sweetalert2';

// const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const options = [
  { label: 'Nam', value: 'Male' },
  { label: 'Nữ', value: 'Female' }
];

// const jwt = require('jsonwebtoken');

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

class Update extends React.PureComponent {
  state = {
    loading: false,
    isDisable: true,
    avatarLink: ''
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

  componentDidMount = () => {
    // const { fetchedProfile } = this.props;
    // fetchedProfile();

    const { form, state } = this.props;
    const { currentUser } = state;
    console.log('currentUser', currentUser);
    form.setFieldsValue({
      email: currentUser.email,
      username: currentUser.username,
      password: currentUser.password,
      date: moment(currentUser.date),
      gender: [`${currentUser.gender}`]
    });
    this.setState({
      avatarLink: currentUser.avatar
    });
  };
  handleBtnEditClick = () => {
    this.setState({
      isDisable: false
    });
  };

  handleSubmit = e => {
    const { form, fetchedEdit, state } = this.props;
    const { avatarLink } = this.state;
    e.preventDefault();
    form.validateFields((err, values) => {
      Promise.resolve(
        fetchedEdit(
          state.currentUser.id,
          values.username,
          values.password,
          values.date._d,
          values.gender[0],
          avatarLink ? avatarLink : values.avatar.file.name
        )
      )
        .then(() => {
          Swal.fire({
            title: 'Thành Công!',
            text: 'Cập nhập thông tin tài khoản thành công!',
            type: 'success',
            confirmButtonText: 'OK'
          }).then(result => {
            if (result.value) {
              window.location.href = 'http://localhost:3000/';
            }
          });
        })
        .catch(() => {
          Swal.fire({
            title: 'Thất Bại!',
            text: 'Cập nhật không thành công, xin hãy thử lại',
            type: 'error'
          });
        });
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
    const { imageUrl, avatarLink } = this.state;
    return (
      <div style={{ paddingTop: '30px', paddingBottom: '50px' }}>
        <h3 style={{ textAlign: 'center' }}>CHỈNH SỬA THÔNG TIN TÀI KHOẢN</h3>
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
                    <Icon type="google" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  disabled
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
                  disabled={this.state.isDisable ? true : false}
                  style={{ width: '280px' }}
                />
              )}
              <Button
                type="dashed"
                shape="round"
                style={{ float: 'right' }}
                onClick={this.handleBtnEditClick}
              >
                Chỉnh sửa
              </Button>
            </Form.Item>
            <div className="flex-justify">
              <div className="flex-wrap">
                <Form.Item>
                  {getFieldDecorator('date', {
                    rules: [{ required: false }]
                  })(<DatePicker format={'DD/MM/YYYY'} />)}
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
                    action="http://localhost:5000/photo"
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                  >
                    <img
                      src={imageUrl ? imageUrl : avatarLink}
                      alt="avatar"
                      style={{ width: '100%' }}
                    />
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
                Cập Nhật
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchedEdit: (id, username, password, date, gender, avatar) =>
    dispatch(fetchEdit(id, username, password, date, gender, avatar)),
  fetchedProfile: () => dispatch(fetchProfile())
});

const mapStateToProps = state => ({
  state: state.appReducer
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(withRouter(Update)));
