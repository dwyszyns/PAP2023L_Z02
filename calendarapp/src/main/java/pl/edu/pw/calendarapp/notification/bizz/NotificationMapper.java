package pl.edu.pw.calendarapp.notification.bizz;

import pl.edu.pw.calendarapp.event.repo.Event;
import pl.edu.pw.calendarapp.member.repo.Member;
import pl.edu.pw.calendarapp.notification.repo.Notification;
import pl.edu.pw.calendarapp.notification.rest.NotificationView;

import java.util.ArrayList;
import java.util.List;

public class NotificationMapper {
    private NotificationMapper() {
    }

    public static List<NotificationView> map(final List<Notification> notificationList) {
        List<NotificationView> notificationViewList = new ArrayList<NotificationView>();

        for (Notification notification : notificationList) {
            NotificationView notificationView = new NotificationView();

            notificationView.setId(notification.getNotificationId());
            notificationView.setNotifyTime(notification.getNotifyTime().toLocalDateTime());
            notificationView.setStatus(notification.getStatus());

            Member member = notification.getMember();
            if (member != null) {
                notificationView.setMember(member);
            }

            Event event = notification.getEvent();
            if (event != null) {
                notificationView.setEvent(event);
            }

            notificationViewList.add(notificationView);
        }

        return notificationViewList;
    }
}
