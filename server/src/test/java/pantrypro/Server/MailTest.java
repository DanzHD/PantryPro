package pantrypro.Server;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import pantrypro.Server.service.EmailService;

@SpringBootTest
public class MailTest {

    @Autowired
    private EmailService emailService;

    @Test
    void successful_EmailSend() {
        emailService.sendMail("daniel.d.cow@gmail.com", "Test from springboot", "Test");
    }

}
