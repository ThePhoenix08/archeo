package com.archeo.server.modules.user.services;

import com.archeo.server.modules.common.exceptions.InvalidCredentialsException;
import com.archeo.server.modules.user.config.MailConfig;
import com.archeo.server.modules.user.enums.OtpPurpose;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Random;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class OtpService {


    private final StringRedisTemplate redisTemplate;
    private final JavaMailSender javaMailSender;
    private final MailConfig mailConfig;
    private final PasswordEncoder passwordEncoder;

    public String sendOtp(String email, OtpPurpose purpose) {
        String otp = generateOtp();
        String verifyToken = UUID.randomUUID().toString();

        String redisKey = "verify:" + verifyToken;

        String redisValue = passwordEncoder.encode(otp);

        redisTemplate.opsForValue().set(redisKey, redisValue, Duration.ofMinutes(5));

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom(mailConfig.getMailFrom());
        mailMessage.setTo(email);
        mailMessage.setSubject("Your OTP for Archeo Verification");
        mailMessage.setText("Your OTP is: " + otp + "\nIt is valid for 5 minutes.");


        System.out.println("before java mail");
        javaMailSender.send(mailMessage);

        return verifyToken;
    }


    private String generateOtp(){
        int otp = new Random().nextInt(900000) + 100000;
        return String.valueOf(otp);
    }

    public String verifyOtp(String verifyToken, String code) {

        String key="verify:"+verifyToken;
        String hashedOtp= redisTemplate.opsForValue().get(key);

        if(passwordEncoder.matches(code, hashedOtp)){
            return "Otp verified successfully";
        }

        throw new InvalidCredentialsException("Invalid password");

    }
}
