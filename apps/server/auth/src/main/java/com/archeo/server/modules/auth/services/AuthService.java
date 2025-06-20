package com.archeo.server.modules.auth.services;

import com.archeo.server.modules.auth.dtos.AuthResponse;
import com.archeo.server.modules.auth.dtos.SigninRequest;
import com.archeo.server.modules.auth.dtos.SignupRequest;

public interface AuthService {

    AuthResponse register(SignupRequest request);

    AuthResponse login(SigninRequest signinRequest);
}