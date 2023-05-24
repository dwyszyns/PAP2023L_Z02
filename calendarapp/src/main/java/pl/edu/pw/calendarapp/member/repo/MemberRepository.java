package pl.edu.pw.calendarapp.member.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    @Query(value = "select cm.member from CalendarMember cm " +
            "where cm.calendar.calendarId = :calendarId " +
            "and cm.autoSubscribed = true")
    List<Member> findAutoSubscribedForCalendar(@Param("calendarId") Long calendarId);

    @Query(value = "select distinct m from Member m " +
            "left join fetch CalendarMember cm on cm.member = m " +
            "left join fetch Calendar c on cm.calendar = c " +
            "where m.memberId = :memberId")
    Optional<Member> findByIdWithCalendars(@Param("memberId") Long memberId);

    Optional<MemberUserProjection> findMemberByUsername(String username);
}
