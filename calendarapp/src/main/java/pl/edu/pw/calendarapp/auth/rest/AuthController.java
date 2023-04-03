package pl.edu.pw.calendarapp.auth.rest;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.pw.calendarapp.auth.bizz.AuthService;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@Valid @RequestBody MemberRegisterView memberRegisterView) {
        try {
            authService.registerMember(memberRegisterView);
            return ResponseEntity.status(HttpStatus.OK).body(Map.of("status", "Registration successful"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("status", "error", "message", e.getMessage()));
        }
    }

    @GetMapping("/login")
    public ResponseEntity<Map<String, String>> login() {
        return ResponseEntity.status(HttpStatus.OK).body(Map.of("status", "Login successful"));
    }
}
