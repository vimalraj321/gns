import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { Game, GameCategory, GameStatus } from "../entities/game.entity";
import Cryptr from "cryptr";
import { v4 as uuidv4 } from "uuid";

export class GameService {
  constructor(
    private readonly userRepository: Repository<User>,
    private readonly gameRepository: Repository<Game>
  ) {}

  async createGame(
    user: User,
    amount: number,
    gameCategory: GameCategory,
    gameName: string
  ) {
    const newGame = await this.gameRepository.create({
      user,
      amount,
      category: gameCategory,
      gameName,
      status: GameStatus.PENDING,
      gameId: uuidv4(),
      gameStartedAt: new Date(),
    });

    const savedGame = await this.gameRepository.save(newGame);

    return savedGame;
  }

  async doneGame(gameId: string, gameResult: GameStatus) {
    const decryptedGameId = this.decryptGameId(gameId);

    if (!decryptedGameId) {
      return {
        success: false,
        message: "Invalid game ID",
      };
    }

    const game = await this.gameRepository.findOne({
      where: { gameId: decryptedGameId },
      relations: ["user"],
    });

    if (!game) {
      return {
        success: false,
        message: "Game not found",
      };
    }

    let win = false;

    if (
      game.category == GameCategory.SURVIVAL &&
      game.gameStartedAt &&
      new Date().getTime() - game.gameStartedAt.getTime() > 600000
    ) {
      win = true;
    } else if (
      game.category != GameCategory.PLAY &&
      gameResult == GameStatus.WIN
    ) {
      win = true;
    }

    const userBalance = win
      ? game.user.balance + game.amount
      : game.user.balance - game.amount;

    game.user.balance += userBalance;

    await this.userRepository.save(game.user);

    game.status = win ? GameStatus.WIN : GameStatus.LOOSE;

    const data = await this.gameRepository.save(game);

    return {
      success: true,
      message: "Game done successfully",
      data,
    };
  }

  decryptEmail(email: string): string | null {
    const secretKey = process.env.SECRET_KEY;

    if (!secretKey) return null;

    const cryptr = new Cryptr(secretKey);
    const decryptedEmail = cryptr.decrypt(email);

    return decryptedEmail.split("~")[0];
  }

  decryptGameId(gameId: string): string | null {
    const secretKey = process.env.GAME_SECRET_KEY;

    if (!secretKey) return null;

    const cryptr = new Cryptr(secretKey);
    const decryptedGameId = cryptr.decrypt(gameId);

    return decryptedGameId;
  }
}
