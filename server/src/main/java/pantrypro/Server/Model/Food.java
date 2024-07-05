package pantrypro.Server.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pantrypro.Server.Enums.FoodGroup;

import java.sql.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Food {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;
    private Date expiryDate;
    private FoodGroup foodGroup;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id", nullable = false)
    @JsonIgnore
    private User owner;

}
