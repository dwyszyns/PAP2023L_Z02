package pl.edu.pw.calendarapp.calendar.repo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.edu.pw.calendarapp.event.repo.Event;

import java.util.List;

@Entity
@Table(name = "calendar")
@Getter
@Setter
@NoArgsConstructor
public class Calendar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "calendar_id", nullable = false)
    private Long calendarId;
    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "public", nullable = false)
    private Boolean isPublic;

    @OneToMany(mappedBy = "calendar", cascade = CascadeType.ALL)
    private List<Event> events;

    @OneToMany(mappedBy = "calendar", cascade = CascadeType.ALL)
    private List<CalendarMember> members;
}
