package pl.edu.pw.calendarapp.calendar.rest;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import pl.edu.pw.calendarapp.auth.bizz.AuthUtil;
import pl.edu.pw.calendarapp.calendar.bizz.CalendarService;
import pl.edu.pw.calendarapp.calendar.repo.Calendar;
import pl.edu.pw.calendarapp.member.bizz.MemberService;
import pl.edu.pw.calendarapp.member.repo.Member;

import java.util.List;
import java.util.function.BiConsumer;

@RequestMapping("calendar")
@RestController
@RequiredArgsConstructor
public class CalendarController {
    private final CalendarService calendarService;
    private final MemberService memberService;

    @GetMapping("/member/{memberId}")
    public List<CalendarView> getCalendarsForMember(@PathVariable Long memberId) {
        return calendarService.findAllForMember(memberId);
    }

    @GetMapping("{calendarId}")
    public CalendarView getCalendarById(@PathVariable Long calendarId) {
        return calendarService.findById(AuthUtil.getMemberIdFromSecurityContext(), calendarId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Calendar not found"));
    }

    @PostMapping("/{calendarId}/member/{memberId}")
    public void addMemberToCalendar(@PathVariable Long calendarId, @PathVariable Long memberId) {
        applyWithCalendarAndMember(calendarId, memberId, calendarService::addMemberToCalendar);
    }

    @PostMapping("/{calendarId}/member/{memberId}/subscribe")
    public void subscribeToCalendar(@PathVariable Long calendarId, @PathVariable Long memberId) {
        applyWithCalendarAndMember(calendarId, memberId, calendarService::subscribeToCalendar);
    }

    @DeleteMapping("/{calendarId}")
    public void deleteCalendar(@PathVariable Long calendarId) {
        calendarService.deleteCalendar(calendarId);
    }

    private void applyWithCalendarAndMember(long calendarId, long memberId, BiConsumer<Calendar, Member> andThen) {
        final Member member = memberService.findById(memberId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Member not found"));
        final Calendar calendar = calendarService.findById(calendarId).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "Calendar not found"));
        andThen.accept(calendar, member);
    }
}
