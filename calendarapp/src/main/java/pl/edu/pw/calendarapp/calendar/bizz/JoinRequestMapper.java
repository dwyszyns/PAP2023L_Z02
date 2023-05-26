package pl.edu.pw.calendarapp.calendar.bizz;

import pl.edu.pw.calendarapp.calendarmember.bizz.CalendarMemberRoleEnum;
import pl.edu.pw.calendarapp.calendarmember.repo.JoinRequest;
import pl.edu.pw.calendarapp.calendarmember.rest.JoinRequestView;
import pl.edu.pw.calendarapp.member.bizz.MemberMapper;

import java.util.Optional;

public class JoinRequestMapper {

    private JoinRequestMapper() {
    }

    public static JoinRequestView map(final JoinRequest joinRequest) {
        return Optional.ofNullable(joinRequest)
                .map(jr -> {
                    final JoinRequestView joinRequestView = new JoinRequestView();
                    joinRequestView.setRequestId(jr.getRequestId());
                    joinRequestView.setFromOwner(jr.getFromOwner());
                    joinRequestView.setSender(MemberMapper.mapMemberPreview(jr.getSender()));
                    joinRequestView.setCalendar(CalendarMapper.mapPreview(
                            jr.getCalendar(),
                            Boolean.TRUE.equals(joinRequestView.getFromOwner()) ?
                                    CalendarMemberRoleEnum.OWNER.getRole() :
                                    CalendarMemberRoleEnum.GUEST.getRole()));
                    return joinRequestView;
                }).orElse(null);
    }
}
