package com.example.test.authentication;

import com.example.test.authentication.UserDetailsImpl;
import com.example.test.entities.User;
import com.example.test.repositories.UserRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class UserDetailsImplService implements UserDetailsService {

  @Autowired
  private UserRepository repository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Optional<User> userInfo = repository.findByEmail(username);

    return userInfo.map(UserDetailsImpl::new)
        .orElseThrow(() -> new UsernameNotFoundException("user not found " + username));

  }
}
