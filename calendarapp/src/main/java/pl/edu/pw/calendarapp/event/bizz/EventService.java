package pl.edu.pw.calendarapp.event.bizz;

import pl.edu.pw.calendarapp.calendar.repo.Calendar;
import pl.edu.pw.calendarapp.event.repo.Event;

import java.util.List;
import java.util.Optional;

public interface EventService {
    List<Event> getVisibleToMember(long memberId);

    Optional<Event> findById(long eventId);

    void addEvent(Event event, Calendar calendar);
}
