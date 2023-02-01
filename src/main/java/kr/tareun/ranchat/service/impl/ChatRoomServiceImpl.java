package kr.tareun.ranchat.service.impl;

import kr.tareun.ranchat.model.vo.ChatMessageVO;
import kr.tareun.ranchat.model.vo.ChatRoomVO;
import kr.tareun.ranchat.repository.ChatRoomRepository;
import kr.tareun.ranchat.service.ChatRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.Map;
import java.util.Queue;

@Service
public class ChatRoomServiceImpl implements ChatRoomService {

    private final Queue<ChatRoomVO> roomQueue = new LinkedList<>();
    private final ChatRoomRepository chatRoomRepository;

    @Autowired
    public ChatRoomServiceImpl(ChatRoomRepository chatRoomRepository) {
        this.chatRoomRepository = chatRoomRepository;
    }

    @Override
    public ChatRoomVO matchRoom() {
        ChatRoomVO room;
        if (roomQueue.isEmpty()){               // 대기중인 방이 없을 경우
            room = chatRoomRepository.createRoom();                // 새로운 방 생성
            roomQueue.add(room);   // 생성된 방 대기열에 등록
        }else {
            room = roomQueue.remove(); // 대기열에 등록된 방 가져오기
            if (!chatRoomRepository.getRoomList().containsKey(room.getRoomId())){ // 대기열에 있었지만 방목록이 사라진 경우.
                chatRoomRepository.addRoom(room);
                roomQueue.add(room);
            }
        }
        return room;
    }

    @Override
    public void joinRoom(ChatMessageVO message, String nickname) {
        Map<String, ChatRoomVO> rooms = chatRoomRepository.getRoomList();
        ChatRoomVO room = rooms.get(message.getRoomId());
        if (room == null){  // repository 에 방이 없을경우(클라이언트 측에서 방Id를 받은상태에서 서버 재시작 했을경우 등)
            ChatRoomVO newRoom = new ChatRoomVO(message.getRoomId());
            chatRoomRepository.addRoom(newRoom);
            roomQueue.add(newRoom);
        }
        chatRoomRepository.joinRoom(message,nickname);
    }

    @Override
    public void outRoom(ChatMessageVO message) {
        Map<String, ChatRoomVO> rooms = chatRoomRepository.getRoomList();
        ChatRoomVO room = rooms.get(message.getRoomId());
        if (room != null){  // repository 에 방이 없을경우(클라이언트 측에서 방Id를 받은상태에서 서버 재시작 했을경우 등)
            chatRoomRepository.outRoom(message);
        }
    }

    @Override
    public ChatRoomVO getRoomInfo(String roomId) {
        return chatRoomRepository.getRoomInfo(roomId);
    }

}
