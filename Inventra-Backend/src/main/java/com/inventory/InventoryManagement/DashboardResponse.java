package com.inventory.InventoryManagement;

public class DashboardResponse {

    private long totalProducts;      // total number of products
    private double totalValue;       // sum of price × quantity
    private long lowStockCount;      // products with quantity < 5

    // Constructor
    public DashboardResponse(long totalProducts, double totalValue, long lowStockCount) {
        this.totalProducts = totalProducts;
        this.totalValue = totalValue;
        this.lowStockCount = lowStockCount;
    }

    // Getters
    public long getTotalProducts() { return totalProducts; }
    public double getTotalValue() { return totalValue; }
    public long getLowStockCount() { return lowStockCount; }
}