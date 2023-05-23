package pl.edu.pw.calendarapp.notification.bizz;

import pl.edu.pw.calendarapp.notification.repo.Notification;
import pl.edu.pw.calendarapp.notification.rest.NotificationView;

import java.util.List;

public interface NotificationService {

    List<NotificationView> findAllForMember(long memberId);

    void addNotification(Notification notification);

    void deleteNotification(long notificationId);
}
