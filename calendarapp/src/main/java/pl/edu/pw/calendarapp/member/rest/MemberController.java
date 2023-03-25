package pl.edu.pw.calendarapp.member.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.pw.calendarapp.member.bizz.MemberMapper;
import pl.edu.pw.calendarapp.member.bizz.MemberService;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/{memberId}")
    public MemberView getMemberById(@PathVariable("memberId") final long memberId) {
        return MemberMapper.map(memberService.findById(memberId));
    }
}
