package pl.edu.pw.calendarapp.common;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;

public class DateUtil {
    private DateUtil() {
    }

    public static ZonedDateTime getDateTimeFromMilli(final long milli) {
        return ZonedDateTime.ofInstant(Instant.ofEpochMilli(milli), getZone());
    }

    public static ZoneId getZone() {
        return ZoneId.of("CET");
    }
}
