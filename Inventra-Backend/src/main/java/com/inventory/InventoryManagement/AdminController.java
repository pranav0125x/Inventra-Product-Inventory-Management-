package com.inventory.InventoryManagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    AdminService adminService;

    // POST → Login
    @PostMapping("/login")
    public String login(@RequestBody Admin admin) {
        return adminService.login(admin.getUsername(), admin.getPassword());
    }
}