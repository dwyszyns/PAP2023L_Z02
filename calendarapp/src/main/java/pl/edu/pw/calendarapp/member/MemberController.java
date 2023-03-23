package pl.edu.pw.calendarapp.member;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberRepository memberRepository;

    @GetMapping("/{memberId}")
    public MemberView getMemberById(@PathVariable("memberId") final long memberId) {
        return memberRepository.findById(memberId).map(MemberMapper::map).orElse(null);
    }
}
