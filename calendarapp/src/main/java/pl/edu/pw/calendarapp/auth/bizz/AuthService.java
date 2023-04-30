package pl.edu.pw.calendarapp.auth.bizz;

import pl.edu.pw.calendarapp.auth.rest.MemberRegisterView;

public interface AuthService {
    void registerMember(MemberRegisterView registerView) throws IllegalArgumentException;
}
