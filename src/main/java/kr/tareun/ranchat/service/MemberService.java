package kr.tareun.ranchat.service;

import kr.tareun.ranchat.model.dto.MemberDTO;

public interface MemberService {
    public void joinMember(MemberDTO member);

    public String getMemberNickname(String username);

    boolean getIsInValidEmail(String username);

    boolean sendFindPwMail(String username);

    void emailCertify(String username, String uid);
}
