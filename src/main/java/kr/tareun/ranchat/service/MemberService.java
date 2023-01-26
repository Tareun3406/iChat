package kr.tareun.ranchat.service;

import kr.tareun.ranchat.model.dto.MemberDTO;

public interface MemberService {
    public void joinMember(MemberDTO member);

    public String getMemberNickname(String username);

    boolean getIsValidEmail(String username);
}
