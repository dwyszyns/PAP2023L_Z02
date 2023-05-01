package pl.edu.pw.calendarapp.member.repo;

import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@Tag("RepositoryTest")
class MemberRepositoryTest {

    private static final long CALENDAR_NO_SUBSCRIBERS_ID = 0L;
    private static final long CALENDAR_WITH_SUBSCRIBERS = 1L;
    private static final long MEMBER_WITH_CALENDARS = 1L;
    private static final long MEMBER_WITHOUT_CALENDARS = 3L;
    private static final long[] SUBSCRIBED_TO_CALENDAR_1_IDS = {0L, 1L, 2L};
    private static final int SUBSCRIBED_TO_CALENDAR_1 = 3;
    private static final int MEMBER_CALENDAR_COUNT = 2;


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

    @Test
    void findByIdWithCalendarsHasCalendars() {
        Optional<Member> memberOptional = memberRepository.findByIdWithCalendars(MEMBER_WITH_CALENDARS);

        assertTrue(memberOptional.isPresent());
        Member member = memberOptional.get();
        assertEquals(MEMBER_WITH_CALENDARS, member.getMemberId());
        assertEquals(MEMBER_CALENDAR_COUNT, member.getCalendars().size());
    }

    @Test
    void findByIdWithCalendarsNoCalendars() {
        Optional<Member> memberOptional = memberRepository.findByIdWithCalendars(MEMBER_WITHOUT_CALENDARS);

        assertTrue(memberOptional.isPresent());
        Member member = memberOptional.get();
        assertEquals(MEMBER_WITHOUT_CALENDARS, member.getMemberId());
        assertTrue(member.getCalendars().isEmpty());
    }
}