package pl.edu.pw.calendarapp.calendar;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("calendar")
@RestController
@RequiredArgsConstructor
public class CalendarController {
    private final CalendarRepository calendarRepository;

    @GetMapping
    public List<Calendar> getCalendars() {
        return calendarRepository.findAll();
    }
}
