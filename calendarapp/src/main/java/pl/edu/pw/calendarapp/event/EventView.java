package pl.edu.pw.calendarapp.event;

import lombok.Data;

import java.time.ZonedDateTime;

@Data
public class EventView {
    private long id;
    private String name;
    private ZonedDateTime startDate;
    private ZonedDateTime endDate;
    private boolean subscribed;
}
