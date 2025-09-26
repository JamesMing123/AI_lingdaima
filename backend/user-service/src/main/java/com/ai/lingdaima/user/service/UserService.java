package com.ai.lingdaima.user.service;

import com.ai.lingdaima.user.dto.UserProfile;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    public UserProfile getProfile(Jwt jwt) {
        return new UserProfile(
                jwt.getSubject(),
                jwt.getClaimAsString("preferred_username"),
                jwt.getClaimAsString("email")
        );
    }
}
