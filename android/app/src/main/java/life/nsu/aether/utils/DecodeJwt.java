/*
 * DecodeJwt Created by Samiur Prapon
 * Last modified  10/23/22, 5:41 PM
 * Copyright (c) 2022. All rights reserved.
 *
 */

package life.nsu.aether.utils;

import com.google.gson.Gson;

import java.nio.charset.StandardCharsets;

import life.nsu.aether.models.TokenData;

public class DecodeJwt {

    TokenData data;

    public DecodeJwt(String token) {
        // split bearer + token
        String[] splitData = token.split(" ");

//        Log.d("DecodeJwt", splitData[1]);

        // decode token and store as a String
        String onlyToken = getDecodedJwt(splitData[1]);

//        Log.d("DecodeJwt", onlyToken);

        // Convert string to object
        this.data = new Gson().fromJson(onlyToken, TokenData.class);
    }

    public String getDecodedJwt(String jwt) {
        StringBuilder result = new StringBuilder();

        String[] parts = jwt.split("[.]");

        try {
            byte[] partAsBytes = parts[1].getBytes(StandardCharsets.UTF_8);
            String decodedPart = null;

            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
                decodedPart = new String(java.util.Base64.getUrlDecoder().decode(partAsBytes), StandardCharsets.UTF_8);
            }

            result.append(decodedPart);
        } catch (Exception e) {
            throw new RuntimeException("Couldn't decode jwt", e);
        }

        return result.toString();
    }

    public TokenData getData() {
        return data;
    }
}
