package pl.edu.pw.calendarapp.member.bizz;


import pl.edu.pw.calendarapp.member.repo.Member;

public interface MemberService {

    Member findById(long id);
}
