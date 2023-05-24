package pl.edu.pw.calendarapp.calendar.bizz;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.pw.calendarapp.auth.bizz.AuthUtil;
import pl.edu.pw.calendarapp.calendar.repo.Calendar;
import pl.edu.pw.calendarapp.calendar.repo.CalendarRepository;
import pl.edu.pw.calendarapp.calendar.rest.AddCalendarView;
import pl.edu.pw.calendarapp.calendar.rest.CalendarView;
import pl.edu.pw.calendarapp.calendarmember.bizz.CalendarMemberRoleEnum;
import pl.edu.pw.calendarapp.calendarmember.repo.CalendarMember;
import pl.edu.pw.calendarapp.calendarmember.repo.CalendarMemberRepository;
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
    private final EventRepository eventRepository;
    private final MemberRepository memberRepository;

    @Override
    public Optional<CalendarView> findById(long memberId, long calendarId) {
        final Set<Long> subscribedIds = eventRepository.getSubscribedForMemberAndCalendar(memberId, calendarId)
                .stream()
                .map(Event::getEventId)
                .collect(Collectors.toCollection(HashSet::new));
        final Optional<CalendarView> calendar = calendarMemberRepository.getCalendarMember(calendarId, memberId)
                .map(cm -> CalendarMapper.map(cm.getCalendar(), cm.getRole()));
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
                .map(cm -> CalendarMapper.map(cm.getCalendar(), cm.getRole()))
                .toList();
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
        final String role = CalendarMemberRoleEnum.OWNER.getRole();
        final CalendarMember calendarMember = new CalendarMember();
        calendarMember.setCalendar(calendar);
        calendarMember.setMember(member);
        calendarMember.setRole(role);
        calendarMember.setAutoSubscribed(true);
        return CalendarMapper.mapPreview(calendarMemberRepository.save(calendarMember).getCalendar(), role);
    }

}
