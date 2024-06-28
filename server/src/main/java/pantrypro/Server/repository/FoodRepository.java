package pantrypro.Server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pantrypro.Server.model.Food;
import pantrypro.Server.model.User;

import java.util.ArrayList;
import java.util.Set;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {
    Set<Food> findByOwner(User owner);

}
