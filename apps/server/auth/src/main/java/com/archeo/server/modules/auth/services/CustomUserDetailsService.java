package com.archeo.server.modules.auth.services;

import com.archeo.server.modules.auth.config.CustomUserDetails;
import com.archeo.server.modules.common.models.UsersCommon;
import com.archeo.server.modules.common.repositories.UsersCommonRepository;
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

    private final UsersCommonRepository usersCommonRepository;
    private final OwnerRepo ownerRepo;
    private final OrganizationRepo organizationRepo;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UsersCommon user = usersCommonRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        if (user.isOAuthUser()) {
            throw new UsernameNotFoundException("Password login is not allowed for OAuth-registered users via " + user.getProvider());
        }

        // Initialize an empty set of authorities
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();

        // Check Owner roles
        ownerRepo.findByUser(user).ifPresent(owner ->
                owner.getUserRole().forEach(role ->
                        authorities.add(new SimpleGrantedAuthority(role.name()))
                )
        );

        // Check Organization roles
        organizationRepo.findByUser(user).ifPresent(org ->
                org.getUserRole().forEach(role ->
                        authorities.add(new SimpleGrantedAuthority(role.name()))
                )
        );

        // If no roles found, throw exception
        if (authorities.isEmpty()) {
            throw new UsernameNotFoundException("No roles assigned to the user.");
        }

        return new CustomUserDetails(user, authorities, null);

    }
}
