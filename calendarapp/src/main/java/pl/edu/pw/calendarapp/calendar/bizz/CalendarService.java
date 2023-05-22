package pl.edu.pw.calendarapp.calendar.bizz;

import pl.edu.pw.calendarapp.calendar.repo.Calendar;
import pl.edu.pw.calendarapp.calendar.rest.AddCalendarView;
import pl.edu.pw.calendarapp.calendar.rest.CalendarView;
import pl.edu.pw.calendarapp.calendar.rest.JoinRequestView;
import pl.edu.pw.calendarapp.member.repo.Member;

import java.util.List;
import java.util.Optional;

public interface CalendarService {

    Optional<CalendarView> findById(long memberId, long calendarId);

    Optional<Calendar> findById(long calendarId);

    List<CalendarView> findAllForMember(long memberId);

    void subscribeToCalendar(Calendar calendar, Member member);

    void deleteCalendar(Long calendarId);

    CalendarView createCalendar(AddCalendarView calendarView);

    List<JoinRequestView> getRequestsForMember(long memberId);

    void sendJoinRequest(Calendar calendar, Member member);

    void rejectRequest(Long requestId);

    void acceptRequest(Long requestId);
}
