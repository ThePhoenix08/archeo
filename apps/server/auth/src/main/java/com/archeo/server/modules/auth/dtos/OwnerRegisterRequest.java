package com.archeo.server.modules.auth.dtos;

import lombok.Data;

import java.time.LocalDate;

@Data
public class OwnerRegisterRequest {

    private String username;
    private String email;
    private String password;


    private String fullName;
    private LocalDate dob;

}
