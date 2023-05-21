package pl.edu.pw.calendarapp.event.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface EventSubscriberRepository extends JpaRepository<EventSubscriber, Long> {
    @Transactional
    @Modifying
    @Query("delete from EventSubscriber e " +
            "where e.event.eventId = :eventId " +
            "and e.subscriber.memberId = :memberId")
    void deleteByEventIdAndMemberId(@Param("eventId") Long eventId, @Param("memberId") Long memberId);

}
