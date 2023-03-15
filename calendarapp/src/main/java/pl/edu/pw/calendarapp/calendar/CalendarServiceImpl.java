package pl.edu.pw.calendarapp.calendar;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CalendarServiceImpl implements CalendarService {
    private final CalendarRepository calendarRepository;

    @Override
    public Optional<Calendar> findById(long calendarId) {
        return calendarRepository.findById(calendarId);
    }
}
