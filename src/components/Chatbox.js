import React from 'react';
import { Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import '../index.css';
class Chatbox extends React.PureComponent {
  render() {
    return (
      <div className="messenger" style={{ color: 'black' }}>
        <div className="message-header">CHAT BOX</div>
        <hr style={{ marginTop: '30px' }} />

        <div className="message-body" id="message-body">
          <div style={{ marginBottom: '10px' }}>
            <div
              className="message-text"
              style={{ background: 'linear-gradient(#02aab0, #00cdac)' }}
            >
              ạdasjdjas
            </div>
            <div className="message-time">ádasd</div>
          </div>
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
export default Chatbox;
