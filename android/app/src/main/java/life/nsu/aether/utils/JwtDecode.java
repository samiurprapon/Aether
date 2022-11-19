/*
 * JwtDecode Created by Samiur Prapon
 * Last modified  11/18/22, 11:16 PM
 * Copyright (c) 2022. All rights reserved.
 *
 */

package life.nsu.aether.utils;

import android.os.Build;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Base64;

public class JwtDecode {
    JSONObject decodedJwt;

    public JwtDecode() {
        // empty constructor
    }

    public JwtDecode(String jsonWebToken) throws JSONException {
//        split words
        String[] splitWords = jsonWebToken.split(" ");

//        split token
        String[] splitData = splitWords[1].split("\\.");
        String token = splitData[1];

//        decode token
        this.decodedJwt = new JSONObject(decode(token));
    }

    private static String decode(String encodedString) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            return new String(Base64.getUrlDecoder().decode(encodedString));
        } else {
            return new String(android.util.Base64.decode(encodedString, android.util.Base64.DEFAULT));
        }
    }

    public JSONObject getDecodedJwt() {
        return decodedJwt;
    }


    public String getDecodedString(String jsonWebToken) {
        //        split words
        String[] splitWords = jsonWebToken.split(" ");

//        split token
        String[] splitData = splitWords[1].split("\\.");
        String token = splitData[1];

        return decode(token);
    }
}
