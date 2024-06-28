package pantrypro.Server.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.RequestParam;
import pantrypro.Server.Enums.FoodGroup;

import java.sql.Date;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FoodRequest {
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Date expiryDate;
    private FoodGroup group;
    private String name;
    private int quantity;



}
