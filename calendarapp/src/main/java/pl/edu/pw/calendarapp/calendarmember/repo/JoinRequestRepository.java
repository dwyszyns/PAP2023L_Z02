package pl.edu.pw.calendarapp.calendarmember.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface JoinRequestRepository extends JpaRepository<JoinRequest, Long> {

    @Query(value = "select jr from JoinRequest jr where jr.receiver.memberId = :memberId")
    List<JoinRequest> findByReceiver(Long memberId);


    @Query(value = "select jr from JoinRequest jr " +
            "join fetch jr.receiver r " +
            "join fetch jr.sender s " +
            "join fetch jr.calendar c " +
            "where jr.requestId = :requestId")
    Optional<JoinRequest> findByIdWithRefs(Long requestId);
}
