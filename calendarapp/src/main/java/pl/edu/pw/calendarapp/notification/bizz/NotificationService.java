package pl.edu.pw.calendarapp.notification.bizz;

import pl.edu.pw.calendarapp.notification.repo.Notification;
import pl.edu.pw.calendarapp.notification.rest.NotificationView;

import java.util.List;
import java.util.Optional;

public interface NotificationService {

    Optional<Notification> findById(long notificationId);

    List<NotificationView> findAllForMember(long memberId);
}
