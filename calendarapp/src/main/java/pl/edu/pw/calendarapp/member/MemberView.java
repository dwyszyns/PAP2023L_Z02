package pl.edu.pw.calendarapp.member;

import lombok.Data;

@Data
public class MemberView {
    private long id;
    private String firstName;
    private String lastName;
    private String username;
}
