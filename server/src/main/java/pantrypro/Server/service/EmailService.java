package pantrypro.Server.service;

import lombok.extern.java.Log;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import pantrypro.Server.model.Food;
import pantrypro.Server.model.User;
import pantrypro.Server.repository.FoodRepository;
import pantrypro.Server.repository.UserRepository;

import java.sql.Date;
import java.util.List;
import java.util.logging.Logger;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    UserRepository userRepository;

    @Autowired
    FoodRepository foodRepository;



    /**
     *
     * @param to
     * @param subject
     * @param body
     */
    public void sendMail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("pantryprofood@gmail.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
    }

    /**
     * Sends email alerts to all users about their food that is about to expire
     */
    public void sendEmailExpiryAlertsForAllUsers() {
        List<User> users = userRepository.findAll();
        for (User user: users) {
            List<Food> foods = foodRepository.findFoodByOwner(user, Pageable.unpaged());
            sendExpiryAlertForUser(user, foods);

        }
    }

    /**
     * Sends an email notification to a user about their food expiring
     */
    public void sendExpiryAlertForUser(User user, List<Food> foods) {
        /* Don't send email if the user has no foods stored */
        if (foods.isEmpty()) {
            return;
        }
        if (!user.isAllowEmailNotifications()) {
            return;
        }

        String emailSubject = "Food expiry Alert";
        String emailBody = "";
        emailBody += generateFoodExpiryListString(foods);
        String emailFooter = "Sincerely,\n\nPantryPro";

        emailBody += String.format("\n%s", emailFooter);
        sendMail(user.getEmail(), emailSubject, emailBody);

    }

    /**
     * Converts a list of food into a string with their name and expiry date
     */
    public String generateFoodExpiryListString(List<Food> foods) {
        char bulletSymbol = '•';
        StringBuilder foodExpiryList = new StringBuilder("You have the following food expiring:\n\n");
        for (Food food: foods) {
            Date expiryDate = food.getExpiryDate();
            String name = food.getName();
            foodExpiryList.append(String.format("\t%c %s expiring on %s\n", bulletSymbol, name, expiryDate.toString()));
        }

        return foodExpiryList.toString();
    }

    public void sendEnableUserEmail(User user, String verificationToken) {
        sendMail(user.getEmail(),
            "PantryPro - Activate Account",
            "Dear PantryPro user,\n\n" +
                "We have received a request to activate your pantrypro account. " +
                "Click on the following link to activate your account:\n\n" +
                "http://localhost:5173/verify/?token=" + verificationToken +
                "\n\n" +
                "Sincerely, \n\n" +
                "PantryPro"
        );
    }




}
