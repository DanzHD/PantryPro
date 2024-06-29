package pantrypro.Server.repository;

import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pantrypro.Server.model.Food;
import pantrypro.Server.model.User;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {
    Set<Food> findByOwner(User owner);

    @Modifying
    @Query("delete from Food f where f.id in (?1) and f.owner = ?2")
    void deleteUsersWithIds(List<Long> ids, User user);
}
