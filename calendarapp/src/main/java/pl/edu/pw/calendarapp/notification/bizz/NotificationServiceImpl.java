package pl.edu.pw.calendarapp.notification.bizz;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
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
}
