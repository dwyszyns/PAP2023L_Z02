package pl.edu.pw.calendarapp.notification.rest;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NotificationView {
    private long id;
    private String message;
    private LocalDateTime notifyTime;
    private boolean seen;
}
