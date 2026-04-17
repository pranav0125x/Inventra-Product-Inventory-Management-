package com.inventory.InventoryManagement;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

    // Find admin by username and password
    Admin findByUsernameAndPassword(String username, String password);
}