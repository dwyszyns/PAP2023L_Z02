package pl.edu.pw.calendarapp.calendarmember.bizz;

import pl.edu.pw.calendarapp.calendarmember.repo.CalendarMember;
import pl.edu.pw.calendarapp.calendarmember.rest.CalendarMemberView;

import java.util.Optional;

public class CalendarMemberMapper {

    private CalendarMemberMapper() {
    }

    public static CalendarMemberView map(final CalendarMember calendarMember) {
        return Optional.ofNullable(calendarMember)
                .map(cm -> {
                    final CalendarMemberView calendarMemberView = new CalendarMemberView();
                    calendarMemberView.setId(cm.getCalendarMemberId());
                    calendarMemberView.setName(String.format(
                            "%s %s",
                            cm.getMember().getFirstName(),
                            cm.getMember().getLastName()));
                    calendarMemberView.setRole(cm.getRole());
                    return calendarMemberView;
                })
                .orElse(null);
    }
}
