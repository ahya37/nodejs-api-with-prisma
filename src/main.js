import { logger } from "./aplication/logging.js";
import { web } from "./aplication/web.js";

web.listen(300, () => {
    logger.info("App start");
});