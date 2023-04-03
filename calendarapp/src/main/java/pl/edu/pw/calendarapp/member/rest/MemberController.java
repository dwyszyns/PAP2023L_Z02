package pl.edu.pw.calendarapp.member.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.edu.pw.calendarapp.member.bizz.MemberMapper;
import pl.edu.pw.calendarapp.member.bizz.MemberService;
import pl.edu.pw.calendarapp.member.repo.Member;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/current")
    public MemberView getCurrentMember(final Principal principal) {
        return MemberMapper.mapMember((Member) principal);

    }

    @GetMapping("/{memberId}")
    public MemberView getMemberById(@PathVariable("memberId") final long memberId) {
        return MemberMapper.mapMember(memberService.findById(memberId));
    }

    @GetMapping("/{memberId}/friends")
    public List<FriendView> getFriendsForMember(@PathVariable("memberId") final long memberId) {
        return memberService.getFriendsForMember(memberId).stream()
                .map(request -> MemberMapper.mapFriend(request, memberId))
                .toList();
    }

    @PostMapping("/{memberId}/friends/{requestId}")
    public void acceptFriendRequest(@PathVariable("memberId") final long memberId,
                                    @PathVariable("requestId") final long requestId) {
        memberService.acceptFriendRequest(requestId, memberId);
    }

    @DeleteMapping("/{memberId}/friends/{requestId}")
    public void rejectFriendRequest(@PathVariable("memberId") final long memberId,
                                    @PathVariable("requestId") final long requestId) {
        memberService.rejectFriendRequest(requestId, memberId);
    }

    @PostMapping("/{memberId}/friends")
    public void sendFriendRequest(@PathVariable("memberId") final long memberId,
                                  @RequestParam("friendId") final long friendId) {
        memberService.sendFriendRequest(memberId, friendId);
    }

}
