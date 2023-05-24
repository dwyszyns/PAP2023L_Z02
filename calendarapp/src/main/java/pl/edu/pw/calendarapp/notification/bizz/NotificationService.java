package pl.edu.pw.calendarapp.notification.bizz;

import pl.edu.pw.calendarapp.notification.rest.AddNotificationView;
import pl.edu.pw.calendarapp.notification.rest.NotificationView;

import java.util.List;

public interface NotificationService {

    List<NotificationView> findAllForEventAndMember(long eventId, long memberId);

    List<NotificationView> findAllForMember(long memberId);

    NotificationView addNotification(AddNotificationView addNotificationView);

    void deleteNotification(long notificationId);

    void updateNotificationStatus(List<Long> ids);
}
