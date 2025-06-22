package com.archeo.auth.services;

import com.archeo.auth.repositories.SessionRepo;
import com.archeo.auth.models.Session;
import com.archeo.user.models.Users;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
public class SessionService {

    private final SessionRepo sessionRepo;
    private final PasswordEncoder passwordEncoder;

    public void saveSession(Users user, String refreshToken, HttpServletRequest request){
        Session session=new Session();
        session.setUser(user);
        session.setRefreshTokenHash(passwordEncoder.encode(refreshToken));
        session.setIpAddress(request.getRemoteAddr());
        session.setUserAgent(request.getHeader("User-Agent"));
        session.setExpiresAt(Timestamp.from(Instant.now().plus(30, ChronoUnit.DAYS)));
        sessionRepo.save(session);

    }
}
