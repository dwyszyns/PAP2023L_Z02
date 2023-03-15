package pl.edu.pw.calendarapp.event;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.edu.pw.calendarapp.calendar.Calendar;

import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "eventId", nullable = false)
    private Long eventId;
    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "startTime", nullable = false)
    private Long startTime;
    @Column(name = "endTime", nullable = false)
    private Long endTime;

    @ManyToOne
    @JoinColumn(name = "calendarId")
    private Calendar calendar;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "event")
    private List<EventSubscriber> subscribers;

    @Override
    public boolean equals(final Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof final Event event)) {
            return false;
        }
        return eventId.equals(event.eventId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(eventId);
    }
}
