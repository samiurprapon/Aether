/*
 * TokenData Created by Samiur Prapon
 * Last modified  10/23/22, 5:35 PM
 * Copyright (c) 2022. All rights reserved.
 *
 */

package life.nsu.aether.models;

import life.nsu.aether.models.tokenDecode.Details;
import life.nsu.aether.models.tokenDecode.Permissions;
import life.nsu.aether.models.tokenDecode.User;

public class TokenData {
    private Details details;
    private Permissions permissions;
    private User user;

    public TokenData() {
    }

    public Permissions getPermissions() {
        return permissions;
    }

    public Details getDetails() {
        return details;
    }

    public User getUser() {
        return user;
    }
}
