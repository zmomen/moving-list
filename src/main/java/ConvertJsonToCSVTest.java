import com.oracle.javafx.jmx.json.JSONException;
import org.json.CDL;
import org.json.JSONArray;
import org.json.JSONObject;

public class ConvertJsonToCSVTest {
    public static void main(String[] args) throws JSONException {
        String jsonArrayString = "{\n" +
                "  \"result\": [\n" +
                "    {\n" +
                "      \"first name\": \"Zaid\",\n" +
                "      \"last name\": \"Momen\",\n" +
                "      \"location\": [\n" +
                "        {\n" +
                "          \"street\": \"main\",\n" +
                "          \"city\": \"Chicago\"\n" +
                "        },\n" +
                "        {\n" +
                "          \"street\": \"123\",\n" +
                "          \"city\": \"Oslo\"\n" +
                "        }\n" +
                "      ]\n" +
                "    },\n" +
                "    {\n" +
                "      \"first name\": \"john\",\n" +
                "      \"last name\": \"davis\",\n" +
                "      \"location\": \"Orlando\"\n" +
                "    }\n" +
                "  ]\n" +
                "}";
        JSONObject output;
        try {
            output = new JSONObject(jsonArrayString);
            JSONArray docs = output.getJSONArray("result");
            String csv = CDL.toString(docs);
            System.out.println(csv);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}