package kr.tareun.ranchat.service;

import kr.tareun.ranchat.model.dto.CertifyDTO;
import kr.tareun.ranchat.model.dto.MemberDTO;

public interface MemberService {
    public void joinMember(MemberDTO member);

    public MemberDTO getMemberInfo(String username);

    public String getMemberNickname(String username);

    boolean getIsInValidEmail(String username);

    boolean sendFindPwMail(MemberDTO member);

    int updatePw(String username, String pw);

    CertifyDTO getCertify(String uid);

    void emailCertify(String username, String uid);
}
