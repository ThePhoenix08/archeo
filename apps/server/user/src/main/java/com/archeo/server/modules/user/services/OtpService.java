package com.archeo.server.modules.user.services;

import com.archeo.server.modules.user.config.MailConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class OtpService {


    private final StringRedisTemplate redisTemplate;
    private final JavaMailSender javaMailSender;
    private final MailConfig mailConfig;
    private final PasswordEncoder passwordEncoder;

    public void sendOtp(String email){
        String otp= generateOtp();

        String key="otp"+email;

        System.out.println("Generated Otp: "+otp);

        redisTemplate.opsForValue().set(key, passwordEncoder.encode(otp), Duration.ofMinutes(5));

        SimpleMailMessage mailMessage=new SimpleMailMessage();
        mailMessage.setFrom(mailConfig.getMailFrom());
        mailMessage.setTo(email);
        mailMessage.setSubject("Your OTP for Archeo Verification");
        mailMessage.setText("Your OTP is: " + otp + "\nIt is valid for 5 minutes.");

        javaMailSender.send(mailMessage);

    }

    private String generateOtp(){
        int otp=new Random().nextInt(9000)+1000;
        return String.valueOf(otp);
    }

    public String verifyOtp(String otp ,String email) {

        String key="otp"+email;
        String hashedOtp= redisTemplate.opsForValue().get(key);

        if(passwordEncoder.matches(otp, hashedOtp)){
            return "Otp verified successfully";
        }

        return "Invalid otp";

    }
}
