package org.kims.gameitemviewer.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "TB_ITEM_EXCHANGE")
@IdClass(ItemExchange.ItemExchangeId.class)
@Data
@NoArgsConstructor
public class ItemExchange {
    
    @Id
    @Column(name = "ITEM_CODE")
    private Integer itemCode;
    
    @Id
    @Column(name = "ITEM_NAME")
    private String itemName;
    
    @Id
    @Column(name = "ITEM_END_DTTM")
    private LocalDateTime itemEndDttm;
    
    @Column(name = "ITEM_PRICE")
    private Integer itemPrice;
    
    @Column(name = "ITEM_BID_PRICE")
    private Integer itemBidPrice;
    
    @Column(name = "ITEM_OPTION", columnDefinition = "JSON")
    private String itemOption;
    
    @Column(name = "ITEM_SCRAP_START_DTTM")
    private LocalDateTime itemScrapStartDttm;
    
    @Column(name = "ITEM_SCRAP_UPDATE_DTTM")
    private LocalDateTime itemScrapUpdateDttm;
    
    @Column(name = "ITEM_SCRAP_COUNT")
    private Integer itemScrapCount;
    
    @Column(name = "SYS_CREATION_DTTM")
    private LocalDateTime sysCreationDttm;
    
    @Column(name = "SYS_UPDATE_DTTM")
    private LocalDateTime sysUpdateDttm;
    
    @Column(name = "SYS_SERVICE_NAME")
    private String sysServiceName;
    
    @Column(name = "SYS_FUNC_NAME")
    private String sysFuncName;
    
    // 복합 기본키 클래스
    @Data
    @NoArgsConstructor
    public static class ItemExchangeId implements Serializable {
        private Integer itemCode;
        private String itemName;
        private LocalDateTime itemEndDttm;
        
        public ItemExchangeId(Integer itemCode, String itemName, LocalDateTime itemEndDttm) {
            this.itemCode = itemCode;
            this.itemName = itemName;
            this.itemEndDttm = itemEndDttm;
        }
    }
}
