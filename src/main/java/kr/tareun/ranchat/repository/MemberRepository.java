package kr.tareun.ranchat.repository;

import kr.tareun.ranchat.model.entitiy.Member;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, String> {
    @EntityGraph(attributePaths = {"auths"})
    @Override
    Optional<Member> findById(String s);
}
