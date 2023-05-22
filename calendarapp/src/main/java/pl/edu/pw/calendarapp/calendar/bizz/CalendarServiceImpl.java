package pl.edu.pw.calendarapp.calendar.bizz;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import pl.edu.pw.calendarapp.auth.bizz.AuthUtil;
import pl.edu.pw.calendarapp.calendar.repo.Calendar;
import pl.edu.pw.calendarapp.calendar.repo.*;
import pl.edu.pw.calendarapp.calendar.rest.AddCalendarView;
import pl.edu.pw.calendarapp.calendar.rest.CalendarView;
import pl.edu.pw.calendarapp.calendar.rest.JoinRequestView;
import pl.edu.pw.calendarapp.event.repo.Event;
import pl.edu.pw.calendarapp.event.repo.EventRepository;
import pl.edu.pw.calendarapp.member.repo.Member;
import pl.edu.pw.calendarapp.member.repo.MemberRepository;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CalendarServiceImpl implements CalendarService {
    private final CalendarRepository calendarRepository;
    private final CalendarMemberRepository calendarMemberRepository;
    private final JoinRequestRepository joinRequestRepository;
    private final EventRepository eventRepository;
    private final MemberRepository memberRepository;

    @Override
    public Optional<CalendarView> findById(long memberId, long calendarId) {
        final Set<Long> subscribedIds = eventRepository.getSubscribedForMemberAndCalendar(memberId, calendarId)
                .stream()
                .map(Event::getEventId)
                .collect(Collectors.toCollection(HashSet::new));
        final Optional<CalendarView> calendar = calendarMemberRepository.getCalendarMember(calendarId, memberId)
                .map(cm -> CalendarMapper.map(cm.getCalendar(), cm.getIsOwner()));
        calendar.map(CalendarView::getEvents)
                .ifPresent(views -> views.values().stream()
                        .flatMap(Collection::stream)
                        .forEach(view -> view.setSubscribed(subscribedIds.contains(view.getId())))
                );
        return calendar;
    }

    @Override
    public Optional<Calendar> findById(long calendarId) {
        return calendarRepository.findById(calendarId);
    }

    @Override
    public List<CalendarView> findAllForMember(long memberId) {
        return calendarMemberRepository.findAllForMember(memberId).stream()
                .map(cm -> CalendarMapper.map(cm.getCalendar(), cm.getIsOwner()))
                .toList();
    }

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
    public void subscribeToCalendar(Calendar calendar, Member member) {
        validateUserOwnsCalendar(calendar.getCalendarId());
        final CalendarMember calendarMember = calendarMemberRepository.getCalendarMember(calendar.getCalendarId(), member.getMemberId())
                .orElseThrow(() -> new IllegalArgumentException("Member is not a part of this calendar"));
        calendarMember.setAutoSubscribed(true);
        calendarMemberRepository.save(calendarMember);
    }

    @Override
    @Transactional
    public void deleteCalendar(Long calendarId) {
        final long memberId = AuthUtil.getMemberIdFromSecurityContext();
        if (!calendarMemberRepository.memberOwnsCalendar(memberId, calendarId)) {
            calendarMemberRepository.deleteByCalendarIdAndMemberId(calendarId, memberId);
        } else {
            calendarRepository.deleteById(calendarId);
        }
    }

    @Override
    @Transactional
    public CalendarView createCalendar(AddCalendarView calendarView) {
        final Member member = memberRepository.getReferenceById(AuthUtil.getMemberIdFromSecurityContext());
        final Calendar calendar = new Calendar();
        calendar.setName(calendarView.getName());
        calendar.setIsPublic(calendarView.isPublic());
        calendarRepository.save(calendar);
        final CalendarMember calendarMember = new CalendarMember();
        calendarMember.setCalendar(calendar);
        calendarMember.setMember(member);
        calendarMember.setIsOwner(true);
        return CalendarMapper.mapPreview(calendarMemberRepository.save(calendarMember).getCalendar(), true);

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
        calendarMember.setIsOwner(false);
        calendarMemberRepository.save(calendarMember);
        joinRequestRepository.deleteById(requestId);
    }

    private void validateUserOwnsCalendar(final long calendarId) {
        if (!calendarMemberRepository.memberOwnsCalendar(AuthUtil.getMemberIdFromSecurityContext(), calendarId)) {
            throw new AccessDeniedException("You are not the owner of this calendar");
        }
    }
}
