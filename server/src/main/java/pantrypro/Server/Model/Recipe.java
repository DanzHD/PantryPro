package pantrypro.Server.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Recipe {

    @Id
    private long id;


    @Column(columnDefinition = "TEXT")
    private String instructions;
    private String imageSource;


    @ManyToMany
    private List<Ingredient> ingredients;



}
