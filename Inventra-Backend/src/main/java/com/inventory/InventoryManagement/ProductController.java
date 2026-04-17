package com.inventory.InventoryManagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:5173") // Connects to your Vite frontend
public class ProductController {

    @Autowired
    ProductService productService;

    // For the Dashboard stats
    @GetMapping("/dashboard")
    public DashboardResponse getDashboardData() {
        return productService.getDashboardData();
    }

    // Get all products (for default views)
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    // Search products by name
    @GetMapping("/search")
    public List<Product> searchProducts(@RequestParam String name) {
        return productService.searchProducts(name);
    }
    
    // Add new product
    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return productService.addProduct(product);
    }

    // Delete a product
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        
    }
    
 // Update an existing product (Edit)
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product product) {
        return productService.updateProduct(id, product);
    }

    // Filter by Category
    @GetMapping("/category/{category}")
    public List<Product> getByCategory(@PathVariable String category) {
        return productService.getByCategory(category);
    }

    // Sort products
    @GetMapping("/sort/{field}")
    public List<Product> sortProducts(@PathVariable String field) {
        return productService.sortProducts(field);
    }
}