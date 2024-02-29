import logo from './logo.svg';
import './App.css';
import Login from './Auth/Login';
import Router from './Routes/router';
import { useState } from 'react';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { Button, Row, Col, Toast } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchToken, onMessageListener } from './firebase';
function App() {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: '', body: '' });
  const [isTokenFound, setTokenFound] = useState(false);
  fetchToken(setTokenFound);

  onMessageListener().then(payload => {
    setNotification({ title: payload.notification.title, body: payload.notification.body })
    setShow(true);
    console.log(payload);
  }).catch(err => console.log('failed: ', err));

  return (
    <>
      <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide animation style={{
        position: 'absolute',
        top: 20,
        right: 20,
        minWidth: 200
      }}>
        <Toast.Header>
          <img
            src="holder.js/20x20?text=%20"
            className="rounded mr-2"
            alt=""
          />
          <strong className="mr-auto">{notification.title}</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>{notification.body}</Toast.Body>
      </Toast>
      <Router />
    </>
  );
}

export default App;
