package pl.edu.pw.calendarapp.calendar;

import lombok.Data;
import pl.edu.pw.calendarapp.event.EventView;

import java.util.List;

@Data
public class CalendarView {
    private long id;
    private String name;
    private boolean isPublic;
    private List<EventView> events;

}
