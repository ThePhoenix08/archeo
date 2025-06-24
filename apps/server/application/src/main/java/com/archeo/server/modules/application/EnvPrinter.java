//package com.archeo.server.modules.application;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Component;
//
//import jakarta.annotation.PostConstruct;
//
//@Component
//public class EnvPrinter {
//
//    @Value("${DB_URL}")
//    private String dbUrl;
//
//    @Value("${DB_PASSWORD}")
//    private String dbPassword;
//
//    @PostConstruct
//    public void printEnvVars() {
//        System.out.println("DB url: " + dbUrl);
//        System.out.println("DB password: " + dbPassword);
//    }
//}
