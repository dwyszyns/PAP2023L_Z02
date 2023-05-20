package pl.edu.pw.calendarapp.auth.bizz;

import org.springframework.security.core.context.SecurityContextHolder;
import pl.edu.pw.calendarapp.member.repo.MemberUserProjection;

public class AuthUtil {

    private AuthUtil() {
    }

    public static long getMemberIdFromSecurityContext() {
        final MemberUserProjection memberFromAuth =
                (MemberUserProjection) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return memberFromAuth.getMemberId();
    }
}
