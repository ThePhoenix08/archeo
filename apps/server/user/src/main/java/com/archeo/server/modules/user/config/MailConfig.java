package com.archeo.server.modules.user.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class MailConfig {

    @Value("${spring.mail.username}")
    private String mailFrom;

    public String getMailFrom() {
        return mailFrom;
    }
}
