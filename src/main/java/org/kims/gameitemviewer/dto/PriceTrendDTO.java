package org.kims.gameitemviewer.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PriceTrendDTO {
    private LocalDateTime date;
    private Integer price;
    private String itemName;
}
