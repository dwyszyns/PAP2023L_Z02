package pl.edu.pw.calendarapp.calendar;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CalendarRepository extends JpaRepository<Calendar, Long> {
    @Query(value = "select cm.calendar from CalendarMember cm where cm.member.memberId = :memberId")
    @EntityGraph(attributePaths = {"events"})
    List<Calendar> findAllForMember(@Param("memberId") Long memberId);
}
