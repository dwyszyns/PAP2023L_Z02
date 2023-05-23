package pl.edu.pw.calendarapp.notification.bizz;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import pl.edu.pw.calendarapp.notification.repo.Notification;
import pl.edu.pw.calendarapp.notification.repo.NotificationRepository;
import pl.edu.pw.calendarapp.notification.rest.NotificationView;

import java.sql.Timestamp;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    @Override
    public List<NotificationView> findAllForMember(long memberId) {
        final Timestamp now = new Timestamp(System.currentTimeMillis());
        return notificationRepository.findAllForMemberBefore(memberId, now).stream()
                .map(NotificationMapper::map)
                .toList();
    }

    @Override
    public void addNotification(Notification notification) {
        notificationRepository.save(notification);
    }

    @Override
    public void deleteNotification(long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Notification not found with ID: " + notificationId));
        notificationRepository.delete(notification);
    }
}