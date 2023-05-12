package pl.edu.pw.calendarapp.auth.bizz;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pl.edu.pw.calendarapp.member.repo.MemberRepository;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
<<<<<<< HEAD:calendarapp/src/main/java/pl/edu/pw/calendarapp/config/UserDetailsServiceImpl.java
        return (UserDetails) memberRepository.findByUsername(username).orElse(null);
=======
        return memberRepository.findMemberByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
>>>>>>> main:calendarapp/src/main/java/pl/edu/pw/calendarapp/auth/bizz/UserDetailsServiceImpl.java
    }
}
