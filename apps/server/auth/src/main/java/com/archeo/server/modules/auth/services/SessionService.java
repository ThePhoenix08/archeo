package com.archeo.server.modules.auth.services;

import com.archeo.server.modules.auth.repositories.SessionRedisRepository;
import com.archeo.server.modules.common.models.Session;
import com.archeo.server.modules.common.models.UsersCommon;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class SessionService {

    private final BCryptPasswordEncoder passwordEncoder;
    private final SessionRedisRepository sessionRedisRepository;

    public void saveSession(UsersCommon user, String refreshToken, HttpServletRequest request) {
        Session session = new Session();

        session.setId(UUID.randomUUID());
        session.setUserId(user.getId());
        session.setRefreshTokenHash(passwordEncoder.encode(refreshToken));
        session.setIpAddress(request.getRemoteAddr());
        session.setUserAgent(request.getHeader("User-Agent"));

        Instant now = Instant.now();
        session.setCreatedAt(Timestamp.from(now));
        session.setExpiresAt(Timestamp.from(now.plus(3, ChronoUnit.DAYS)));
        sessionRedisRepository.save(session);
    }


    public Optional<Session> getSession(UUID sessionId) {
        return sessionRedisRepository.findById(sessionId);
    }

    public void deleteSession(UUID sessionId) {
        sessionRedisRepository.deleteById(sessionId);
    }

    public Optional<Session> getSessionByUserId(Long userId) {
        return sessionRedisRepository.findByUserId(userId);
    }
    public String extractSessionId(HttpServletRequest servletRequest) {
//        session id passed in header
//        return servletRequest.getHeader("X-Session-Id");

        if (servletRequest.getCookies() != null) {
            for (Cookie cookie : servletRequest.getCookies()) {
                if ("sessionId".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}
