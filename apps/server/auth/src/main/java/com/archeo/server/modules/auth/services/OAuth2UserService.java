package com.archeo.server.modules.auth.services;

import com.archeo.server.modules.auth.config.JwtProvider;
import com.archeo.server.modules.auth.dtos.AuthResponse;
import com.archeo.server.modules.auth.enums.AuthProvider;
import com.archeo.server.modules.common.enums.USER_ROLE;
import com.archeo.server.modules.common.models.UsersCommon;
import com.archeo.server.modules.common.repositories.UsersCommonRepository;
import com.archeo.server.modules.user.repositories.OrganizationRepo;
import com.archeo.server.modules.user.repositories.OwnerRepo;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class OAuth2UserService extends DefaultOAuth2UserService {

    private final UsersCommonRepository userRepository;
    private final JwtProvider jwtProvider;
    private final SessionService sessionService;
    private final AuthLogsService authLogsService;
    private final OwnerRepo ownerRepo;
    private final OrganizationRepo organizationRepo;

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
                    newUser.setPassword("");
                    newUser.setProvider(String.valueOf(AuthProvider.GOOGLE));
                    newUser.setProviderId((String) attributes.get("sub"));
                    return userRepository.save(newUser);
                });

        List<USER_ROLE> userRoles = new ArrayList<>();
        ownerRepo.findByUser(user).ifPresent(owner -> userRoles.addAll(owner.getUserRole()));
        organizationRepo.findByUser(user).ifPresent(org -> userRoles.addAll(org.getUserRole()));

        List<String> roleNames = userRoles.isEmpty()
                ? List.of(USER_ROLE.PENDING.name())
                : userRoles.stream().map(Enum::name).toList();

        // ✅ Only one claims map, and it's used directly
        Map<String, Object> claims = new HashMap<>();
        claims.put("authorities", roleNames);

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
                .userRole(roleNames)
                .build();

        System.out.println("Access Token: " + accessToken);
        System.out.println("Auth Response: " + authResponse);

        return authResponse;
    }


}
