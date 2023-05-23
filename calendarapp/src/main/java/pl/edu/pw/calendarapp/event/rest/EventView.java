package pl.edu.pw.calendarapp.event.rest;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class EventView {
    private long id;
    private String name;
    @JsonFormat(pattern = "yyyy-MM-dd hh:mm")
    private LocalDateTime startDate;
    @JsonFormat(pattern = "yyyy-MM-dd hh:mm")
    private LocalDateTime endDate;
    private boolean subscribed;
}
