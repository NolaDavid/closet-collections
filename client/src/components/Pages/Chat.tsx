import React, { ReactElement } from 'react';
import {io} from 'socket.io-client';
import moment from 'moment';
import Message from '../models/Message';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import Footer from './Footer';
import Grid from '@material-ui/core/Grid';

// const <input  = require('@material-ui/core<input')
const socket = io('http://localhost:3000');
// const socket = io('https://closet-collections.uc.r.appspot.com');

const Chat = (): ReactElement => {

  const [state, setState] = React.useState<Message>({message: '', name: ''});
  const [chat, setChat] = React.useState([]);
  const [font, setFont] = React.useState(32);
  const [input, setInput] = React.useState(14);

  React.useEffect((): void => {
    socket.on('message', ({name, message }) => {
      setChat([...chat, {name, message}]);
    });
  }, [state]);

  const onTextChange = (e): void => {
    setState({...state, [e.target.name]: e.target.value});
  };

  const onMessageSubmit = (e): void => {
    e.preventDefault();
    const {name, message} = state;
    socket.emit('message', {name, message});
    setState({message: '', name});
  };

  const larger = (): any => {
    setFont(50);
    setInput(24);
  };

  const smaller = (): any => {
    setFont(25);
    setInput(14);
  };

  const renderChat = (): ReactElement[] => {

    return chat.map((message: Message): ReactElement => (
      <div>
        <h1>
          {message.message}
        </h1>
      </div>
    ));

  };

  const time: string = moment().format('h:mm a');

  return (

    <div>

      <div>
        <ZoomInIcon onClick={larger} />
        <ZoomOutIcon onClick={smaller} />
      </div>
      <div className="card">
        <form onSubmit={onMessageSubmit} >
          <h1 style={{fontSize: font}}>Messenger</h1>
          <div className="name-field">
          </div>
          <div>
            <input
              placeholder='enter username'
              name="name"
              onChange={(e): void => onTextChange(e)}
              value={state.name}
              id="outlined-multiline-static"
              style={{fontSize: input, backgroundColor: '#000000', color: '#7ed957'}}
            />
            <input
              placeholder='enter message'
              name="message"
              onChange={(e): void => onTextChange(e)}
              value={state.message}
              id="outlined-multiline-static"
              style={{fontSize: input, backgroundColor: '#000000', color: '#7ed957'}}
            />
          </div>
          <button id='submit' style={{backgroundColor: '#000000', color: '#7ed957'}}>Send Message</button>
        </form>

        <div className="render-chat"
        >
          <h1 style={{fontSize: font, }}>Chat Log</h1>
          <ul id='message-log'>
            {chat.map((message, index) => {
              return <div key={index}>
                {/* <span id='messagename'>{message.name}</span>
            <span id='message'>{message.message}</span>
            <span id='time'>{moment().format('h:mm a')}</span> */}
                {`${message.name}: ${message.message} ${moment().format('h:mm a')}`}
              </div>;
            })}
          </ul>
        </div>
      </div>

    </div>
  );
};
export default Chat;
