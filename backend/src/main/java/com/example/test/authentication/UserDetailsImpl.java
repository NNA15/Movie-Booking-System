package com.example.test.authentication;

import com.example.test.entities.User;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class UserDetailsImpl implements UserDetails {

  private static final long serialVersionUID = -8773921465190832995L;
  private String name;
  private String password;
  private List<GrantedAuthority> authorities;

  public UserDetailsImpl(User userInfo) {
    name = userInfo.getEmail();
    password = userInfo.getPassword();
    authorities = Arrays.stream(userInfo.getRole().split(","))
        .map(SimpleGrantedAuthority::new)
        .collect(Collectors.toList());
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return name;
  }
}
