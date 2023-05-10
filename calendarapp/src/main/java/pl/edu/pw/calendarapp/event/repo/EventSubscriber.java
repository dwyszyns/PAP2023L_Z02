package pl.edu.pw.calendarapp.event.repo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.edu.pw.calendarapp.member.repo.Member;

@Entity
@Table(name = "event_subscriber")
@Getter
@Setter
@NoArgsConstructor
public class EventSubscriber {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "event_subscriber_id")
    private Long eventSubscriberId;

    @ManyToOne
    @JoinColumn(name = "subscriber_id", nullable = false)
    private Member subscriber;

    @ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;
}
