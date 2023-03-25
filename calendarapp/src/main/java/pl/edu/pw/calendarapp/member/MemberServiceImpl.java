package pl.edu.pw.calendarapp.member;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Override
    public Member findById(long memberId) {
        return memberRepository.findByIdWithCalendars(memberId).orElse(null);
    }
}
