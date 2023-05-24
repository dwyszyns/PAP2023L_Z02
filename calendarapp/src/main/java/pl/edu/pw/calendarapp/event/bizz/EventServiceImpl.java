package pl.edu.pw.calendarapp.event.bizz;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import pl.edu.pw.calendarapp.auth.bizz.AuthUtil;
import pl.edu.pw.calendarapp.calendar.repo.Calendar;
import pl.edu.pw.calendarapp.calendar.repo.CalendarMemberRepository;
import pl.edu.pw.calendarapp.calendar.repo.CalendarRepository;
import pl.edu.pw.calendarapp.event.repo.Event;
import pl.edu.pw.calendarapp.event.repo.EventRepository;
import pl.edu.pw.calendarapp.event.repo.EventSubscriber;
import pl.edu.pw.calendarapp.event.repo.EventSubscriberRepository;
import pl.edu.pw.calendarapp.event.rest.AddEventView;
import pl.edu.pw.calendarapp.member.repo.Member;
import pl.edu.pw.calendarapp.member.repo.MemberRepository;
import pl.edu.pw.calendarapp.notification.repo.Notification;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {

    private final CalendarMemberRepository calendarMemberRepository;
    private final CalendarRepository calendarRepository;
    private final EventRepository eventRepository;
    private final MemberRepository memberRepository;
    private final EventSubscriberRepository eventSubscriberRepository;

    private static final int MINUTES_TO_NOTIFY = 15;


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

    @Transactional
    @Override
    public void addEvent(AddEventView eventView) {
        if (!calendarMemberRepository.memberOwnsCalendar(
                eventView.getCalendarId(),
                AuthUtil.getMemberIdFromSecurityContext())
        ) {
            throw new AccessDeniedException("Member does not own calendar");
        }
        final Calendar calendar = calendarRepository.getReferenceById(eventView.getCalendarId());
        final Event event = EventMapper.mapFromRequest(eventView);
        event.setCalendar(calendar);
        subscribeMembersToEvent(event, memberRepository.findAutoSubscribedForCalendar(calendar.getCalendarId()));
        eventRepository.save(event);
    }

    @Transactional
    @Override
    public void removeEvent(long eventId) {
        eventRepository.findById(eventId)
                .ifPresent(event -> {
                    if (calendarMemberRepository.memberOwnsCalendar(
                            AuthUtil.getMemberIdFromSecurityContext(),
                            event.getCalendar().getCalendarId())
                    ) {
                        eventRepository.delete(event);
                    } else {
                        eventSubscriberRepository.deleteByEventIdAndMemberId(
                                event.getEventId(),
                                AuthUtil.getMemberIdFromSecurityContext());
                    }
                });
    }

    private void subscribeMembersToEvent(final Event event, final List<Member> members) {
        event.setSubscribers(new ArrayList<>(Optional.ofNullable(event.getSubscribers()).orElse(List.of())));
        event.setNotifications(new ArrayList<>(Optional.ofNullable(event.getNotifications()).orElse(List.of())));
        members.forEach(member -> {
            final EventSubscriber eventSubscriber = new EventSubscriber();
            eventSubscriber.setSubscriber(member);
            eventSubscriber.setEvent(event);

            final Notification notification = new Notification();
            notification.setMember(member);
            notification.setEvent(event);
            notification.setNotifyTime(
                    Timestamp.valueOf(event.getStartTime().toLocalDateTime().minusMinutes(MINUTES_TO_NOTIFY)));

            event.getSubscribers().add(eventSubscriber);
            event.getNotifications().add(notification);
        });
    }
}
