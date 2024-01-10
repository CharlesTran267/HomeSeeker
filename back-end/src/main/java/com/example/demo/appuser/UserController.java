package com.example.demo.appuser;
import com.example.demo.registration.RegistrationRequest;
import com.example.demo.registration.RegistrationService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import lombok.AllArgsConstructor;
@RestController
@RequestMapping(path = "/api/user")
@AllArgsConstructor
public class UserController {
    private final AppUserService appUserService;

    @GetMapping(path = "/loadbyEmail")
    public UserDetails findByEmail(@RequestParam("email") String email){
        return appUserService.loadUserByUsername(email);
    }
}
