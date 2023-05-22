package pl.edu.pw.calendarapp.notification.bizz;

import pl.edu.pw.calendarapp.event.repo.Event;
import pl.edu.pw.calendarapp.notification.repo.Notification;
import pl.edu.pw.calendarapp.notification.rest.NotificationView;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class NotificationMapper {
    private NotificationMapper() {
    }

    public static NotificationView map(final Notification notification) {
        NotificationView notificationView = new NotificationView();

        notificationView.setId(notification.getNotificationId());
        notificationView.setStatus(notification.getStatus());
        notificationView.setMessage(
                getMessageFromEvent(notification.getEvent()));

        return notificationView;
    }

    private static String getMessageFromEvent(final Event event) {
        final LocalDateTime start = event.getStartTime().toLocalDateTime();
        return String.format(
                "%s begins at %s o'clock on %s",
                event.getName(),
                start.toLocalTime().format(DateTimeFormatter.ofPattern("HH:mm")),
                start.toLocalDate().format(DateTimeFormatter.ofPattern("MMMM dd"))
        );
    }
}
