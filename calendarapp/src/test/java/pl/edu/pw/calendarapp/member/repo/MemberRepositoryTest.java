package pl.edu.pw.calendarapp.member.repo;

import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@Tag("RepositoryTest")
class MemberRepositoryTest {

    private static final Long CALENDAR_NO_SUBSCRIBERS_ID = 0L;
    private static final Long CALENDAR_WITH_SUBSCRIBERS = 1L;
    private static final long[] SUBSCRIBED_TO_CALENDAR_1_IDS = {0L, 1L, 2L};
    private static final int SUBSCRIBED_TO_CALENDAR_1 = 3;

    @Autowired
    private MemberRepository memberRepository;

    @Test
    void findAutoSubscribedForCalendar() {
        final List<Member> subscribed = memberRepository.findAutoSubscribedForCalendar(CALENDAR_WITH_SUBSCRIBERS);
        assertEquals(SUBSCRIBED_TO_CALENDAR_1, subscribed.size());
        assertArrayEquals(SUBSCRIBED_TO_CALENDAR_1_IDS, subscribed.stream().mapToLong(Member::getMemberId).toArray());
    }

    @Test
    void findAutoSubscribedForCalendarEmpty() {
        final List<Member> subscribed = memberRepository.findAutoSubscribedForCalendar(CALENDAR_NO_SUBSCRIBERS_ID);
        assertTrue(subscribed.isEmpty());
    }
}