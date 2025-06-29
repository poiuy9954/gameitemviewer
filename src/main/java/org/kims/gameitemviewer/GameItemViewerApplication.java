package org.kims.gameitemviewer;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@Slf4j
@SpringBootApplication
public class GameItemViewerApplication {

    public static void main(String[] args) {
        log.info("=== Game Item Viewer Starting ===");
        SpringApplication.run(GameItemViewerApplication.class, args);
        log.info("=== Game Item Viewer Started Successfully ===");
    }
}
