package pl.edu.pw.calendarapp.calendarmember.bizz;

import lombok.Getter;

import java.util.Arrays;

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

    public static CalendarMemberRoleEnum fromString(String role) {
        return Arrays.stream(values()).filter(r -> r.getRole().equals(role)).findFirst().orElse(GUEST);
    }
}
