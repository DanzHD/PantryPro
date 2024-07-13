package pantrypro.Server.repository;

import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pantrypro.Server.model.Recipe;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {

    boolean existsById(@NonNull Long id);

}
