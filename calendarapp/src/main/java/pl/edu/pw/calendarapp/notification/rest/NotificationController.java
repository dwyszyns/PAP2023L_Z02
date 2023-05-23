package pl.edu.pw.calendarapp.notification.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.pw.calendarapp.notification.bizz.NotificationService;
import pl.edu.pw.calendarapp.notification.repo.Notification;

import java.util.List;

@RequestMapping("notification")
@RestController
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;

    @GetMapping("/member/{memberId}")
    public List<NotificationView> getNotificationsForMember(@PathVariable Long memberId) {
        return notificationService.findAllForMember(memberId);
    }

    @PostMapping
    public ResponseEntity<Void> addNotification(@RequestBody Notification notification) {
        notificationService.addNotification(notification);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @DeleteMapping("/{notificationId}")
    public ResponseEntity<Void> deleteNotification(@PathVariable long notificationId) {
        notificationService.deleteNotification(notificationId);
        return ResponseEntity.noContent().build();
    }

}
