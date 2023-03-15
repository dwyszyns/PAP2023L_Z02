package pl.edu.pw.calendarapp.calendar;

import java.util.Optional;

public interface CalendarService {

    Optional<Calendar> findById(long calendarId);
}
