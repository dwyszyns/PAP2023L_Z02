package pl.edu.pw.calendarapp.event;

import pl.edu.pw.calendarapp.member.Member;
import pl.edu.pw.calendarapp.calendar.Calendar;

import java.util.List;
import java.util.Optional;

public interface EventService {
    List<Event> getVisibleToMember(long memberId);

    void subscribeMembersToEvent(Event event, List<Member> members);

    Optional<Event> findById(long eventId);

    void addEvent(Event event, Calendar calendar);
}
