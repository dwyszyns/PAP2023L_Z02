package pl.edu.pw.calendarapp.calendar.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import pl.edu.pw.calendarapp.auth.bizz.AuthUtil;
import pl.edu.pw.calendarapp.calendar.bizz.CalendarService;
import pl.edu.pw.calendarapp.calendar.repo.Calendar;
import pl.edu.pw.calendarapp.calendarmember.bizz.CalendarMemberService;
import pl.edu.pw.calendarapp.calendarmember.rest.CalendarMemberView;
import pl.edu.pw.calendarapp.calendarmember.rest.JoinRequestView;
import pl.edu.pw.calendarapp.member.bizz.MemberService;
import pl.edu.pw.calendarapp.member.repo.Member;

import java.util.List;
import java.util.function.BiConsumer;

@RequestMapping("calendar")
@RestController
@RequiredArgsConstructor
public class CalendarController {
    private final CalendarService calendarService;
    private final CalendarMemberService calendarMemberService;
    private final MemberService memberService;

    @GetMapping("/member/{memberId}")
    public List<CalendarView> getCalendarsForMember(@PathVariable Long memberId) {
        return calendarService.findAllForMember(memberId);
    }

    @GetMapping("/member/current")
    public List<CalendarView> getCalendarsForCurrentMember() {
        return calendarService.findAllForMember(AuthUtil.getMemberIdFromSecurityContext());
    }

    @PostMapping
    public CalendarView createCalendar(@RequestBody AddCalendarView calendarView) {
        return calendarService.createCalendar(calendarView);
    }

    @GetMapping("{calendarId}")
    public CalendarView getCalendarById(@PathVariable Long calendarId) {
        return calendarService.findById(AuthUtil.getMemberIdFromSecurityContext(), calendarId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Calendar not found"));
    }

    @DeleteMapping("/{calendarId}")
    public void deleteCalendar(@PathVariable Long calendarId) {
        calendarService.deleteCalendar(calendarId);
    }

    @PostMapping("/{calendarId}/join")
    public void sendJoinRequest(@PathVariable Long calendarId) {
        final long memberId = AuthUtil.getMemberIdFromSecurityContext();
        applyWithCalendarAndMember(calendarId, memberId, calendarMemberService::sendJoinRequest);
    }

    @GetMapping("/{calendarId}/member")
    public List<CalendarMemberView> getMembersOfCalendar(@PathVariable Long calendarId) {
        return calendarMemberService.getMembersForCalendar(calendarId);
    }

    @PostMapping("/{calendarId}/member/{memberId}")
    public void subscribeToCalendar(
            @PathVariable Long calendarId,
            @PathVariable Long memberId,
            @RequestParam("role") String role
    ) {
        applyWithCalendarAndMember(calendarId, memberId, (calendar, member) ->
                calendarMemberService.setRoleByCalendarAndMember(calendar, member, role));
    }

    @DeleteMapping("/{calendarId}/member/{memberId}")
    public void subscribeToCalendar(
            @PathVariable Long calendarId,
            @PathVariable Long memberId
    ) {
        applyWithCalendarAndMember(calendarId, memberId, calendarMemberService::deleteByCalendarAndMember);
    }

    @PostMapping("/{calendarId}/subscribe")
    public void subscribeToCalendar(@PathVariable Long calendarId) {
        applyWithCalendarAndMember(calendarId, AuthUtil.getMemberIdFromSecurityContext(), calendarMemberService::subscribeToCalendar);
    }

    @GetMapping("/request")
    public List<JoinRequestView> getRequestsForMember() {
        return calendarMemberService.getRequestsForMember(AuthUtil.getMemberIdFromSecurityContext());
    }

    @DeleteMapping("/request/{requestId}")
    public void rejectRequest(@PathVariable Long requestId) {
        calendarMemberService.rejectRequest(requestId);
    }

    @PostMapping("/request/{requestId}/accept")
    public void acceptRequest(@PathVariable Long requestId) {
        calendarMemberService.acceptRequest(requestId);
    }

    @GetMapping("/search/{filter}")
    public List<CalendarView> searchCalendars(@PathVariable String filter) {
        final Member member = memberService.findById(AuthUtil.getMemberIdFromSecurityContext()).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Member not found"));
        return calendarService.searchCalendars(filter, member);
    }

    private void applyWithCalendarAndMember(long calendarId, long memberId, BiConsumer<Calendar, Member> andThen) {
        final Member member = memberService.findById(memberId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Member not found"));
        final Calendar calendar = calendarService.findById(calendarId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Calendar not found"));
        andThen.accept(calendar, member);
    }
}
