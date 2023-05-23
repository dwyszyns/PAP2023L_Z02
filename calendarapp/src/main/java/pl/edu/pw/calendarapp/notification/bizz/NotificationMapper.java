package pl.edu.pw.calendarapp.notification.bizz;

import pl.edu.pw.calendarapp.event.repo.Event;
import pl.edu.pw.calendarapp.notification.repo.Notification;
import pl.edu.pw.calendarapp.notification.rest.NotificationView;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

public class NotificationMapper {
    private NotificationMapper() {
    }

    public static NotificationView map(final Notification notification) {
        return Optional.ofNullable(notification).map(n -> {
            NotificationView notificationView = new NotificationView();

            notificationView.setId(n.getNotificationId());
            notificationView.setStatus(n.getStatus());
            notificationView.setMessage(
                    getMessageFromEvent(n.getEvent()));

            return notificationView;
        }).orElse(null);
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
