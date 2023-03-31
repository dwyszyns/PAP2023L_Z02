package pl.edu.pw.calendarapp.member.rest;

import lombok.Data;

@Data
public class FriendView {
    private long requestId;
    private MemberView friend;
    private boolean accepted;
}
