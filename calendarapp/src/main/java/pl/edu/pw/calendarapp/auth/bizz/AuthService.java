package pl.edu.pw.calendarapp.auth.bizz;

import org.springframework.security.access.AccessDeniedException;
import pl.edu.pw.calendarapp.auth.rest.MemberRegisterView;

public interface AuthService {
    void registerMember(MemberRegisterView registerView) throws IllegalArgumentException;

    void isMemberFromAuth(Long memberId) throws AccessDeniedException;
}
