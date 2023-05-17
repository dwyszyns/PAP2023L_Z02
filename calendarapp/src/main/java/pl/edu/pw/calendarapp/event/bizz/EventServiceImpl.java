package pl.edu.pw.calendarapp.event.bizz;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.pw.calendarapp.calendar.repo.Calendar;
import pl.edu.pw.calendarapp.event.repo.Event;
import pl.edu.pw.calendarapp.event.repo.EventRepository;
import pl.edu.pw.calendarapp.event.repo.EventSubscriber;
import pl.edu.pw.calendarapp.event.rest.AddEventView;
import pl.edu.pw.calendarapp.member.repo.Member;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;
    private static final long ID_1 = 1L;


    @Override
    public List<Event> getVisibleToMember(final long memberId) {
        return eventRepository.getVisibleToMember(memberId);
    }

    @Override
    public Optional<Event> findById(long eventId) {
        return eventRepository.findById(eventId);
    }

    @Override
    public List<Event> getSubscribedForMemberAndCalendar(long memberId, long calendarId) {
        return eventRepository.getSubscribedForMemberAndCalendar(memberId, calendarId);
    }

    @Override
    public void addEvent(AddEventView eventView) {
        final Event event = new Event();
        event.setName(eventView.getName());

        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm");
            Date parsedEndDate = dateFormat.parse(eventView.getEndTime());
            Timestamp endTime = new java.sql.Timestamp(parsedEndDate.getTime());

            Date parsedStartDate = dateFormat.parse(eventView.getStartTime());
            Timestamp startTime = new java.sql.Timestamp(parsedStartDate.getTime());

            event.setStartTime(startTime);
            event.setEndTime(endTime);
        } catch (Exception e) {
        }

        Calendar cal = new Calendar();
        event.setCalendar(cal);
        cal.setCalendarId(ID_1);
        eventRepository.save(event);
    }

    private void subscribeMembersToEvent(final Event event, final List<Member> members) {
        event.setSubscribers(new ArrayList<>(Optional.ofNullable(event.getSubscribers()).orElse(List.of())));
        members.forEach(member -> {
            final EventSubscriber eventSubscriber = new EventSubscriber();
            eventSubscriber.setSubscriber(member);
            eventSubscriber.setEvent(event);
            event.getSubscribers().add(eventSubscriber);
        });
    }
}
