package pl.edu.pw.calendarapp.notification.bizz;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import pl.edu.pw.calendarapp.auth.bizz.AuthUtil;
import pl.edu.pw.calendarapp.calendarmember.repo.CalendarMemberRepository;
import pl.edu.pw.calendarapp.event.repo.Event;
import pl.edu.pw.calendarapp.event.repo.EventRepository;
import pl.edu.pw.calendarapp.member.repo.MemberRepository;
import pl.edu.pw.calendarapp.notification.repo.Notification;
import pl.edu.pw.calendarapp.notification.repo.NotificationRepository;
import pl.edu.pw.calendarapp.notification.rest.AddNotificationView;
import pl.edu.pw.calendarapp.notification.rest.NotificationView;

import java.sql.Timestamp;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final EventRepository eventRepository;
    private final MemberRepository memberRepository;
    private final CalendarMemberRepository calendarMemberRepository;

    @Override
    public List<NotificationView> findAllForEventAndMember(long eventId, long memberId) {
        return notificationRepository.findAllForEventAndMember(eventId, memberId).stream()
                .map(NotificationMapper::map)
                .toList();
    }

    @Override
    public List<NotificationView> findAllForMember(long memberId) {
        final Timestamp now = new Timestamp(System.currentTimeMillis());
        return notificationRepository.findAllForMemberBefore(memberId, now).stream()
                .map(NotificationMapper::map)
                .toList();
    }


    @Override
    @Transactional
    public NotificationView addNotification(final AddNotificationView addNotificationView) {
        final Event event = eventRepository.findById(addNotificationView.getEventId()).orElseThrow(
                () -> new IllegalArgumentException("Event not found")
        );
        if (!calendarMemberRepository.memberOwnsMaintainsCalendar(
                AuthUtil.getMemberIdFromSecurityContext(),
                event.getCalendar().getCalendarId())
        ) {
            throw new AccessDeniedException("Member does not own calendar");
        }
        final Notification notification = new Notification();
        notification.setEvent(event);
        notification.setNotifyTime(Timestamp.valueOf(addNotificationView.getNotifyTime()));
        notification.setSeen(false);
        notification.setMember(memberRepository.getReferenceById(AuthUtil.getMemberIdFromSecurityContext()));
        return NotificationMapper.map(notificationRepository.save(notification));
    }

    @Override
    public void deleteNotification(long notificationId) {
        Notification notification = notificationRepository.findByIdWithMember(notificationId)
                .orElseThrow(() -> new IllegalArgumentException("Notification not found"));
        if (!notification.getMember().getMemberId().equals(AuthUtil.getMemberIdFromSecurityContext())) {
            throw new AccessDeniedException("You are not allowed to delete this notification");
        }
        notificationRepository.delete(notification);
    }

    @Override
    public void updateNotificationStatus(List<Long> ids) {
        notificationRepository.findAllByIdWithMember(ids).forEach(notification -> {
            if (!notification.getMember().getMemberId().equals(AuthUtil.getMemberIdFromSecurityContext())) {
                throw new AccessDeniedException("You are not allowed to update this notification");
            }
            notification.setSeen(true);
            notificationRepository.save(notification);
        });
    }
}