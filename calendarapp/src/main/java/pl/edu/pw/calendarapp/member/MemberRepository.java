package pl.edu.pw.calendarapp.member;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    @Query(value = "select cm.member from CalendarMember cm where cm.calendar.calendarId = :calendarId")
    List<Member> findAllForCalendar(@Param("calendarId") Long calendarId);

    @Query(value = "select cm.member from CalendarMember cm where cm.calendar.calendarId = :calendarId and cm.autoSubscribed = true")
    List<Member> findAutoSubscribedForCalendar(@Param("calendarId") Long calendarId);
}
