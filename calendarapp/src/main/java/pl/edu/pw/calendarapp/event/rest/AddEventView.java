package pl.edu.pw.calendarapp.event.rest;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class AddEventView {
    @NotBlank
    @Size(min = 1, max = 25)
    private String name;
    @NotNull
    private String startTime;
    @NotNull
    private String endTime;

//    @NotBlank
//    private String calendarName;
}
