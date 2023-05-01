package pl.edu.pw.calendarapp.auth.bizz;

import pl.edu.pw.calendarapp.member.repo.MemberUserProjection;

public class MemberUserProjectionMock implements MemberUserProjection {
    @Override
    public Long getMemberId() {
        return null;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return null;
    }
}
