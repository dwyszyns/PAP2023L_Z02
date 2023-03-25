package pl.edu.pw.calendarapp.member;

import pl.edu.pw.calendarapp.calendar.CalendarMapper;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

public class MemberMapper {
    
    private MemberMapper() {
    }

    public static MemberView map(final Member member) {
        return Optional.ofNullable(member).map(m -> {
            final MemberView memberView = new MemberView();
            memberView.setId(member.getMemberId() != null ? member.getMemberId() : -1L);
            memberView.setFirstName(member.getFirstName());
            memberView.setLastName(member.getLastName());
            memberView.setUsername(member.getUsername());
            Optional.ofNullable(member.getDateJoined()).map(Timestamp::toLocalDateTime).ifPresent(memberView::setDateJoined);
            memberView.setCalendarsPreview(Optional.ofNullable(member.getCalendars())
                    .map(calendarMembers -> calendarMembers.stream()
                            .filter(calendarMember -> calendarMember != null && calendarMember.getIsOwner())
                            .map(calendarMember -> CalendarMapper.mapPreview(calendarMember.getCalendar()))
                            .filter(calendarView -> calendarView != null && calendarView.isPublic())
                            .limit(6)
                            .toList()
                    ).orElse(List.of()));
            return memberView;
        }).orElse(null);
    }
}
