package pl.edu.pw.calendarapp.member.bizz;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.pw.calendarapp.member.repo.FriendRequest;
import pl.edu.pw.calendarapp.member.repo.FriendRequestRepository;
import pl.edu.pw.calendarapp.member.repo.Member;
import pl.edu.pw.calendarapp.member.repo.MemberRepository;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final FriendRequestRepository friendRequestRepository;

    @Override
    public Member findById(long memberId) {
        return memberRepository.findByIdWithCalendars(memberId).orElse(null);
    }

    @Override
    public List<FriendRequest> getFriendsForMember(long id) {
        return friendRequestRepository.findAllFriendsOrRequestsForMember(id);
    }

    @Override
    public void rejectFriendRequest(final long requestId, final long memberId) {
        friendRequestRepository.findByIdForMember(requestId, memberId)
                .ifPresent(friendRequestRepository::delete);
    }

    @Override
    public void acceptFriendRequest(final long requestId, final long memberId) {
        friendRequestRepository.findByIdForMember(requestId, memberId)
                .ifPresent(req -> {
                    req.setAccepted(true);
                    friendRequestRepository.save(req);
                });
    }

    @Override
    public void sendFriendRequest(long senderId, long receiverId) {
        final Member sender = memberRepository.findById(senderId).orElseThrow();
        final Member receiver = memberRepository.findById(receiverId).orElseThrow();
        final Optional<FriendRequest> friendRequestOpt = friendRequestRepository.findMemberFriend(senderId, receiverId);
        if (friendRequestOpt.isEmpty()) {
            final FriendRequest friendRequest = new FriendRequest();
            friendRequest.setSender(sender);
            friendRequest.setReceiver(receiver);
            friendRequestRepository.save(friendRequest);
        }
    }

}
