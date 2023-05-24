package pl.edu.pw.calendarapp.calendarmember.bizz;

import lombok.Getter;

@Getter
public enum CalendarMemberRoleEnum {
    OWNER("owner"),
    MAINTAINER("maintainer"),
    GUEST("guest");

    private final String role;

    CalendarMemberRoleEnum(final String role) {
        this.role = role;
    }

    public static boolean isOwner(String role) {
        return role.equals(CalendarMemberRoleEnum.OWNER.getRole());
    }
}
