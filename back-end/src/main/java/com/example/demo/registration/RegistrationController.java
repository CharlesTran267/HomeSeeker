package com.example.demo.registration;

import com.example.demo.appuser.AppUserService;
import org.springframework.web.bind.annotation.*;
import lombok.AllArgsConstructor;
@RestController
@RequestMapping(path = "/api/registration")
@AllArgsConstructor
public class RegistrationController {
    private final RegistrationService registrationService;
    @PostMapping
    public String register(@RequestBody RegistrationRequest request){
        return registrationService.register(request);
    }
    @GetMapping(path = "/confirm")
    public String confirm(@RequestParam("token") String token){
        return registrationService.confirmToken(token);
    }
}
