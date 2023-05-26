package pl.edu.pw.calendarapp.calendarmember.bizz;

import pl.edu.pw.calendarapp.calendar.repo.Calendar;
import pl.edu.pw.calendarapp.calendarmember.rest.CalendarMemberView;
import pl.edu.pw.calendarapp.calendarmember.rest.JoinRequestView;
import pl.edu.pw.calendarapp.member.repo.Member;

import java.util.List;

public interface CalendarMemberService {
    void subscribeToCalendar(Calendar calendar, Member member);

    void setRoleByCalendarAndMember(Calendar calendar, Member member, String role);
    
    void deleteByCalendarAndMember(Calendar calendar, Member member);

    List<JoinRequestView> getRequestsForMember(long memberId);

    void sendJoinRequest(Calendar calendar, Member member);

    void rejectRequest(Long requestId);

    void acceptRequest(Long requestId);

    List<CalendarMemberView> getMembersForCalendar(Long calendarId);
}
