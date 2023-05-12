package pl.edu.pw.calendarapp.calendar.bizz;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.pw.calendarapp.calendar.repo.Calendar;
import pl.edu.pw.calendarapp.calendar.repo.CalendarRepository;
import pl.edu.pw.calendarapp.calendar.rest.CalendarView;
import pl.edu.pw.calendarapp.event.repo.Event;
import pl.edu.pw.calendarapp.event.repo.EventRepository;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CalendarServiceImpl implements CalendarService {
    private final CalendarRepository calendarRepository;
    private final EventRepository eventRepository;

    @Override
    public CalendarView getViewById(long memberId, long calendarId) {
        final Set<Long> subscribedIds = eventRepository.getSubscribedForMemberAndCalendar(memberId, calendarId)
                .stream()
                .map(Event::getEventId)
                .collect(Collectors.toCollection(HashSet::new));
        final Optional<CalendarView> calendar = calendarRepository.findByCalendarId(calendarId).map(CalendarMapper::map);
        calendar.map(CalendarView::getEvents)
                .ifPresent(views -> views.values().stream()
                        .flatMap(Collection::stream)
                        .forEach(view -> view.setSubscribed(subscribedIds.contains(view.getId())))
                );
        return calendar.orElse(null);
    }

    @Override
    public List<Calendar> findAllForMember(long memberId) {
        return calendarRepository.findAllForMember(memberId);
    }
}
