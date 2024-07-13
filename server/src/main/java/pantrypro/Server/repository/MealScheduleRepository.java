package pantrypro.Server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pantrypro.Server.model.MealSchedule;
import pantrypro.Server.model.Recipe;
import pantrypro.Server.model.User;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface MealScheduleRepository extends JpaRepository<pantrypro.Server.model.MealSchedule, Long> {

    Optional<MealSchedule> findMealScheduleByDateAndUser(Date date, User user);

    List<MealSchedule> findMealScheduleByDateBetweenAndUser(Date fromDate, Date toDate, User user);

}
