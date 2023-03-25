package pl.edu.pw.calendarapp.event.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventSubscriberRepository extends JpaRepository<EventSubscriber, Long> {

}
