package com.archeo.server.modules.auth.repositories;

import com.archeo.server.modules.auth.models.Session;
import com.archeo.server.modules.common.models.UsersCommon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SessionRepo extends JpaRepository<Session, UUID> {

    List<Session> findByUsersCommon(UsersCommon user);
    void deleteByRefreshTokenHash(String refreshTokenHash);

}
