import express from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { InvestmentController } from "../controllers/invest.controller";
import { validateRequest } from "../middlewares/joi.middleware";
import { InvestmentSchema } from "../schema/investment.schema";
import { InvestmentService } from "../services/investment.service";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { UserController } from "../controllers/user.controller";
import { dataSource } from "../config/dataSource";
import { Investment } from "../entities/investment.entity";
import { EarningsHistory } from "../entities/earningHistory.entity";
import { Claim } from "../entities/claim.entity";
import { CoinService } from "../services/coin.service";
import { UserService } from "../services/user.service";
import { Withdrawal } from "../entities/withrawal.entity";

const router = express.Router();
let userRepository: Repository<User> = dataSource.getRepository(User);
let withdrawalRepository: Repository<Withdrawal> =
  dataSource.getRepository(Withdrawal);

let userService = new UserService(userRepository, withdrawalRepository);

let investmentRepository: Repository<Investment> =
  dataSource.getRepository(Investment);

let investmentController: InvestmentController;
let coinService: CoinService;

coinService = new CoinService();

let earningHistoryRepository: Repository<EarningsHistory> =
  dataSource.getRepository(EarningsHistory);

let claimRepository: Repository<Claim> = dataSource.getRepository(Claim);

let investmentService = new InvestmentService(
  userRepository,
  earningHistoryRepository,
  investmentRepository
);

investmentController = new InvestmentController(
  investmentService,
  coinService,
  userRepository,
  investmentRepository,
  earningHistoryRepository,
  claimRepository,
  withdrawalRepository,
  userService
);

// ========== PROTECTED INVESTMENT ROUTES ========== //
router.use(authMiddleware);

router.post(
  "/invest",
  validateRequest(InvestmentSchema.createInvestment),
  investmentController.createInvestment
);
router.get("/claim-roi", investmentController.claimRoi);
router.post("/claim", investmentController.claimRefEarnings);
router.get("/history", investmentController.getInvestments);
router.get("/all-investments", investmentController.getAllInvestments);
// router.post(
//   "/withdraw",
//   validateRequest(InvestmentSchema.withdraw),
//   investmentController.withdraw
// );

router.post("/withdraw-request", investmentController.withdrawalRequest);
router.put("/withdraw-accept/:id", investmentController.updateWithdrawal);

export default router;
