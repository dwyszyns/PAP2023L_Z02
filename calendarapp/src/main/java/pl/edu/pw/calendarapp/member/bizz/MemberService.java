package pl.edu.pw.calendarapp.member.bizz;


import pl.edu.pw.calendarapp.member.repo.FriendRequest;
import pl.edu.pw.calendarapp.member.repo.Member;

import java.util.List;

public interface MemberService {

    Member findById(long id);

    List<FriendRequest> getFriendsForMember(long id);

    void rejectFriendRequest(long requestId, long memberId);

    void acceptFriendRequest(long requestId, long memberId);

    void sendFriendRequest(long senderId, long receiverId);
}
