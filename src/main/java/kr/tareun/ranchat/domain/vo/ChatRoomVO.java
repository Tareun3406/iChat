package kr.tareun.ranchat.domain.vo;


import lombok.Getter;

@Getter
public class ChatRoomVO {
    private String roomId;

    public ChatRoomVO() {
        roomId = "1";
    }
}
