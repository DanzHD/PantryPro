package pantrypro.Server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MealScheduleRepository extends JpaRepository<pantrypro.Server.model.MealSchedule, Long> {
}
