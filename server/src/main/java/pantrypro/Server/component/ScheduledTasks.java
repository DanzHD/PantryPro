package pantrypro.Server.component;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import pantrypro.Server.service.EmailService;

import java.sql.Time;
import java.util.TimeZone;

@Component
public class ScheduledTasks {


    @Autowired
    EmailService emailService;

    @Scheduled(cron = "0 0 0 * * SUN")
    private void scheduleAllUserExpiryAlert() {
        emailService.sendEmailExpiryAlertsForAllUsers();
    }

}
