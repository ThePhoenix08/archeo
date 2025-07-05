package com.archeo.server.modules.user.dtos;

import com.archeo.server.modules.common.enums.Resource;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface AbacCheck {
    Resource resource();
    String action();
    String condition();
}
