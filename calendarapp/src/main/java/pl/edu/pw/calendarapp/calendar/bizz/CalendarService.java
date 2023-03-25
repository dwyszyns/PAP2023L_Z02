package pl.edu.pw.calendarapp.calendar.bizz;

import pl.edu.pw.calendarapp.calendar.repo.Calendar;
import pl.edu.pw.calendarapp.calendar.rest.CalendarView;

import java.util.List;
import java.util.Optional;

public interface CalendarService {

    Optional<Calendar> findById(long calendarId);

    List<CalendarView> findAllForMember(long memberId);
}
