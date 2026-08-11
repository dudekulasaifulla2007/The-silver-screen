package com.silverscreen;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // ================= SIGN UP =================

    @PostMapping("/signup")
    public String signup(@RequestBody User user) {

        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return "Email already exists";
        }

        userRepository.save(user);

        return "Signup Successful";
    }
// ================= LOGIN =================

@PostMapping("/login")
public Object login(@RequestBody User user) {

    Optional<User> existingUser =
            userRepository.findByEmail(user.getEmail());

    // Account does not exist
    if (existingUser.isEmpty()) {
        return "Account doesn't exist";
    }

    // Account exists, but password is wrong
    if (!existingUser.get().getPassword().equals(user.getPassword())) {
        return "Invalid Email or Password";
    }

    // Login successful
    return existingUser.get();
}
}
