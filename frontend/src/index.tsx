import React from 'react';
import ReactDOM from 'react-dom/client';
import './bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import {Alert} from "react-bootstrap";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
      <BrowserRouter>
          <Alert style={{textAlign:"center"}}>
              본 사이트는 포트폴리오용 사이트로 실제 이용자가 거의 없습니다.
              랜덤채팅의 테스트는 크롬의 게스트 계정 등을 이용하여 두개의 브라우저로 테스트 해 주시기 바랍니다. (개발자 : 박찬호)
          </Alert>
          <App />
      </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
