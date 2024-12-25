import express from "express";
import { validateRequest } from "../middlewares/joi.middleware";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { dataSource } from "../config/dataSource";
import { Game } from "../entities/game.entity";
import { GameService } from "../services/game.service";
import { GameController } from "../controllers/game.controller";
import { GameSchema } from "../schema/game.schema";

const router = express.Router();

let userRepository: Repository<User> = dataSource.getRepository(User);

let gameRepository: Repository<Game> = dataSource.getRepository(Game);
let gameService = new GameService(userRepository, gameRepository);

let gameController = new GameController(gameService, userRepository);

// router.use(authMiddleware);
router.post(
  "/create",
  validateRequest(GameSchema.createGame),
  gameController.createGame
);

router.put("/done", gameController.doneGame);

export default router;
