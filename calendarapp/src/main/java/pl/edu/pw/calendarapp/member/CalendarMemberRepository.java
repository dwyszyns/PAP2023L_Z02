package pl.edu.pw.calendarapp.member;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import pl.edu.pw.calendarapp.calendar.Calendar;

import java.util.List;

public interface CalendarMemberRepository extends JpaRepository<CalendarMember, Long> {
    @Query(value = "select cm.calendar from CalendarMember cm where cm.member.memberId = :memberId")
    @EntityGraph(attributePaths = {"calendars.events"})
    List<Calendar> findAllForMember(@Param("memberId") Long memberId);

    @Query(value = "select cm.member from CalendarMember cm where cm.calendar.calendarId = :calendarId")
    List<Member> findAllForCalendar(@Param("calendarId") Long calendarId);

    @Query(value = "select cm.member from CalendarMember cm where cm.calendar.calendarId = :calendarId and cm.autoSubscribed = true")
    List<Member> findAutoSubscribedForCalendar(@Param("calendarId") Long calendarId);
}
