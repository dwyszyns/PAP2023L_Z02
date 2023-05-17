package pl.edu.pw.calendarapp.event.bizz;

import pl.edu.pw.calendarapp.event.repo.Event;
import pl.edu.pw.calendarapp.event.rest.AddEventView;

import java.util.List;
import java.util.Optional;

public interface EventService {
    List<Event> getVisibleToMember(long memberId);

    Optional<Event> findById(long eventId);

    List<Event> getSubscribedForMemberAndCalendar(long memberId, long calendarId);

    void addEvent(AddEventView event);
}
