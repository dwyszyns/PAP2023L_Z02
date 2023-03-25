package pl.edu.pw.calendarapp.event.rest;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EventView {
    private long id;
    private String name;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private boolean subscribed;
}
