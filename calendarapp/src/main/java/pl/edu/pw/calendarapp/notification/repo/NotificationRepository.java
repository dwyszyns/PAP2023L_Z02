package pl.edu.pw.calendarapp.notification.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    @Query(value = "select n from Notification n " +
            "where n.event.eventId = :eventId ")
    List<Notification> findAllForEvent(@Param("eventId") Long eventId);

    @Query(value = "select n from Notification n " +
            "where n.member.memberId = :memberId " +
            "and n.notifyTime < :now " +
            "and n.event.startTime > :now")
    List<Notification> findAllForMemberBefore(@Param("memberId") Long memberId, @Param("now") Timestamp now);


    @Query(value = "select n from Notification n " +
            "join fetch n.member m " +
            "where n.notificationId = :notificationId")
    Optional<Notification> findByIdWithMember(@Param("notificationId") Long notificationId);

    @Query(value = "select n from Notification n " +
            "join fetch n.member m " +
            "where n.notificationId in :ids")
    List<Notification> findAllByIdWithMember(List<Long> ids);
}
