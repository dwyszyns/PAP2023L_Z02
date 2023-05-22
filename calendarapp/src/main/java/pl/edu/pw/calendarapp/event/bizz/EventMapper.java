package pl.edu.pw.calendarapp.event.bizz;


import pl.edu.pw.calendarapp.event.repo.Event;
import pl.edu.pw.calendarapp.event.rest.AddEventView;
import pl.edu.pw.calendarapp.event.rest.EventView;

import java.sql.Timestamp;
import java.util.Optional;

public class EventMapper {
    private EventMapper() {
    }

    public static EventView map(final Event event) {
        return Optional.ofNullable(event).map(e -> {
            final EventView view = new EventView();
            view.setId(e.getEventId() != null ? e.getEventId() : -1L);
            view.setName(e.getName());
            view.setStartDate(event.getStartTime().toLocalDateTime());
            view.setEndDate(event.getStartTime().toLocalDateTime().plusMinutes(e.getDuration()));
            return view;
        }).orElse(null);
    }

    public static Event mapFromRequest(final AddEventView addEventView) {
        return Optional.ofNullable(addEventView).map(aev -> {
            final Event event = new Event();
            event.setName(aev.getName());
            event.setStartTime(Timestamp.valueOf(aev.getStartTime()));
            event.setDuration(aev.getDuration());
            return event;
        }).orElse(null);
    }
}
