package pl.edu.pw.calendarapp.calendar.bizz;

import pl.edu.pw.calendarapp.calendar.repo.JoinRequest;
import pl.edu.pw.calendarapp.calendar.rest.JoinRequestView;
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
                    joinRequestView.setCalendar(CalendarMapper.mapPreview(jr.getCalendar(), !joinRequestView.getFromOwner()));
                    return joinRequestView;
                }).orElse(null);
    }
}
