package pantrypro.Server;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import pantrypro.Server.service.EmailService;


@SpringBootTest
@EnableScheduling
public class MailTest {

    @Autowired
    private EmailService emailService;

    @Test
    void successful_EmailSend() {
        emailService.sendMail("pantryprofood@gmail.com", "Test from springboot", "Test");
    }








}
