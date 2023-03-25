package pl.edu.pw.calendarapp.calendar;

import pl.edu.pw.calendarapp.event.EventMapper;
import pl.edu.pw.calendarapp.event.EventView;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

public class CalendarMapper {
    private CalendarMapper() {
    }

    public static CalendarView map(final Calendar calendar) {
        return Optional.ofNullable(calendar).map(c -> {
            final CalendarView view = new CalendarView();
            view.setId(c.getCalendarId() != null ? c.getCalendarId() : -1L);
            view.setName(c.getName());
            view.setPublic(Boolean.TRUE.equals(calendar.getIsPublic()));
            final List<EventView> events = Optional.ofNullable(c.getEvents())
                    .map(l -> l.stream()
                            .map(EventMapper::map)
                            .filter(Objects::nonNull)
                            .toList())
                    .orElse(List.of());
            view.setEvents(events);
            return view;
        }).orElse(null);
    }

    public static CalendarView mapPreview(final Calendar calendar) {
        return Optional.ofNullable(calendar).map(c -> {
            final CalendarView view = new CalendarView();
            view.setId(c.getCalendarId() != null ? c.getCalendarId() : -1L);
            view.setName(c.getName());
            view.setPublic(Boolean.TRUE.equals(calendar.getIsPublic()));
            return view;
        }).orElse(null);
    }
}
