package com.archeo.server.modules.auth.services;

import com.archeo.server.modules.auth.config.JwtProvider;
import com.archeo.server.modules.auth.enums.AuthProvider;
import com.archeo.server.modules.auth.responses.AuthResponse;

import com.archeo.server.modules.common.enums.AgentRole;
import com.archeo.server.modules.common.models.Agent;
import com.archeo.server.modules.user.repositories.AgentRepository;
import com.archeo.server.modules.user.repositories.IndividualRepo;
import com.archeo.server.modules.user.repositories.OrganizationRepo;
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

    private final AgentRepository agentRepository;
    private final JwtProvider jwtProvider;
    private final SessionService sessionService;
    private final AuthLogsService authLogsService;
    private final IndividualRepo individualRepo;
    private final OrganizationRepo organizationRepo;

    public AuthResponse processOAuthLogin(OAuth2AuthenticationToken token,
                                          HttpServletRequest servletRequest,
                                          HttpServletResponse servletResponse) {
        OAuth2User oAuth2User = token.getPrincipal();
        Map<String, Object> attributes = oAuth2User.getAttributes();

        String email = (String) attributes.get("email");
        String username = ((String) attributes.get("name")).replaceAll("\\s+", "").toLowerCase();

        Agent agent = agentRepository.findByEmail(email)
                .orElseGet(() -> {
                    Agent newAgent=new Agent();

                    newAgent.setEmail(email);
                    newAgent.setUsername(username);
                    newAgent.setPassword("");
                    newAgent.setProvider(String.valueOf(AuthProvider.GOOGLE));
                    newAgent.setProviderId((String) attributes.get("sub"));
                    return agentRepository.save(newAgent);
                });

        List<AgentRole> userRoles = new ArrayList<>();
        individualRepo.findByAgent(agent).ifPresent(owner -> userRoles.addAll(owner.getAgentRole()));
        organizationRepo.findByAgent(agent).ifPresent(org -> userRoles.addAll(org.getAgentRole()));

        List<String> roleNames = userRoles.isEmpty()
                ? List.of(null)
                : userRoles.stream().map(Enum::name).toList();

        // ✅ Only one claims map, and it's used directly
        Map<String, Object> claims = new HashMap<>();
        claims.put("authorities", roleNames);

        String accessToken = jwtProvider.generateAccessToken(claims, agent.getEmail());
        String refreshToken = jwtProvider.generateRefreshToken(agent.getEmail());

        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(3 * 24 * 60 * 60);
        servletResponse.addCookie(refreshTokenCookie);

        sessionService.saveSession(agent, refreshToken, servletRequest);
        authLogsService.log(agent, refreshToken, servletRequest);

        AuthResponse authResponse = AuthResponse.builder()
                .accessToken(accessToken)
                .build();

        System.out.println("Access Token: " + accessToken);
        System.out.println("Auth Response: " + authResponse);

        return authResponse;
    }


}
