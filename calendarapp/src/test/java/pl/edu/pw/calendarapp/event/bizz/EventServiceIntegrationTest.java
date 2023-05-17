package pl.edu.pw.calendarapp.event.bizz;

import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;
import pl.edu.pw.calendarapp.calendar.repo.Calendar;
import pl.edu.pw.calendarapp.calendar.repo.CalendarRepository;
import pl.edu.pw.calendarapp.event.repo.Event;
import pl.edu.pw.calendarapp.event.repo.EventRepository;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@AutoConfigureTestDatabase
@Tag("IntegrationTest")
class EventServiceIntegrationTest {

    @Autowired
    private EventService eventService;
    @Autowired
    private CalendarRepository calendarRepository;
    @Autowired
    private EventRepository eventRepository;

    private static final Long CALENDAR_WITH_SUBSCRIBERS_ID = 1L;
    private static final String EVENT_NAME = "test event";
    private static final int SUBSCRIBER_COUNT = 3;
    private static final int EXPECTED_LIST_SIZE = 1;

    @Test
    @Transactional
    void addEvent() {
        final Optional<Calendar> calendarOpt = calendarRepository.findById(CALENDAR_WITH_SUBSCRIBERS_ID);
        assertTrue(calendarOpt.isPresent());

//        eventService.addEvent(prepareEvent(), calendarOpt.get());
//
//        final List<Event> eventAfterUpdateList = eventRepository.findAllByName(EVENT_NAME);
//        assertEquals(EXPECTED_LIST_SIZE, eventAfterUpdateList.size());
//        assertEquals(SUBSCRIBER_COUNT, eventAfterUpdateList.get(0).getSubscribers().size());
    }

    private static Event prepareEvent() {
        final Event event = new Event();
        event.setName(EVENT_NAME);
        event.setStartTime(Timestamp.from(Instant.now()));
        event.setEndTime(Timestamp.from(Instant.now()));
        return event;
    }
}