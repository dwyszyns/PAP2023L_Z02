package pl.edu.pw.calendarapp.calendar.bizz;

import pl.edu.pw.calendarapp.calendar.repo.Calendar;
import pl.edu.pw.calendarapp.calendar.rest.CalendarView;
import pl.edu.pw.calendarapp.event.bizz.EventMapper;
import pl.edu.pw.calendarapp.event.rest.EventView;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

public class CalendarMapper {
    private CalendarMapper() {
    }

    public static CalendarView map(final Calendar calendar) {
        return Optional.ofNullable(calendar)
                .map(CalendarMapper::mapPreview)
                .map(view -> {
                    final Map<String, List<EventView>> events = Optional.ofNullable(calendar.getEvents())
                            .map(eventList -> eventList.stream()
                                    .map(EventMapper::map)
                                    .filter(Objects::nonNull)
                                    .collect(Collectors.groupingBy(event ->
                                            event.getStartDate().format(DateTimeFormatter.ISO_DATE))))
                            .orElse(Map.of());
                    view.setEvents(events);
                    return view;
                }).orElse(null);
    }

    public static CalendarView mapPreview(final Calendar calendar) {
        return Optional.ofNullable(calendar).map(c -> {
            final CalendarView view = new CalendarView();
            view.setId(c.getCalendarId() != null ? c.getCalendarId() : -1L);
            view.setName(c.getName());
            view.setPublic(Boolean.TRUE.equals(c.getIsPublic()));
            return view;
        }).orElse(null);
    }
}
