package com.archeo.server.modules.auth.services;

import com.archeo.server.modules.auth.config.JwtProvider;
import com.archeo.server.modules.auth.dtos.AuthResponse;
import com.archeo.server.modules.common.models.UsersCommon;
import com.archeo.server.modules.common.repositories.UsersCommonRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class OAuth2UserService extends DefaultOAuth2UserService {

    private final UsersCommonRepository userRepository;
    private final JwtProvider jwtProvider;
    private final SessionService sessionService;
    private final AuthLogsService authLogsService;

    public AuthResponse processOAuthLogin(OAuth2AuthenticationToken token,
                                          HttpServletRequest servletRequest,
                                          HttpServletResponse servletResponse) {
        OAuth2User oAuth2User = token.getPrincipal();
        Map<String, Object> attributes = oAuth2User.getAttributes();

        String email = (String) attributes.get("email");
        String username = ((String) attributes.get("name")).replaceAll("\\s+", "").toLowerCase();

        UsersCommon user = userRepository.findByEmail(email)
                .orElseGet(() -> {
                    UsersCommon newUser = new UsersCommon();
                    newUser.setEmail(email);
                    newUser.setUsername(username);
//                    newUser.setUserRole(USER_ROLE.ROLE_OWNER);
                    newUser.setPassword("");
                    return userRepository.save(newUser);
                });

        Map<String, Object> claims = Map.of("authorities", null);
        String accessToken = jwtProvider.generateAccessToken(claims, user.getEmail());
        String refreshToken = jwtProvider.generateRefreshToken(user.getEmail());

        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(3 * 24 * 60 * 60);
        servletResponse.addCookie(refreshTokenCookie);

        sessionService.saveSession(user, refreshToken, servletRequest);
        authLogsService.log(user, refreshToken, servletRequest);

        AuthResponse authResponse = AuthResponse.builder()
                .accessToken(accessToken)
//                .userRole(user.getUserRole())
                .build();

        System.out.println("Access Token: " + accessToken);
        System.out.println("Auth Response: " + authResponse);

        return authResponse;
    }

}
