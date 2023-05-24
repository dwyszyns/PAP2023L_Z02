package pl.edu.pw.calendarapp.calendar.rest;

import lombok.Data;

@Data
public class CalendarMemberView {
    private long id;
    private String name;
    private String role;
}
