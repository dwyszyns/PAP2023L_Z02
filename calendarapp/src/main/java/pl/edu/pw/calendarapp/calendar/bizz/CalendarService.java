package pl.edu.pw.calendarapp.calendar.bizz;

import pl.edu.pw.calendarapp.calendar.repo.Calendar;
import pl.edu.pw.calendarapp.calendar.rest.CalendarView;

import java.util.List;

public interface CalendarService {

    CalendarView getViewById(long memberId, long calendarId);

    List<Calendar> findAllForMember(long memberId);
}
