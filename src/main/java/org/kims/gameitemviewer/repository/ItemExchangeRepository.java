package org.kims.gameitemviewer.repository;

import org.kims.gameitemviewer.entity.ItemExchange;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ItemExchangeRepository extends JpaRepository<ItemExchange, ItemExchange.ItemExchangeId> {
    
    List<ItemExchange> findByItemName(String itemName);
    
    @Query("SELECT i FROM ItemExchange i WHERE i.itemName = :itemName AND i.itemScrapUpdateDttm BETWEEN :startDate AND :endDate ORDER BY i.itemScrapUpdateDttm")
    List<ItemExchange> findByItemNameAndDateRange(@Param("itemName") String itemName, 
                                                  @Param("startDate") LocalDateTime startDate, 
                                                  @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT DISTINCT i.itemName FROM ItemExchange i")
    List<String> findDistinctItemNames();
    
    @Query("SELECT AVG(i.itemPrice) FROM ItemExchange i WHERE i.itemName = :itemName")
    Double findAveragePriceByItemName(@Param("itemName") String itemName);
    
    @Query("SELECT MAX(i.itemPrice) FROM ItemExchange i WHERE i.itemName = :itemName")
    Integer findMaxPriceByItemName(@Param("itemName") String itemName);
    
    @Query("SELECT MIN(i.itemPrice) FROM ItemExchange i WHERE i.itemName = :itemName")
    Integer findMinPriceByItemName(@Param("itemName") String itemName);
    
    @Query("SELECT COUNT(i) FROM ItemExchange i WHERE i.itemName = :itemName")
    Long countByItemName(@Param("itemName") String itemName);
    
    @Query("SELECT COUNT(i) FROM ItemExchange i")
    Long countAll();
    
    @Query("SELECT AVG(i.itemPrice) FROM ItemExchange i")
    Double findOverallAveragePrice();
}
