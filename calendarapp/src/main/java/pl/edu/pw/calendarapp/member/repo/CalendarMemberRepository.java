package pl.edu.pw.calendarapp.member.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CalendarMemberRepository extends JpaRepository<CalendarMember, Long> {

    @Query("select count(cm) > 0 from CalendarMember cm " +
            "where cm.calendar.calendarId = :calendarId " +
            "and cm.member.memberId = :memberId " +
            "and cm.isOwner = true")
    boolean memberOwnsCalendar(Long calendarId, Long memberId);

    @Query("select cm from CalendarMember cm " +
            "where cm.calendar.calendarId = :calendarId " +
            "and cm.member.memberId = :memberId ")
    Optional<CalendarMember> getCalendarMember(Long calendarId, Long memberId);
}
