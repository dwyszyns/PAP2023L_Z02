package pl.edu.pw.calendarapp.member;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.edu.pw.calendarapp.calendar.Calendar;
import pl.edu.pw.calendarapp.member.Member;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class CalendarMember {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column
    private Long calendarMemberId;
    @Column
    private Boolean isOwner;
    @Column
    private Boolean autoSubscribed;

    @ManyToOne
    @JoinColumn(name = "memberId", nullable = false)
    private Member member;

    @ManyToOne
    @JoinColumn(name = "calendarId", nullable = false)
    private Calendar calendar;
}
