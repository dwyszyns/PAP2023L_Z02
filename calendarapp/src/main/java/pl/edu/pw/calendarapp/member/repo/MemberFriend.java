package pl.edu.pw.calendarapp.member.repo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberFriend {
    private Long requestId;
    private Member friend;
    private boolean active;
}
