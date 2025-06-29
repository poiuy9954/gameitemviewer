package org.kims.gameitemviewer.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PriceAnalysisDTO {
    private String itemName;
    private Double averagePrice;
    private Integer maxPrice;
    private Integer minPrice;
    private Long totalCount;
}
