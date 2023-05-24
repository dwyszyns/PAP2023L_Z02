package pl.edu.pw.calendarapp.calendar.bizz;

import pl.edu.pw.calendarapp.calendar.repo.Calendar;
import pl.edu.pw.calendarapp.calendar.rest.AddCalendarView;
import pl.edu.pw.calendarapp.calendar.rest.CalendarView;

import java.util.List;
import java.util.Optional;

public interface CalendarService {

    Optional<CalendarView> findById(long memberId, long calendarId);

    Optional<Calendar> findById(long calendarId);

    List<CalendarView> findAllForMember(long memberId);

    void deleteCalendar(Long calendarId);

    CalendarView createCalendar(AddCalendarView calendarView);
}
