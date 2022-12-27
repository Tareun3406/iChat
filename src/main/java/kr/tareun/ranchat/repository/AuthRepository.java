package kr.tareun.ranchat.repository;

import kr.tareun.ranchat.model.entitiy.Auth;
import kr.tareun.ranchat.model.entitiy.AuthColumn;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthRepository extends JpaRepository<Auth, AuthColumn> {
}
