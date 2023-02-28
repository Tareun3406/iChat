package kr.tareun.ranchat.repository;

import kr.tareun.ranchat.model.entitiy.Member;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, String> {
    @EntityGraph(attributePaths = {"auths"})
    @Override
    Optional<Member> findById(String s);

    @Modifying
    @Query("update Member m set m.password = :password where m.username = :username")
    int updatePassword(@Param("username") String username, @Param("password") String password);
}
