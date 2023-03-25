package pl.edu.pw.calendarapp.calendar.bizz;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.pw.calendarapp.calendar.repo.Calendar;
import pl.edu.pw.calendarapp.calendar.repo.CalendarRepository;
import pl.edu.pw.calendarapp.calendar.rest.CalendarView;
import pl.edu.pw.calendarapp.event.repo.Event;
import pl.edu.pw.calendarapp.event.repo.EventRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CalendarServiceImpl implements CalendarService {
    private final CalendarRepository calendarRepository;
    private final EventRepository eventRepository;

    @Override
    public Optional<Calendar> findById(long calendarId) {
        return calendarRepository.findById(calendarId);
    }

    @Override
    public List<CalendarView> findAllForMember(long memberId) {
        final List<CalendarView> calendars = calendarRepository.findAllForMember(memberId).stream()
                .map(CalendarMapper::map)
                .toList();
        final Set<Long> subscribedEventIds = eventRepository.getSubscribedByMember(memberId).stream()
                .map(Event::getEventId)
                .collect(Collectors.toCollection(HashSet::new));
        calendars.stream()
                .flatMap(calendar -> calendar.getEvents().stream())
                .forEach(event -> event.setSubscribed(subscribedEventIds.contains(event.getId())));
        return calendars;
    }
}
