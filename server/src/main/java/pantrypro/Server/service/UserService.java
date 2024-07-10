package pantrypro.Server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import pantrypro.Server.dto.UpdateUserSettingDto;
import pantrypro.Server.dto.UserResponseDto;
import pantrypro.Server.model.User;
import pantrypro.Server.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public UserResponseDto getUserInformation() {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(userEmail)
            .orElseThrow();

        return UserResponseDto
            .builder()
            .allowEmailNotifications(user.isAllowEmailNotifications())
            .userEmail(user.getEmail())
            .build();
    }

    public void updateUserSettings(UpdateUserSettingDto updateUserSettingDto) {
        String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(userEmail)
            .orElseThrow();
        user.setAllowEmailNotifications(updateUserSettingDto.isAllowEmailAlert());

        userRepository.save(user);
    }

}
