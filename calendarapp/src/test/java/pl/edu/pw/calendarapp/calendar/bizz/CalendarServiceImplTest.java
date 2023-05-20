package pl.edu.pw.calendarapp.calendar.bizz;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.edu.pw.calendarapp.calendar.repo.Calendar;
import pl.edu.pw.calendarapp.calendar.repo.CalendarRepository;
import pl.edu.pw.calendarapp.calendar.rest.CalendarView;
import pl.edu.pw.calendarapp.event.repo.Event;
import pl.edu.pw.calendarapp.event.repo.EventRepository;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CalendarServiceImplTest {

    @Mock
    private CalendarRepository calendarRepository;

    @Mock
    private EventRepository eventRepository;

    @InjectMocks
    private CalendarServiceImpl calendarService;

    private static final long MEMBER_ID = 12345L;
    private static final long ID_1 = 1L;
    private static final long ID_2 = 2L;
    private static final int EXPECTED_CALENDARS_SIZE = 2;
    private static final int EXPECTED_EVENTS_SIZE_1 = 1;
    private static final int EXPECTED_EVENTS_SIZE_2 = 1;

    @BeforeEach
    void setUp() {
        final LocalDateTime startTime = LocalDateTime.of(2023, 5, 1, 12, 0);
        final List<Calendar> calendars = new ArrayList<>();
        final Calendar calendar1 = new Calendar();
        calendar1.setCalendarId(ID_1);
        calendar1.setEvents(new ArrayList<>());
        final Event event1 = new Event();
        event1.setEventId(ID_1);
        event1.setStartTime(Timestamp.valueOf(startTime));
        calendar1.getEvents().add(event1);
        calendars.add(calendar1);

        final Calendar calendar2 = new Calendar();
        calendar2.setCalendarId(ID_2);
        calendar2.setEvents(new ArrayList<>());
        final Event event2 = new Event();
        event2.setEventId(ID_2);
        event2.setStartTime(Timestamp.valueOf(startTime));
        calendar2.getEvents().add(event2);
        calendars.add(calendar2);

        when(calendarRepository.findAllForMember(MEMBER_ID)).thenReturn(calendars);

        List<Event> subscribedEvents = new ArrayList<>();
        subscribedEvents.add(event1);
        when(eventRepository.getSubscribedByMember(MEMBER_ID)).thenReturn(subscribedEvents);
    }

    @Test
    void testFindAllForMember() {
        List<CalendarView> result = calendarService.findAllForMember(MEMBER_ID);

        assertEquals(EXPECTED_CALENDARS_SIZE, result.size());
        assertEquals(ID_1, result.get(0).getId());
        assertEquals(EXPECTED_EVENTS_SIZE_1, result.get(0).getEvents().size());
        assertTrue(result.get(0).getEvents().values().stream()
                .flatMap(Collection::stream)
                .toList()
                .get(0)
                .isSubscribed());
        assertEquals(ID_2, result.get(1).getId());
        assertEquals(EXPECTED_EVENTS_SIZE_2, result.get(1).getEvents().size());
        assertFalse(result.get(1).getEvents().values().stream()
                .flatMap(Collection::stream)
                .toList()
                .get(0)
                .isSubscribed());
    }
}