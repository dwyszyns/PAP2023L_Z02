package pl.edu.pw.calendarapp.notification.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    @Query(value = "select n from Notification n " +
            "where n.member.memberId = :memberId " +
            "and n.notifyTime < :now " +
            "and n.event.startTime > :now")
    List<Notification> findAllForMemberBefore(@Param("memberId") Long memberId, @Param("now") Timestamp now);
}
