import React from "react";
import {Link} from "react-router-dom";

const Home: React.FC = () => {
  return (<div className="home">
    <div className="main-menu">
      <p className="title">아이톡</p>
      <Link to="/RanChat" className="menu-button">시작하기</Link>
      <Link to="/JoinForm" className="menu-button">회원가입</Link>
    </div>
  </div>);
}

export default Home;