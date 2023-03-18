package pl.edu.pw.calendarapp.event;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.edu.pw.calendarapp.calendar.Calendar;
import pl.edu.pw.calendarapp.member.Member;
import pl.edu.pw.calendarapp.member.MemberRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {

    private final MemberRepository memberRepository;
    private final EventRepository eventRepository;

    @Override
    public List<Event> getVisibleToMember(final long memberId) {
        return eventRepository.getVisibleToMember(memberId);
    }

    @Override
    public void subscribeMembersToEvent(final Event event, final List<Member> members) {
        event.setSubscribers(new ArrayList<>(Optional.ofNullable(event.getSubscribers()).orElse(List.of())));
        members.forEach(member -> {
            final EventSubscriber eventSubscriber = new EventSubscriber();
            eventSubscriber.setSubscriber(member);
            eventSubscriber.setEvent(event);
            event.getSubscribers().add(eventSubscriber);
        });
    }

    @Override
    public Optional<Event> findById(long eventId) {
        return eventRepository.findById(eventId);
    }

    @Override
    @Transactional
    public void addEvent(final Event event, final Calendar calendar) {
        event.setCalendar(calendar);
        subscribeMembersToEvent(event, memberRepository.findAutoSubscribedForCalendar(calendar.getCalendarId()));
        eventRepository.save(event);
    }
}
