package pl.edu.pw.calendarapp.member.bizz;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.edu.pw.calendarapp.member.repo.FriendRequest;
import pl.edu.pw.calendarapp.member.repo.FriendRequestRepository;
import pl.edu.pw.calendarapp.member.repo.Member;
import pl.edu.pw.calendarapp.member.repo.MemberRepository;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MemberServiceImplTest {
    @Mock
    private MemberRepository memberRepository;
    @Mock
    private FriendRequestRepository friendRequestRepository;
    @InjectMocks
    private MemberServiceImpl memberService;

    private static final long MEMBER_ID_1 = 1L;
    private static final long MEMBER_ID_2 = 2L;
    private static final long FRIEND_REQUEST_ID = 1L;

    @Test
    void sendFriendRequestFriendRequestDoesNotExist() {
        setUpMembers();
        when(friendRequestRepository.findMemberFriend(anyLong(), anyLong()))
                .thenReturn(Optional.empty());

        memberService.sendFriendRequest(MEMBER_ID_1, MEMBER_ID_2);

        verify(friendRequestRepository, times(1)).save(any(FriendRequest.class));
    }

    @Test
    void sendFriendRequestFriendRequestExists() {
        setUpMembers();
        when(friendRequestRepository.findMemberFriend(anyLong(), anyLong()))
                .thenReturn(Optional.of(new FriendRequest()));

        memberService.sendFriendRequest(MEMBER_ID_1, MEMBER_ID_2);

        verify(friendRequestRepository, times(0)).save(any(FriendRequest.class));
    }


    @Test
    void testRejectFriendRequest() {
        final FriendRequest friendRequest = new FriendRequest();
        setUpFriendRequest(friendRequest);

        memberService.rejectFriendRequest(FRIEND_REQUEST_ID, MEMBER_ID_1);

        verify(friendRequestRepository).delete(friendRequest);
    }

    @Test
    void testAcceptFriendRequest() {
        FriendRequest friendRequest = new FriendRequest();
        friendRequest.setAccepted(false);
        setUpFriendRequest(friendRequest);

        memberService.acceptFriendRequest(FRIEND_REQUEST_ID, MEMBER_ID_1);

        verify(friendRequestRepository).save(friendRequest);
        assertTrue(friendRequest.getAccepted());
    }

    private void setUpMembers() {
        Member sender = new Member();
        sender.setMemberId(MEMBER_ID_1);

        Member receiver = new Member();
        receiver.setMemberId(MEMBER_ID_2);

        when(memberRepository.findById(anyLong()))
                .thenReturn(Optional.of(sender))
                .thenReturn(Optional.of(receiver));
    }

    private void setUpFriendRequest(final FriendRequest friendRequest) {
        when(friendRequestRepository.findByIdForMember(FRIEND_REQUEST_ID, MEMBER_ID_1))
                .thenReturn(Optional.of(friendRequest));
    }
}
