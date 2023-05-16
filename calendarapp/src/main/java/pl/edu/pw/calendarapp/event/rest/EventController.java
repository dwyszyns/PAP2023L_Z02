package pl.edu.pw.calendarapp.event.rest;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.edu.pw.calendarapp.calendar.repo.Calendar;
import pl.edu.pw.calendarapp.event.bizz.EventMapper;
import pl.edu.pw.calendarapp.event.bizz.EventService;
import pl.edu.pw.calendarapp.event.repo.Event;

import java.util.List;

@RestController
@RequestMapping("/events")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @GetMapping("{memberId}/{calendarId}")
    public List<EventView> getEventsForCalendar(@PathVariable("memberId") final long memberId,
                                                @PathVariable("calendarId") final long calendarId) {
        return eventService.getSubscribedForMemberAndCalendar(memberId, calendarId).stream().map(EventMapper::map).toList();
    }

    @PostMapping("/add")
    public void addEvent(@Valid @NotNull @RequestBody Event event, Calendar calendar) {
        eventService.addEvent(event, calendar);
    }
}
