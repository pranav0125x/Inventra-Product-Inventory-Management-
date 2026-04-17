package com.inventory.InventoryManagement;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByNameContainingIgnoreCase(String name); // search

    List<Product> findByQuantityLessThan(int quantity); // low stock

    List<Product> findByCategoryIgnoreCase(String category); // category filter

    boolean existsByNameIgnoreCase(String name); // duplicate check
}