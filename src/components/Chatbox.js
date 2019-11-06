import React, { useCallback } from 'react';
import { Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import '../index.css';
import SocketIO from 'socket.io-client';
import { setChatBox } from '../actions';
import { connect } from 'react-redux';

const messList = [];
const io = SocketIO.connect('https://caro-api-1612907.herokuapp.com');

class Chatbox extends React.Component {
  constructor(props) {
    super(props);

    const { state } = this.props;
    const { currentUser } = state;

    io.on('BroadcastMessage', message => {
      messList.push(
        <div
          style={
            currentUser.username === message.user.username
              ? { textAlign: '-webkit-right', marginBottom: '10px' }
              : { textAlign: '-webkit-left', marginBottom: '10px' }
          }
        >
          <div className="message-time">{message.user.username}</div>
          <div
            className="message-text"
            style={{ background: 'linear-gradient(#02aab0, #00cdac)' }}
          >
            {message.value}
          </div>
        </div>
      );
      const { setChatBoxx } = this.props;
      setChatBoxx(messList);
    });
  }

  sendMessage = e => {
    const { state } = this.props;
    const { currentUser } = state;
    e.preventDefault();
    io.emit('AddMessage', {
      value: e.target.messageText.value,
      user: currentUser
    });
  };

  render() {
    const { state } = this.props;
    const { messageLists } = state;
    return (
      <div className="messenger" style={{ color: 'black' }}>
        <div className="message-header">CHAT BOX</div>
        <hr style={{ marginTop: '30px' }} />

        <div className="message-body" id="message-body">
          {messageLists}
        </div>

        <Form onSubmit={this.sendMessage} autoComplete="off">
          <InputGroup
            className="mb-3 message-input"
            style={{ padding: '0px', margin: '0px' }}
          >
            <FormControl
              style={{ padding: '0px' }}
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              name="messageText"
            />
            <InputGroup.Append>
              <Button variant="success" type="submit">
                Send
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state: state.appReducer
});
const mapDispatchToProps = dispatch => ({
  setChatBoxx: mess => dispatch(setChatBox(mess))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chatbox);
