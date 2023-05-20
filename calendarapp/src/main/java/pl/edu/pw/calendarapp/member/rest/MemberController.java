package pl.edu.pw.calendarapp.member.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import pl.edu.pw.calendarapp.auth.bizz.AuthService;
import pl.edu.pw.calendarapp.auth.bizz.AuthUtil;
import pl.edu.pw.calendarapp.member.bizz.MemberMapper;
import pl.edu.pw.calendarapp.member.bizz.MemberService;

import java.util.List;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final AuthService authService;
    private final MemberService memberService;

    @GetMapping("/current")
    public MemberView getCurrentMember() {
        final long memberId = AuthUtil.getMemberIdFromSecurityContext();
        return MemberMapper.mapMember(memberService.findById(memberId).orElse(null));

    }

    @GetMapping("/{memberId}")
    public MemberView getMemberById(@PathVariable("memberId") final long memberId) {
        return MemberMapper.mapMember(memberService.findById(memberId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Member not found")));
    }

    @GetMapping("/{memberId}/friends")
    public List<FriendView> getFriendsForMember(@PathVariable("memberId") final long memberId) {
        return memberService.getFriendsForMember(memberId).stream()
                .map(request -> MemberMapper.mapFriend(request, memberId))
                .toList();
    }

    @GetMapping("/current/friends")
    public List<FriendView> getFriendsForCurrentMember() {
        final long memberId = AuthUtil.getMemberIdFromSecurityContext();
        return memberService.getFriendsForMember(memberId).stream()
                .map(request -> MemberMapper.mapFriend(request, memberId))
                .toList();
    }

    @PostMapping("/{memberId}/friends/{requestId}")
    public void acceptFriendRequest(@PathVariable("memberId") final long memberId,
                                    @PathVariable("requestId") final long requestId) {
        authService.isMemberFromAuth(memberId);
        memberService.acceptFriendRequest(requestId, memberId);
    }

    @DeleteMapping("/{memberId}/friends/{requestId}")
    public void rejectFriendRequest(@PathVariable("memberId") final long memberId,
                                    @PathVariable("requestId") final long requestId) {
        authService.isMemberFromAuth(memberId);
        memberService.rejectFriendRequest(requestId, memberId);
    }

    @PostMapping("/{memberId}/friends")
    public void sendFriendRequest(@PathVariable("memberId") final long memberId,
                                  @RequestParam("friendId") final long friendId) {
        authService.isMemberFromAuth(memberId);
        memberService.sendFriendRequest(memberId, friendId);
    }

}
