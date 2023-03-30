package pl.edu.pw.calendarapp.member.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {

    @Query(value = "select f from FriendRequest f " +
            "where (f.sender.memberId = :memberId and f.accepted = true) " +
            "or f.receiver.memberId = :memberId " +
            "order by f.accepted")
    List<FriendRequest> findAllFriendsOrRequestsForMember(@Param("memberId") long memberId);

    @Query(value = "select f from FriendRequest f " +
            "where (f.sender.memberId = :memberId and f.receiver.memberId = :friendId) " +
            "or (f.receiver.memberId = :memberId and f.sender.memberId = :friendId)")
    Optional<FriendRequest> findMemberFriend(@Param("memberId") long memberId, @Param("friendId") long friendId);


    @Query(value = "select f from FriendRequest f " +
            "where f.requestId = :requestId " +
            "and (f.sender.memberId = :memberId or f.receiver.memberId = :memberId)")
    Optional<FriendRequest> findByIdForMember(@Param("requestId") long requestId, @Param("memberId") long memberId);
}
