import express from "express";
import { validateRequest } from "../middlewares/joi.middleware";
import { UserSchema } from "../schema/user.schema";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { dataSource } from "../config/dataSource";
import authMiddleware from "../middlewares/auth.middleware";
import { Game } from "../entities/game.entity";
import { GameService } from "../services/game.service";
import { GameController } from "../controllers/game.controller";
import { MailerService } from "../services/email.service";
// import { MailerService } from '../services/email.service';

const router = express.Router();

let userRepository: Repository<User> = dataSource.getRepository(User);

let gameRepository: Repository<Game> = dataSource.getRepository(Game);
let gameService = new GameService(userRepository, gameRepository);

let gameController = new GameController(gameService, userRepository);

router.use(authMiddleware);
router.post("/create", gameController.createGame);
router.put("/done", gameController.doneGame);

export default router;
