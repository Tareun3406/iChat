package kr.tareun.ranchat.model.vo;


import lombok.Getter;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
public class ChatRoomVO {
    final private String roomId;
    private Set<String> members = new HashSet<>();


    public ChatRoomVO() {
        roomId = UUID.randomUUID().toString();
    }

    public void joinMember(String memberId){
        members.add(memberId);
    }

    public int outMember(String memberId){
        members.remove(memberId);
        return members.size();
    }
}
