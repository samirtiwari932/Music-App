import {getHistories, getRecentlyPlayed, removeHistory, updateHistory} from "#/controllers/history";
import {mustAuth} from "#/middleware/auth";
import {validate} from "#/middleware/validator";
import {updateHistorySchema} from "#/utils/validationSchema";
import {Router} from "express";

const router = Router();

router.post("/", mustAuth, validate(updateHistorySchema), updateHistory);
router.delete("/remove", mustAuth, removeHistory);
router.get("/", mustAuth, getHistories);
router.get("/recently-played", mustAuth, getRecentlyPlayed);

export default router;
