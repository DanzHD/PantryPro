package pantrypro.Server.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserResponseDto {

    private String userEmail;
    private boolean allowEmailNotifications;
}
