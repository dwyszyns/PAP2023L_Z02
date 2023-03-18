package pl.edu.pw.calendarapp.member;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.edu.pw.calendarapp.calendar.Calendar;

@Entity
@Table(name = "calendar_member")
@Getter
@Setter
@NoArgsConstructor
public class CalendarMember {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "common_db_sequence")
    @Column(name = "calendar_member_id", nullable = false)
    private Long calendarMemberId;
    @Column(name = "is_owner")
    private Boolean isOwner;
    @Column(name = "auto_subscribed")
    private Boolean autoSubscribed;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne
    @JoinColumn(name = "calendar_id", nullable = false)
    private Calendar calendar;
}
