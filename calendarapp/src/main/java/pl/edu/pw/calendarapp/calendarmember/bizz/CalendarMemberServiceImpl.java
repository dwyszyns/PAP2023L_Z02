package pl.edu.pw.calendarapp.calendarmember.bizz;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import pl.edu.pw.calendarapp.auth.bizz.AuthUtil;
import pl.edu.pw.calendarapp.calendar.bizz.JoinRequestMapper;
import pl.edu.pw.calendarapp.calendar.repo.Calendar;
import pl.edu.pw.calendarapp.calendarmember.repo.CalendarMember;
import pl.edu.pw.calendarapp.calendarmember.repo.CalendarMemberRepository;
import pl.edu.pw.calendarapp.calendarmember.repo.JoinRequest;
import pl.edu.pw.calendarapp.calendarmember.repo.JoinRequestRepository;
import pl.edu.pw.calendarapp.calendarmember.rest.CalendarMemberView;
import pl.edu.pw.calendarapp.calendarmember.rest.JoinRequestView;
import pl.edu.pw.calendarapp.member.repo.Member;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CalendarMemberServiceImpl implements CalendarMemberService {

    private final CalendarMemberRepository calendarMemberRepository;
    private final JoinRequestRepository joinRequestRepository;

    @Override
    @Transactional
    public void sendJoinRequest(Calendar calendar, Member member) {
        final Member owner = calendarMemberRepository.getOwner(calendar.getCalendarId())
                .orElseThrow(() -> new IllegalArgumentException("Calendar has no owner"))
                .getMember();
        final JoinRequest joinRequest = new JoinRequest();
        joinRequest.setCalendar(calendar);
        joinRequest.setSender(member);
        joinRequest.setReceiver(owner);
        joinRequest.setFromOwner(true);
        joinRequestRepository.save(joinRequest);
    }

    @Override
    @Transactional
    public void subscribeToCalendar(final Calendar calendar, final Member member) {
        validateUserOwnsCalendar(calendar.getCalendarId());
        final CalendarMember calendarMember = calendarMemberRepository.getCalendarMember(calendar.getCalendarId(), member.getMemberId())
                .orElseThrow(() -> new IllegalArgumentException("Member is not a part of this calendar"));
        calendarMember.setAutoSubscribed(true);
        calendarMemberRepository.save(calendarMember);
    }

    @Override
    public void setRoleByCalendarAndMember(final Calendar calendar, final Member member, final String role) {
        validateUserOwnsCalendar(calendar.getCalendarId());
        final CalendarMember calendarMember = calendarMemberRepository.findByCalendarAndMember(calendar, member)
                .orElseThrow(() -> new IllegalArgumentException("Calendar member not found"));
        calendarMember.setRole(CalendarMemberRoleEnum.fromString(role).getRole());
        calendarMemberRepository.save(calendarMember);
    }

    @Override
    public void deleteByCalendarAndMember(final Calendar calendar, final Member member) {
        validateUserOwnsCalendar(calendar.getCalendarId());
        final CalendarMember calendarMember = calendarMemberRepository.findByCalendarAndMember(calendar, member)
                .orElseThrow(() -> new IllegalArgumentException("Calendar member not found"));
        calendarMemberRepository.delete(calendarMember);
    }

    @Override
    public List<JoinRequestView> getRequestsForMember(long memberId) {
        return joinRequestRepository.findByReceiver(memberId).stream()
                .map(JoinRequestMapper::map)
                .toList();
    }

    @Override
    public void rejectRequest(Long requestId) {
        final JoinRequest joinRequest = joinRequestRepository.findByIdWithRefs(requestId)
                .orElseThrow(() -> new IllegalArgumentException("Request not found"));
        if (!joinRequest.getReceiver().getMemberId().equals(AuthUtil.getMemberIdFromSecurityContext())) {
            throw new AccessDeniedException("You are not the receiver of this request");
        }
        joinRequestRepository.deleteById(requestId);
    }

    @Override
    @Transactional
    public void acceptRequest(Long requestId) {
        final JoinRequest joinRequest = joinRequestRepository.findByIdWithRefs(requestId)
                .orElseThrow(() -> new IllegalArgumentException("Request not found"));
        if (!joinRequest.getReceiver().getMemberId().equals(AuthUtil.getMemberIdFromSecurityContext())) {
            throw new AccessDeniedException("You are not the receiver of this request");
        }
        final CalendarMember calendarMember = new CalendarMember();
        calendarMember.setCalendar(joinRequest.getCalendar());
        calendarMember.setMember(joinRequest.getSender());
        calendarMember.setRole(CalendarMemberRoleEnum.GUEST.getRole());
        calendarMemberRepository.save(calendarMember);
        joinRequestRepository.deleteById(requestId);
    }

    @Override
    public List<CalendarMemberView> getMembersForCalendar(Long calendarId) {
        validateUserOwnsCalendar(calendarId);
        return calendarMemberRepository.findAllForCalendar(calendarId).stream()
                .map(CalendarMemberMapper::map)
                .sorted(Comparator.comparing(CalendarMemberView::getRole, Comparator.reverseOrder())
                        .thenComparing(CalendarMemberView::getName))
                .toList();
    }

    private void validateUserOwnsCalendar(final long calendarId) {
        if (!calendarMemberRepository.memberOwnsCalendar(AuthUtil.getMemberIdFromSecurityContext(), calendarId)) {
            throw new AccessDeniedException("You are not the owner of this calendar");
        }
    }
}
