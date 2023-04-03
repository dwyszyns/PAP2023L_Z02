package pl.edu.pw.calendarapp.member.repo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.edu.pw.calendarapp.event.repo.EventSubscriber;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "member")
@Getter
@Setter
@NoArgsConstructor
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "common_db_sequence")
    @Column(name = "member_id", nullable = false)
    private Long memberId;
    @Column(name = "first_name", nullable = false)
    private String firstName;
    @Column(name = "last_name", nullable = false)
    private String lastName;
    @Column(name = "username", nullable = false)
    private String username;
    @Column(name = "password", nullable = false)
    private String password;
    @Column(name = "date_joined", nullable = false)
    private Timestamp dateJoined;

    @OneToMany(mappedBy = "member")
    private List<CalendarMember> calendars;

    @OneToMany(mappedBy = "subscriber", cascade = CascadeType.ALL)
    private List<EventSubscriber> subscribedEvents;
}
