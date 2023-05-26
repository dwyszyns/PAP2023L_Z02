package pl.edu.pw.calendarapp.calendar.bizz;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.edu.pw.calendarapp.calendar.repo.Calendar;
import pl.edu.pw.calendarapp.calendar.rest.CalendarView;
import pl.edu.pw.calendarapp.calendarmember.repo.CalendarMember;
import pl.edu.pw.calendarapp.calendarmember.repo.CalendarMemberRepository;
import pl.edu.pw.calendarapp.event.repo.Event;
import pl.edu.pw.calendarapp.event.repo.EventRepository;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CalendarServiceImplTest {
    @Mock
    private CalendarMemberRepository calendarMemberRepository;

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

    private List<CalendarMember> calendarMembers;
    private CalendarMember calendarMember;
    private List<Event> events;

    @BeforeEach
    void setUp() {
        final LocalDateTime startTime = LocalDateTime.of(2023, 5, 1, 12, 0);
        calendarMembers = new ArrayList<>();
        calendarMember = new CalendarMember();
        final Calendar calendar1 = new Calendar();
        calendar1.setCalendarId(ID_1);
        calendar1.setEvents(new ArrayList<>());
        final Event event1 = new Event();
        event1.setEventId(ID_1);
        event1.setStartTime(Timestamp.valueOf(startTime));
        event1.setDuration(30);
        calendar1.getEvents().add(event1);
        calendarMember.setCalendar(calendar1);
        calendarMembers.add(calendarMember);

        final CalendarMember calendarMember2 = new CalendarMember();
        final Calendar calendar2 = new Calendar();
        calendar2.setCalendarId(ID_2);
        calendar2.setEvents(new ArrayList<>());
        final Event event2 = new Event();
        event2.setEventId(ID_2);
        event2.setStartTime(Timestamp.valueOf(startTime));
        event2.setDuration(30);
        calendar2.getEvents().add(event2);
        calendarMember2.setCalendar(calendar2);
        calendarMembers.add(calendarMember2);

        events = new ArrayList<>();
        events.add(event1);
    }

    @Test
    void testFindAllForMember() {
        when(calendarMemberRepository.findAllForMember(MEMBER_ID)).thenReturn(calendarMembers);
        List<CalendarView> result = calendarService.findAllForMember(MEMBER_ID);

        assertEquals(EXPECTED_CALENDARS_SIZE, result.size());
        assertEquals(ID_1, result.get(0).getId());
    }

    @Test
    void testFindById() {
        when(eventRepository.getSubscribedForMemberAndCalendar(MEMBER_ID, ID_1)).thenReturn(events);
        when(calendarMemberRepository.getCalendarMember(ID_1, MEMBER_ID)).thenReturn(Optional.of(calendarMember));
        CalendarView result = calendarService.findById(MEMBER_ID, ID_1).orElse(null);

        assertNotNull(result);
        assertEquals(ID_1, result.getId());
        assertEquals(EXPECTED_EVENTS_SIZE_1, result.getEvents().size());
        assertEquals(EXPECTED_EVENTS_SIZE_1, result.getEvents().size());
        assertTrue(result.getEvents().values().stream()
                .flatMap(Collection::stream)
                .toList()
                .get(0)
                .isSubscribed());
    }
}