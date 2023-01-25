package kr.tareun.ranchat.service.impl;

import kr.tareun.ranchat.model.entitiy.Member;
import kr.tareun.ranchat.model.vo.ChatMessageVO;
import kr.tareun.ranchat.model.vo.ChatRoomVO;
import kr.tareun.ranchat.repository.ChatRoomRepository;
import kr.tareun.ranchat.repository.MemberRepository;
import kr.tareun.ranchat.service.ChatRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.Optional;
import java.util.Queue;

@Service
public class ChatRoomServiceImpl implements ChatRoomService {

    private final Queue<ChatRoomVO> roomQueue = new LinkedList<>();
    private final ChatRoomRepository chatRoomRepository;
    private final MemberRepository memberRepository;

    @Autowired
    public ChatRoomServiceImpl(ChatRoomRepository chatRoomRepository, MemberRepository memberRepository) {
        this.chatRoomRepository = chatRoomRepository;
        this.memberRepository = memberRepository;
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
    public void joinRoom(ChatMessageVO message) {
        Optional<Member> op = memberRepository.findById(message.getWriter());
        if (op.isPresent()){
            Member member = op.get();
            String nickName = member.getNickname();
            chatRoomRepository.joinRoom(message,nickName);
        }else {
            chatRoomRepository.joinRoom(message,message.getWriter());
        }
    }

    @Override
    public void outRoom(ChatMessageVO message) {
        chatRoomRepository.outRoom(message);
    }

    @Override
    public ChatRoomVO getRoomInfo(String roomId) {
        return chatRoomRepository.getRoomInfo(roomId);
    }

}
