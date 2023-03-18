package pl.edu.pw.calendarapp.event;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.edu.pw.calendarapp.member.Member;

@Entity
@Table(name = "event_subscriber")
@Getter
@Setter
@NoArgsConstructor
public class EventSubscriber {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "event_subscriber_id")
    private Long eventSubscriberId;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "subscriber_id", nullable = false)
    private Member subscriber;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "event_id", nullable = false)
    private Event event;
}
