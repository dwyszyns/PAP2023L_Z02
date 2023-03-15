package pl.edu.pw.calendarapp.event;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.edu.pw.calendarapp.member.Member;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class EventSubscriber {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column
    private Long eventSubscriberId;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "subscriberId", nullable = false)
    private Member subscriber;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "eventId", nullable = false)
    private Event event;
}
