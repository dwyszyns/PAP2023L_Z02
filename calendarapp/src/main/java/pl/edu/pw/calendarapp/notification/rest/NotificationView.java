package pl.edu.pw.calendarapp.notification.rest;

import lombok.Data;

@Data
public class NotificationView {
    private long id;
    private String message;
    private boolean seen;
}
