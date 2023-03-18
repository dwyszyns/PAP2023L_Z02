package pl.edu.pw.calendarapp.event;


import pl.edu.pw.calendarapp.common.DateUtil;

import java.util.Optional;

public class EventMapper {
    private EventMapper() {
    }

    public static EventView map(final Event event) {
        return Optional.ofNullable(event).map(e -> {
            final EventView view = new EventView();
            view.setId(e.getEventId() != null ? e.getEventId() : -1L);
            view.setName(e.getName());
            Optional.ofNullable(e.getStartTime()).ifPresent(date -> view.setStartDate(DateUtil.getDateTimeFromMilli(date)));
            Optional.ofNullable(e.getEndTime()).ifPresent(date -> view.setEndDate(DateUtil.getDateTimeFromMilli(date)));
            return view;
        }).orElse(null);
    }
}
