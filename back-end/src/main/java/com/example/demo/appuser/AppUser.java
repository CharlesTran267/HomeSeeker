package com.example.demo.appuser;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collections;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Entity
public class AppUser implements UserDetails {
    @Id
    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "user_sequence"
    )
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    @Enumerated(EnumType.STRING)
    private AppUserRole appUserRole;
    private Boolean locked =false;
    private Boolean enabled = false;

    public AppUser(String firstName, String username, String email, String password, AppUserRole appUserRole) {
        this.firstName = firstName;
        this.lastName = username;
        this.email = email;
        this.password = password;
        this.appUserRole = appUserRole;
    }

    @java.lang.Override
    public java.util.Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(appUserRole.name());
        return Collections.singletonList(authority);
    }

    @java.lang.Override
    public java.lang.String getPassword() {
        return password;
    }

    public java.lang.String getUsername() {
        return email;
    }

    @java.lang.Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @java.lang.Override
    public boolean isAccountNonLocked() {
        return !locked;
    }

    @java.lang.Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @java.lang.Override
    public boolean isEnabled() {
        return enabled;
    }
}
