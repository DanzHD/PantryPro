package pantrypro.Server.dto.Food;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pantrypro.Server.model.Food;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FoodResponse {

    List<Food> foods;
    int count;

}
