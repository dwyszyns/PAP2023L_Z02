package pl.edu.pw.calendarapp.event.repo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.edu.pw.calendarapp.calendar.repo.Calendar;
import pl.edu.pw.calendarapp.notification.repo.Notification;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "event")
@Getter
@Setter
@NoArgsConstructor
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_id", nullable = false)
    private Long eventId;
    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "start_time", nullable = false)
    private Timestamp startTime;
    @Column(name = "duration", nullable = false)
    private Integer duration;

    @ManyToOne
    @JoinColumn(name = "calendar_id")
    private Calendar calendar;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    private List<Notification> notifications;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    private List<EventSubscriber> subscribers;
}
