package com.inventory.InventoryManagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    AdminRepository adminRepository;

    public String login(String username, String password) {

        Admin admin = adminRepository.findByUsernameAndPassword(username, password);

        if (admin != null) {
            return "Login Successful";   // correct credentials
        } else {
            return "Invalid Credentials"; // wrong credentials
        }
    }
}