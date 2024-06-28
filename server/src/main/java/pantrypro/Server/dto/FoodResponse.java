package pantrypro.Server.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pantrypro.Server.model.Food;

import java.util.ArrayList;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FoodResponse {

    @JsonProperty("Food")
    ArrayList<Food> foods;

}
