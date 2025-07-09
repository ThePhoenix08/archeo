package com.archeo.server.modules.auth.services;

import com.archeo.server.modules.auth.config.CustomUserDetails;
import com.archeo.server.modules.common.models.Agent;
import com.archeo.server.modules.common.repositories.AgentRepository;
import com.archeo.server.modules.user.repositories.OrganizationRepo;
import com.archeo.server.modules.user.repositories.OwnerRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final AgentRepository agentRepository;
    private final OwnerRepo ownerRepo;
    private final OrganizationRepo organizationRepo;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Agent agent = agentRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        if (agent.isOAuthUser()) {
            throw new UsernameNotFoundException("Password login is not allowed for OAuth-registered users via " + agent.getProvider());
        }

        // Initialize an empty set of authorities
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();

        // Check Owner roles
        ownerRepo.findByUser(agent).ifPresent(owner ->
                owner.getAgentRole().forEach(role ->
                        authorities.add(new SimpleGrantedAuthority(role.name()))
                )
        );

        // Check Organization roles
        organizationRepo.findByUser(agent).ifPresent(org ->
                org.getAgentRole().forEach(role ->
                        authorities.add(new SimpleGrantedAuthority(role.name()))
                )
        );

        // If no roles found, throw exception
        if (authorities.isEmpty()) {
            throw new UsernameNotFoundException("No roles assigned to the user.");
        }

        return new CustomUserDetails(agent, authorities, null);

    }
}
