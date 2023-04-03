package pl.edu.pw.calendarapp.event.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    @Query(value = "select c.events from Calendar c " +
            "join fetch CalendarMember cm on cm.calendar = c " +
            "join fetch Member m on m = cm.member " +
            "where m.memberId = :memberId")
    List<Event> getVisibleToMember(@Param("memberId") final Long memberId);

    @Query(value = "select e from EventSubscriber es " +
            "join fetch Event e on e = es.event " +
            "where es.subscriber.memberId = :memberId " +
            "and e.calendar.calendarId = :calendarId")
    List<Event> getSubscribedForMemberAndCalendar(@Param("memberId") final Long memberId, @Param("calendarId") final Long calendarId);

    @Query(value = "select e from EventSubscriber es " +
            "join fetch Event e on e = es.event " +
            "where es.subscriber.memberId = :memberId")
    List<Event> getSubscribedByMember(@Param("memberId") final Long memberId);

    List<Event> findAllByName(final String name);
}
