package pl.edu.pw.calendarapp.notification.rest;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AddNotificationView {
    private LocalDateTime notifyTime;
    private long eventId;
}
