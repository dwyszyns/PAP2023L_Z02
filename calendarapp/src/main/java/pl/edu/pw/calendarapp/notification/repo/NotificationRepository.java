package pl.edu.pw.calendarapp.notification.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    @Query(value = "select n from Notification n where n.member.memberId = :memberId")
    List<Notification> findAllForMember(@Param("memberId") Long memberId);
}
