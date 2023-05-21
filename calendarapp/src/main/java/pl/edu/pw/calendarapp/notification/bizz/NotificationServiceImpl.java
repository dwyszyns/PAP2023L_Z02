package pl.edu.pw.calendarapp.notification.bizz;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.pw.calendarapp.notification.repo.Notification;
import pl.edu.pw.calendarapp.notification.repo.NotificationRepository;
import pl.edu.pw.calendarapp.notification.rest.NotificationView;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
    private final NotificationRepository notificationRepository;

    @Override
    public Optional<Notification> findById(long notificationId) {
        return notificationRepository.findById(notificationId);
    }

    @Override
    public List<NotificationView> findAllForMember(long memberId) {
        return notificationRepository.findAllForMember(memberId);
    }
}
