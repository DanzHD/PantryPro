package pantrypro.Server.repository;

import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pantrypro.Server.Enums.FoodGroup;
import pantrypro.Server.model.Food;
import pantrypro.Server.model.User;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Repository
public interface FoodRepository extends JpaRepository<Food, Long> {
    Set<Food> findByOwner(User owner);

    List<Food> findFoodByOwner(User owner, Pageable pageable);

    @Query("select count(*) from Food f where f.owner = ?1")
    int findNumberOfFood(User owner);

    int countFoodsByOwnerAndFoodGroup(User owner, FoodGroup foodGroup);

    @Modifying
    @Query("delete from Food f where f.id in (?1) and f.owner = ?2")
    void deleteUsersWithIds(List<Long> ids, User user);


    List<Food> findFoodByOwnerAndFoodGroup(User owner, FoodGroup foodGroup, Pageable pageable);

    List<Food> findFoodByOwnerAndFoodGroupAndNameContaining(User owner, FoodGroup foodGroup, String name, Pageable pageable);


    int countFoodsByOwnerAndFoodGroupAndNameContaining(User owner, FoodGroup foodGroup, String name);

    List<Food> findFoodByOwnerAndNameContaining(User owner, String name, Pageable pageable);
    int countFoodsByOwnerAndNameContaining(User owner, String name);

}
