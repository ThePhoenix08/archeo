package com.archeo.auth.repositories;

import com.archeo.auth.models.Session;
import com.archeo.user.models.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SessionRepo extends JpaRepository<Session, UUID> {

    List<Session> findByUser(Users user);
    void deleteByRefreshTokenHash(String refreshTokenHash);

}
