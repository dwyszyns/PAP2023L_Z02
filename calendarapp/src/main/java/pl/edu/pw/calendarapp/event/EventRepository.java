package pl.edu.pw.calendarapp.event;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    @Query(value = "select c.events from Calendar c join fetch CalendarMember cm join fetch Member m where m.memberId = :memberId")
    List<Event> getVisibleToMember(@Param("memberId") final Long memberId);
}
