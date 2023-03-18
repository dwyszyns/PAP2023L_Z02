package pl.edu.pw.calendarapp.member;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CalendarMemberRepository extends JpaRepository<CalendarMember, Long> {
}
