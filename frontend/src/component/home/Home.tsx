import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import GetUserId from "../util/GetUserId";
import CsrfToken from "../util/CsrfToken";

const Home: React.FC = () => {

  const [link, setLink] = useState<JSX.Element>();
  const [userId,setUserId] = GetUserId();
  const [csrf, setCsrf] = useState<string>("");



  const logout = ()=>{
    if (csrf !== undefined)
    fetch("/logout",{
      method: "POST",
      headers: {
        'X-CSRF-Token': csrf,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    }).then((response)=>{
      if(response.status === 200){
        setUserId("Guest");
      }else{
      }
    }).catch(()=>{
      console.log("연결 오류")
    })
  }
  useEffect(()=>{
    CsrfToken(setCsrf);
  },[])
  useEffect(() =>{
    if (userId?.toString().substring(0,5) ==='Guest'){
      setLink(
          <div>
            <Link to="/RanChat" className="menu-button"> '익명'으로 시작</Link>
            <Link to="/LoginForm" className="menu-button">로그인</Link>
            <Link to="/JoinForm" className="menu-button">회원가입</Link>
          </div>
      )
    }
    else{
      setLink(
      <form>
        <Link to="/RanChat" className="menu-button"> 시작하기</Link>
        <a className="menu-button" onClick={logout}>로그아웃</a>
      </form>)
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