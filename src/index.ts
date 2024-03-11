import app from "./app";
import { Logger } from "./utils/logger";

const logger = Logger.getInstance();
const port: string | number = 3003;

app.listen(port, "0.0.0.0", () => {
  logger.info("Server listening on http://localhost:3003");
});
