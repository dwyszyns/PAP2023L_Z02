package pl.edu.pw.calendarapp.member;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.edu.pw.calendarapp.event.EventSubscriber;

import java.util.List;

@Entity
@Table(name = "member")
@Getter
@Setter
@NoArgsConstructor
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "member_id", nullable = false)
    private Long memberId;
    @Column(name = "first_name", nullable = false)
    private String firstName;
    @Column(name = "last_name", nullable = false)
    private String lastName;
    @Column(name = "username", nullable = false)
    private String username;

    @OneToMany(mappedBy = "member")
    private List<CalendarMember> calendars;

    @OneToMany(mappedBy = "subscriber", cascade = CascadeType.ALL)
    private List<EventSubscriber> subscribedEvents;
}
