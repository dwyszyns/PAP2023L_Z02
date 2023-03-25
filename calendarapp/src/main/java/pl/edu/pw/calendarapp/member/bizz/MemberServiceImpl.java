package pl.edu.pw.calendarapp.member.bizz;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.pw.calendarapp.member.repo.Member;
import pl.edu.pw.calendarapp.member.repo.MemberRepository;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Override
    public Member findById(long memberId) {
        return memberRepository.findByIdWithCalendars(memberId).orElse(null);
    }
}
