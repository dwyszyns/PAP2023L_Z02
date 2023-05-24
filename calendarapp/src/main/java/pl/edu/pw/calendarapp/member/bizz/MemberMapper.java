package pl.edu.pw.calendarapp.member.bizz;

import pl.edu.pw.calendarapp.calendar.bizz.CalendarMapper;
import pl.edu.pw.calendarapp.calendar.rest.CalendarView;
import pl.edu.pw.calendarapp.calendarmember.bizz.CalendarMemberRoleEnum;
import pl.edu.pw.calendarapp.member.repo.FriendRequest;
import pl.edu.pw.calendarapp.member.repo.Member;
import pl.edu.pw.calendarapp.member.rest.FriendView;
import pl.edu.pw.calendarapp.member.rest.MemberView;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

public class MemberMapper {

    private MemberMapper() {
    }

    public static MemberView mapMember(final Member member) {
        return Optional.ofNullable(member)
                .map(MemberMapper::mapMemberPreview)
                .map(view -> {
                    final List<CalendarView> calendars = Optional.ofNullable(member.getCalendars())
                            .map(calendarMembers -> calendarMembers.stream()
                                    .filter(calendarMember -> calendarMember != null &&
                                            CalendarMemberRoleEnum.isOwner(calendarMember.getRole()))
                                    .map(calendarMember -> CalendarMapper.mapPreview(
                                            calendarMember.getCalendar(),
                                            calendarMember.getRole()))
                                    .filter(calendarView -> calendarView != null && calendarView.isPublic())
                                    .limit(6)
                                    .toList()
                            ).orElse(List.of());
                    view.setCalendarsPreview(calendars);
                    return view;
                }).orElse(null);
    }

    public static MemberView mapMemberPreview(final Member member) {
        return Optional.ofNullable(member).map(m -> {
            final MemberView memberView = new MemberView();
            memberView.setId(m.getMemberId() != null ? m.getMemberId() : -1L);
            memberView.setFirstName(m.getFirstName());
            memberView.setLastName(m.getLastName());
            memberView.setUsername(m.getUsername());
            Optional.ofNullable(m.getDateJoined()).map(Timestamp::toLocalDateTime).ifPresent(memberView::setDateJoined);
            return memberView;
        }).orElse(null);
    }

    public static FriendView mapFriend(final FriendRequest friendRequest, final long memberId) {
        return Optional.ofNullable(friendRequest).map(f -> {
            final FriendView friendView = new FriendView();
            friendView.setRequestId(friendRequest.getRequestId());
            final Member friend = Optional.ofNullable(friendRequest.getSender())
                    .filter(member -> !member.getMemberId().equals(memberId))
                    .orElse(friendRequest.getReceiver());
            friendView.setFriend(mapMemberPreview(friend));
            friendView.setAccepted(f.getAccepted());
            return friendView;
        }).orElse(null);
    }
}
