package pl.edu.pw.calendarapp.notification.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.edu.pw.calendarapp.auth.bizz.AuthUtil;
import pl.edu.pw.calendarapp.notification.bizz.NotificationService;

import java.util.List;


@RequestMapping("notification")
@RestController
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;

    @GetMapping("/event/{eventId}")
    public List<NotificationView> getNotificationsForEvent(@PathVariable Long eventId) {
        return notificationService.findAllForEventAndMember(eventId, AuthUtil.getMemberIdFromSecurityContext());
    }

    @GetMapping("/member/{memberId}")
    public List<NotificationView> getNotificationsForMember(@PathVariable Long memberId) {
        return notificationService.findAllForMember(AuthUtil.getMemberIdFromSecurityContext());
    }

    @PostMapping("/update")
    public void updateNotificationStatus(@RequestBody List<Long> ids) {
        notificationService.updateNotificationStatus(ids);
    }


    @PostMapping
    public NotificationView addNotification(@RequestBody AddNotificationView addNotificationView) {
        return notificationService.addNotification(addNotificationView);
    }

    @DeleteMapping("/{notificationId}")
    public void deleteNotification(@PathVariable long notificationId) {
        notificationService.deleteNotification(notificationId);
    }

}
