package pantrypro.Server.service;

import com.google.gson.JsonObject;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import pantrypro.Server.util.HTTPProperty;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.*;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class HttpService {

    public String performRequest(
        String urlString,
        ArrayList<HTTPProperty> properties,
        String requestMethod,
        boolean doOutput,
        JSONObject body
    ) throws URISyntaxException, IOException {

        URL url = new URI(urlString).toURL();
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod(requestMethod);
        con.setConnectTimeout(5000);
        con.setReadTimeout(5000);
        con.setDoOutput(doOutput);

        for (HTTPProperty property: properties) {
            con.setRequestProperty(property.getKey(), property.getValue());
        }

        if (body != null) {
            OutputStream outputStream = con.getOutputStream();
            byte[] input = body.toString().getBytes("utf-8");
            outputStream.write(input, 0, input.length);

        }

        con.connect();

        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader((con.getInputStream())));
        StringBuilder sb = new StringBuilder();
        String output;

        while ((output = bufferedReader.readLine()) != null) {
            sb.append(output);
        }

        return sb.toString();

    }

    public String performRequest(
        String urlString,
        ArrayList<HTTPProperty> properties,
        String requestMethod
    ) throws URISyntaxException, IOException {
        return performRequest(urlString, properties, requestMethod, false, null);
    }


}
