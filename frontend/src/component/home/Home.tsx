import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import GetUserId from "../util/GetUserId";

const Home: React.FC = () => {


  const [link, setLink] = useState<JSX.Element>();
  const [userId,setUserId] = GetUserId();

  useEffect(() =>{
    if (userId==''){
      setLink(
          <div>
            <Link to="/RanChat" className="menu-button"> 게스트로 시작</Link>
            <Link to="/LoginForm" className="menu-button">로그인</Link>
            <Link to="/JoinForm" className="menu-button">회원가입</Link>
          </div>
      )
    }
    else{
      setLink(
      <div>
        <Link to="/RanChat" className="menu-button"> 시작하기</Link>
        <Link to="/logout" className="menu-button">로그아웃</Link>
      </div>)
    }
  },[userId])

  return (<div className="home">
    <div className="main-menu">
      <p className="title">아이톡</p>
      {link}
    </div>
  </div>);
}

export default Home;