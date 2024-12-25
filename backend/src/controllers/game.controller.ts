import { Request, Response } from "express";
import { User } from "../entities/user.entity";
import { GameService } from "../services/game.service";
import catchAsync from "../utils/catchAsync";
import { Repository } from "typeorm";
import { GameStatus } from "../entities/game.entity";

export class GameController {
  constructor(
    private readonly gameService: GameService,
    private readonly userRepository: Repository<User>
  ) {}

  createGame = catchAsync(async (req: Request, res: Response) => {
    const { email, amount, gameName, gameCategory, verifyToken } = req.body;

    const decryptedEmail = this.gameService.decryptEmail(email);

    if (!decryptedEmail)
      return res.status(400).json({ message: "Invalid email" });

    const user = await this.userRepository.findOne({
      where: { email: decryptedEmail },
    });

    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.balance < amount)
      return res.status(400).json({ message: "Insufficient balance" });

    const newGame = await this.gameService.createGame(
      user,
      amount,
      gameCategory,
      gameName,
      verifyToken
    );

    res.json({
      message: "Game created successfully",
      success: true,
      gameId: newGame.gameId,
    });
  });

  doneGame = catchAsync(async (req: Request, res: Response) => {
    const { gameId, gameResult, verifyToken } = req.body;

    if (!gameId || !gameResult || !verifyToken)
      return res.status(400).json({ message: "Invalid request" });

    if (gameResult != GameStatus.WIN && gameResult != GameStatus.LOOSE)
      return res.status(400).json({ message: "Invalid game result" });

    const game = await this.gameService.doneGame(
      gameId,
      gameResult,
      verifyToken
    );

    if (!game.success) return res.status(400).json({ message: game.message });

    res.json(game);
  });
}
