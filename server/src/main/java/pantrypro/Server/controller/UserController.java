package pantrypro.Server.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pantrypro.Server.dto.Settings.UpdateUserSettingDto;
import pantrypro.Server.dto.User.UserResponseDto;
import pantrypro.Server.service.UserService;

@RestController
@RequestMapping(path = "/api/v1")
@CrossOrigin
@RequiredArgsConstructor
public class UserController {


    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserResponseDto> getUser() {

        return ResponseEntity.ok(userService.getUserInformation());

    }

    @PutMapping("/me/settings")
    public HttpStatus updateUserSettings(@RequestBody UpdateUserSettingDto updateUserSettingDto) {
        userService.updateUserSettings(updateUserSettingDto);

        return HttpStatus.ACCEPTED;
    }

}
