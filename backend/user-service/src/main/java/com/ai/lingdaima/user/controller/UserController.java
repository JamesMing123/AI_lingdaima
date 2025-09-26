package com.ai.lingdaima.user.controller;

import com.ai.lingdaima.user.dto.UserProfile;
import com.ai.lingdaima.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public UserProfile currentUser(@AuthenticationPrincipal Jwt jwt) {
        return userService.getProfile(jwt);
    }
}
