package pantrypro.Server.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import pantrypro.Server.dto.UpdateUserSettingDto;
import pantrypro.Server.dto.UserResponseDto;
import pantrypro.Server.model.User;
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
