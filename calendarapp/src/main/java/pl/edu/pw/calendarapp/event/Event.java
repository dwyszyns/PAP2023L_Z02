package pl.edu.pw.calendarapp.event;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.edu.pw.calendarapp.calendar.Calendar;

import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "event")
@Getter
@Setter
@NoArgsConstructor
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "common_db_sequence")
    @Column(name = "event_id", nullable = false)
    private Long eventId;
    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "start_time", nullable = false)
    private Long startTime;
    @Column(name = "end_time", nullable = false)
    private Long endTime;

    @ManyToOne
    @JoinColumn(name = "calendar_id")
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
