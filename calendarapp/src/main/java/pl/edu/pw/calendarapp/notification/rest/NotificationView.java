package pl.edu.pw.calendarapp.notification.rest;

import lombok.Data;
import pl.edu.pw.calendarapp.calendar.repo.Calendar;
import pl.edu.pw.calendarapp.member.repo.Member;

import java.time.LocalDateTime;

@Data
public class NotificationView {
    private long id;
    private LocalDateTime notifyTime;
    private Member member;
    private Calendar calendar;
}
