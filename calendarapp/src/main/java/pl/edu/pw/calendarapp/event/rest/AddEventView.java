package pl.edu.pw.calendarapp.event.rest;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AddEventView {
    @NotBlank
    @Size(min = 1, max = 25)
    private String name;
    private LocalDateTime startTime;
    private Integer duration;
    @NotBlank
    private Long calendarId;
}
