package pl.edu.pw.calendarapp.event.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.edu.pw.calendarapp.auth.bizz.AuthService;
import pl.edu.pw.calendarapp.event.bizz.EventMapper;
import pl.edu.pw.calendarapp.event.bizz.EventService;

import java.util.List;

@RestController
@RequestMapping("/events")
@RequiredArgsConstructor
public class EventController {

    private final AuthService authService;
    private final EventService eventService;

    @GetMapping("{memberId}/{calendarId}")
    public List<EventView> getEventsForCalendar(@PathVariable("memberId") final long memberId,
                                                @PathVariable("calendarId") final long calendarId) {
        authService.validateMemberFromAuth(memberId);
        return eventService.getSubscribedForMemberAndCalendar(memberId, calendarId).stream().map(EventMapper::map).toList();
    }

    @PostMapping
    public void addEvent(@RequestBody AddEventView event) {
        eventService.addEvent(event);
    }

    @DeleteMapping("{eventId}")
    public void removeEvent(@PathVariable("eventId") final long eventId) {
        eventService.removeEvent(eventId);
    }
}
