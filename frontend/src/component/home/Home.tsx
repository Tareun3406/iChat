import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import GetUserId from "../util/GetUserId";

const Home: React.FC = () => {

  const [link, setLink] = useState<JSX.Element>();
  const [userId,setUserId] = GetUserId();

  const titleMenuStyle: React.CSSProperties = {
    display:"block", fontSize:"1.5rem", margin:"1em"
  };

  const logout = ()=>{
    fetch("/logout",{
      method: "POST",
      headers: {
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

  useEffect(() =>{
    if (userId?.toString().substring(0,5) ==='Guest'){
      setLink(
          <>
            <Link to="/RanChat" className="btn btn-lg btn-primary"
                  style={titleMenuStyle}> '익명'으로 시작</Link>
            <Link to="/LoginForm" className="btn btn-lg btn-primary"
                  style={titleMenuStyle}>로그인</Link>
            <Link to="/JoinForm" className="btn btn-lg btn-primary"
                  style={titleMenuStyle}>회원가입</Link>
          </>
      )
    }
    else{
      setLink(
      <>
        <Link to="/RanChat" className="btn btn-lg btn-primary"
              style={titleMenuStyle}> 시작하기</Link>
        <a className="btn btn-lg btn-primary"
           style={titleMenuStyle} onClick={logout}>로그아웃</a>
      </>)
    }
  },[userId])

  return (
    <div className="main-menu">
      <h1 style={{fontSize:"8rem"}}>아이톡</h1>
      {link}
  </div>);
}

export default Home;