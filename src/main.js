import { logger } from "./aplication/logging.js";
import { web } from "./aplication/web.js";

web.listen(3000, () => {
    logger.info("App start");
});