package org.kims.gameitemviewer.controller;

import org.kims.gameitemviewer.dto.PriceAnalysisDTO;
import org.kims.gameitemviewer.dto.PriceTrendDTO;
import org.kims.gameitemviewer.service.ItemAnalysisService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ItemAnalysisController {
    
    private final ItemAnalysisService itemAnalysisService;
    
    @GetMapping("/names")
    public ResponseEntity<List<String>> getAllItemNames() {
        List<String> itemNames = itemAnalysisService.getAllItemNames();
        return ResponseEntity.ok(itemNames);
    }
    
    @GetMapping("/{itemName}/analysis")
    public ResponseEntity<PriceAnalysisDTO> getItemAnalysis(@PathVariable String itemName) {
        PriceAnalysisDTO analysis = itemAnalysisService.getItemPriceAnalysis(itemName);
        return ResponseEntity.ok(analysis);
    }
    
    @GetMapping("/{itemName}/trend")
    public ResponseEntity<List<PriceTrendDTO>> getItemTrend(
            @PathVariable String itemName,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        
        List<PriceTrendDTO> trend = itemAnalysisService.getItemPriceTrend(itemName, startDate, endDate);
        return ResponseEntity.ok(trend);
    }
    
    @GetMapping("/analysis/all")
    public ResponseEntity<List<PriceAnalysisDTO>> getAllItemsAnalysis() {
        List<PriceAnalysisDTO> analyses = itemAnalysisService.getAllItemsAnalysis();
        return ResponseEntity.ok(analyses);
    }
}
