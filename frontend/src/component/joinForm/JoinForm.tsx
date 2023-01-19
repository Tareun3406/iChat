import React, {FC} from "react";
import {useNavigate} from "react-router-dom";

const JoinForm: FC = () =>{
    const navigate = useNavigate();
    return(
        <form className="login-form" method="post" action="/join">
            <div>
                <h2 className="form-top-title">
                    아이톡 회원가입
                </h2>
            </div>

            <div className="form-tag">
                <p className="tag-name">이메일</p>
                <div className="form-input-back">
                    <input type="text" name="username" className="form-input"/>
                </div>
            </div>
            <div className="form-tag">
                <p className="tag-name">닉네임</p>
                <div className="form-input-back">
                    <input type="text" name="nickname" className="form-input"/>
                </div>
            </div>
            <div className="form-tag">
                <p className="tag-name">비밀번호</p>
                <div className="form-input-back">
                    <input type="password" name='password' className="form-input"/>
                </div>
            </div>
            <div className="form-tag">
                <p className="tag-name">비밀번호 확인</p>
                <div className="form-input-back">
                    <input type="password" name='pwCheck' className="form-input"/>
                </div>
            </div>
            <div>
                <button type="button" className="help-link" onClick={ ()=>navigate(-1) }> 뒤로가기 </button>
                <button className="help-link">회원가입 하기</button>
            </div>
        </form>
    )
}

export default JoinForm;