package com.condescendors.pollingapp.pollingapp.security;

import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.lang.annotation.*;

@Target(value = {ElementType.PARAMETER,ElementType.TYPE})
@Retention(value = RetentionPolicy.RUNTIME)
@Documented
@AuthenticationPrincipal
public @interface CurrentUser {

}
