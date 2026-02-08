package com.Foodela.app.dto;

public class LoginResponse {
    private String message;
    private UserDTO user;
    private String token;

    public LoginResponse() {}

    public LoginResponse(String message, UserDTO user, String token) {
        this.message = message;
        this.user = user;
        this.token = token;
    }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public UserDTO getUser() { return user; }
    public void setUser(UserDTO user) { this.user = user; }
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
}
