package pl.edu.pw.calendarapp.calendar.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.edu.pw.calendarapp.member.repo.Member;

import java.util.List;

@Repository
public interface CalendarRepository extends JpaRepository<Calendar, Long> {
    @Query("SELECT c FROM Calendar c " +
            "WHERE c.name LIKE CONCAT('%', :searchTerm, '%') " +
            "AND :member NOT IN (c.members)")
    List<Calendar> searchCalendarsForMember(@Param("searchTerm") String searchTerm, @Param("member") Member member);
}
