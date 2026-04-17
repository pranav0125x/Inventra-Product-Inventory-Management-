package com.inventory.InventoryManagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;

    // create with duplicate check
    public Product addProduct(Product product) {

        if (productRepository.existsByNameIgnoreCase(product.getName())) {
            throw new RuntimeException("Product already exists");
        }

        return productRepository.save(product);
    }

    // read all
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // read by id
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    // update
    public Product updateProduct(Long id, Product product) {

        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setId(existing.getId());
        return productRepository.save(product);
    }

    // delete
    public void deleteProduct(Long id) {

        Product existing = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        productRepository.delete(existing);
    }

    // search
    public List<Product> searchProducts(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }

    // low stock
    public List<Product> getLowStockProducts() {
        return productRepository.findByQuantityLessThan(5);
    }

    // report count
    public long getProductCount() {
        return productRepository.count();
    }

    // report total value
    public double getTotalValue() {
        return productRepository.findAll()
                .stream()
                .mapToDouble(p -> p.getPrice() * p.getQuantity())
                .sum();
    }

    // category filter
    public List<Product> getByCategory(String category) {
        return productRepository.findByCategoryIgnoreCase(category);
    }

    // sort
    public List<Product> sortProducts(String field) {
        return productRepository.findAll(Sort.by(Sort.Direction.ASC, field));
    }
    
    public DashboardResponse getDashboardData() {

        List<Product> products = productRepository.findAll();

        // Total number of products
        long totalProducts = products.size();

        // Total value = sum of (price × quantity) for all products
        double totalValue = products.stream()
                .mapToDouble(p -> p.getPrice() * p.getQuantity())
                .sum();

        // Low stock = products where quantity is less than 5
        long lowStockCount = products.stream()
                .filter(p -> p.getQuantity() < 5)
                .count();

        return new DashboardResponse(totalProducts, totalValue, lowStockCount);
    }
}