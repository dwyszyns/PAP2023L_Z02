package pl.edu.pw.calendarapp.notification.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.pw.calendarapp.notification.bizz.NotificationService;

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
}
