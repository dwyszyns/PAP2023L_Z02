package pl.edu.pw.calendarapp.calendar;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.edu.pw.calendarapp.event.Event;
import pl.edu.pw.calendarapp.member.CalendarMember;

import java.util.List;
import java.util.Objects;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Calendar {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "calendarId", nullable = false)
    private Long calendarId;
    @Column(name = "name", nullable = false)
    private String name;

    @OneToMany(mappedBy = "calendar", cascade = CascadeType.ALL)
    private List<Event> events;

    @OneToMany(mappedBy = "calendar", cascade = CascadeType.ALL)
    private List<CalendarMember> members;

    @Override
    public boolean equals(final Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof final Calendar calendar)) {
            return false;
        }
        return calendarId.equals(calendar.calendarId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(calendarId);
    }
}
