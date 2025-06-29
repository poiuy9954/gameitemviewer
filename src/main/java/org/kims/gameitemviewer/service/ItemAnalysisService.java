package org.kims.gameitemviewer.service;

import org.kims.gameitemviewer.dto.PriceAnalysisDTO;
import org.kims.gameitemviewer.dto.PriceTrendDTO;
import org.kims.gameitemviewer.entity.ItemExchange;
import org.kims.gameitemviewer.repository.ItemExchangeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemAnalysisService {
    
    private final ItemExchangeRepository itemExchangeRepository;
    
    public List<String> getAllItemNames() {
        return itemExchangeRepository.findDistinctItemNames();
    }
    
    public PriceAnalysisDTO getItemPriceAnalysis(String itemName) {
        Double avgPrice = itemExchangeRepository.findAveragePriceByItemName(itemName);
        Integer maxPrice = itemExchangeRepository.findMaxPriceByItemName(itemName);
        Integer minPrice = itemExchangeRepository.findMinPriceByItemName(itemName);
        Long totalCount = itemExchangeRepository.countByItemName(itemName);
        
        return new PriceAnalysisDTO(itemName, avgPrice, maxPrice, minPrice, totalCount);
    }
    
    public List<PriceTrendDTO> getItemPriceTrend(String itemName, LocalDateTime startDate, LocalDateTime endDate) {
        List<ItemExchange> items = itemExchangeRepository.findByItemNameAndDateRange(itemName, startDate, endDate);
        
        return items.stream()
                .map(item -> new PriceTrendDTO(item.getItemScrapUpdateDttm(), item.getItemPrice(), item.getItemName()))
                .collect(Collectors.toList());
    }
    
    public List<PriceAnalysisDTO> getAllItemsAnalysis() {
        List<String> itemNames = getAllItemNames();
        
        return itemNames.stream()
                .map(this::getItemPriceAnalysis)
                .collect(Collectors.toList());
    }
}
