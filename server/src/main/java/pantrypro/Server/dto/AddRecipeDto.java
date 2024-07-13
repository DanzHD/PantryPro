package pantrypro.Server.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddRecipeDto {

    @JsonProperty("date")
    private Date date;
    @JsonProperty("recipes")
    private List<RecipeDto> recipes;

}
