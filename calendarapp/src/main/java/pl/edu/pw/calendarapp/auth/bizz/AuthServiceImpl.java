package pl.edu.pw.calendarapp.auth.bizz;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import pl.edu.pw.calendarapp.auth.rest.MemberRegisterView;
import pl.edu.pw.calendarapp.member.repo.Member;
import pl.edu.pw.calendarapp.member.repo.MemberRepository;

import java.sql.Timestamp;
import java.time.Instant;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public void registerMember(MemberRegisterView registerView) throws IllegalArgumentException {
        if (memberRepository.findMemberByUsername(registerView.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Member with username already exists");
        } else {
            final Member member = new Member();
            member.setDateJoined(Timestamp.from(Instant.now()));
            member.setFirstName(registerView.getFirstName());
            member.setLastName(registerView.getLastName());
            member.setPassword(bCryptPasswordEncoder.encode(registerView.getPassword()));
            member.setUsername(registerView.getUsername());
            memberRepository.save(member);
        }
    }

    @Override
    public void validateMemberFromAuth(Long memberId) throws AccessDeniedException {
        if (AuthUtil.getMemberIdFromSecurityContext() != memberId) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
    }
}
