package kr.tareun.ranchat.service;

import kr.tareun.ranchat.model.dto.MemberDTO;
import kr.tareun.ranchat.model.vo.CertifyVO;

public interface MemberService {
    public void joinMember(MemberDTO member);

    public MemberDTO getMemberInfo(String username);

    public String getMemberNickname(String username);

    boolean getIsInValidEmail(String username);

    boolean sendFindPwMail(MemberDTO member);

    int updatePw(String username, String pw);

    CertifyVO getCertify(String username);

    void emailCertify(String username, String uid);
}
