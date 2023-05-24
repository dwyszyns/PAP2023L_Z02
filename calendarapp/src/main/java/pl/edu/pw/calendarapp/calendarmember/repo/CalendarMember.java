package pl.edu.pw.calendarapp.calendarmember.repo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.edu.pw.calendarapp.calendar.repo.Calendar;
import pl.edu.pw.calendarapp.member.repo.Member;

@Entity
@Table(name = "calendar_member")
@Getter
@Setter
@NoArgsConstructor
public class CalendarMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "calendar_member_id", nullable = false)
    private Long calendarMemberId;
    @Column(name = "role")
    private String role;
    @Column(name = "auto_subscribed")
    private Boolean autoSubscribed;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne
    @JoinColumn(name = "calendar_id", nullable = false)
    private Calendar calendar;
}
