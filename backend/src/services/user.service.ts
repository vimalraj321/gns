import { User } from "../entities/user.entity";
import { In, Repository } from "typeorm";
// import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Withdrawal } from "src/entities/withrawal.entity";

type ResquestBodyWithdraw = {
  data: {
    currency: "USDT";
    to_address: string;
    txn_id: string;
    user_address: string;
    user_email: string;
    value_in_usd: string;
  };
  header: {
    cca_key: string;
    cca_secret: string;
  };
};

type WithdrawResponse = {
  status: string;
  response: {
    message: string;
    data: {
      withdraw_value_in_usd: number;
      balance_in_usd: number;
      txn_hash: string;
      request: string;
      currency: string;
      user_email: string;
      txn_id: string;
      transfer_fee_in_usd: number[];
    };
  };
};

export class UserService {
  levels = [
    {
      level: 1,
      rate: 0.5,
      minSponsors: 1,
      selfInvestment: 100,
      directBusiness: 100,
    },
    {
      level: 2,
      rate: 0.3,
      minSponsors: 2,
      selfInvestment: 100,
      directBusiness: 300,
    },
    {
      level: 3,
      rate: 0.2,
      minSponsors: 3,
      selfInvestment: 200,
      directBusiness: 500,
    },
    {
      level: 4,
      rate: 0.1,
      minSponsors: 4,
      selfInvestment: 200,
      directBusiness: 1000,
    },
    {
      level: 5,
      rate: 0.1,
      minSponsors: 5,
      selfInvestment: 300,
      directBusiness: 1000,
    },
    {
      level: 6,
      rate: 0.1,
      minSponsors: 6,
      selfInvestment: 300,
      directBusiness: 1500,
    },
    {
      level: 7,
      rate: 0.05,
      minSponsors: 7,
      selfInvestment: 500,
      directBusiness: 1500,
    },
    {
      level: 8,
      rate: 0.05,
      minSponsors: 8,
      selfInvestment: 500,
      directBusiness: 2000,
    },
    {
      level: 9,
      rate: 0.05,
      minSponsors: 9,
      selfInvestment: 500,
      directBusiness: 2000,
    },
    {
      level: 10,
      rate: 0.05,
      minSponsors: 10,
      selfInvestment: 500,
      directBusiness: 2500,
    },
    {
      level: 11,
      rate: 0.03,
      minSponsors: 10,
      selfInvestment: 1000,
      directBusiness: 3000,
    },
    {
      level: 16,
      rate: 0.03,
      minSponsors: 10,
      selfInvestment: 1500,
      directBusiness: 4000,
    },
  ];

  constructor(
    private userRepository: Repository<User>,
    private withdrawalRepository: Repository<Withdrawal>
  ) {}

  // ============== GENERATE UNIQUE REFERRAL CODE ============== //
  async generateUniqueReferralCode(): Promise<string> {
    let referralCode: string = "";
    let isUnique = false;

    while (!isUnique) {
      referralCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      const existingCode = await this.userRepository.findOne({
        where: { referralCode },
      });
      if (!existingCode) isUnique = true;
    }

    return referralCode;
  }

  // ============== HASH PASSWORD ============== //
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  // ============== VERIFY PASSWORD ============== //
  async verifyPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  // ===================== VERIFY USER CREDENTIALS ===================== //
  // async verifyUserCredentials(email: string, password: string): Promise<User | null> {
  //   const user = await this.userRepository.findOne({ where: { email } });
  //   if (!user) return null;
  //   return user;
  // }

  // ====================== SEND NEW IP NOTIFICATION ====================== //
  // async sendNewIpNotification(user: User, newIp: string): Promise<void> {
  //   const transporter = nodemailer.createTransport({
  //     service: "gmail",
  //     auth: {
  //       user: "youremail@gmail.com",
  //       pass: "yourpassword",
  //     },
  //   });

  //   const mailOptions = {
  //     from: "youremail@gmail.com",
  //     to: user.email,
  //     subject: "New IP Address Login Notification",
  //     html: `
  //     <p>Dear ${user.email},</p>
  //     <p>A new login was detected from IP address: <strong>${newIp}</strong>. If this wasn't you, please secure your account immediately.</p>
  //     `,
  //   };

  //   await transporter.sendMail(mailOptions);
  // }

  // ==================== UPDATE USER ==================== //
  async updateUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  // ===================== GENERATE AUTH TOKEN ===================== //
  generateAuthToken(user: User): string {
    // console.log("user", user);
    const tokenPayload = { email: user.email, id: user.id };
    const secretKey = process.env.JWT_SECRET!;
    const token = jwt.sign(tokenPayload, secretKey, { expiresIn: "10d" });
    return token;
  }

  async extendedReferrals(theUser: User): Promise<User[]> {
    let referrals: User[] = [];
    const user = await this.userRepository.findOne({
      where: { wallet: theUser.wallet },
      relations: [
        "referredUsers",
        "investments",
        "referredUsers.investments",
        "referredUsers.referredUsers.investments",
      ],
    });
    if (!user) return referrals;
    for (let referral of user.referredUsers) {
      const ref = await this.userRepository.findOne({
        where: { wallet: referral.wallet },
        relations: [
          "referredUsers",
          "investments",
          "referredUsers.investments",
          "referredUsers.referredUsers.investments",
        ],
      });
      if (ref) referrals.push(ref);
      if (!ref) continue;
      if (ref.referredUsers.length > 0) {
        const extendedReferrals = await this.extendedReferrals(ref);
        referrals = [...referrals, ...extendedReferrals];
      }
    }

    return referrals;
  }

  generateTransactionId = () => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  };

  async sendCoinThroughGateway(amount: number, to: string): Promise<any> {
    const transactionId = this.generateTransactionId();
    // const data = {
    //   "data": {
    //     "currency": "USDT",
    //     "to_address": "0xAE35847d848fEd356e55fb25EaA8a26F9CC78F99",
    //     "txn_id": transactionId,
    //     "user_address": process.env.USER_WALLET,
    //     "user_email": `${to}@gmail.com`,
    //     "value_in_usd": amount.toString()
    //   },
    //   "header": {
    //     "cca_key": process.env.CCA_KEY,
    //     "cca_secret": process.env.CCA_SECRET
    //   }
    // }

    try {
      // Perform the API request
      const request = await fetch("https://api.coinconnect.tech/withdraw/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            currency: "USDT",
            to_address: to,
            txn_id: transactionId,
            user_address: process.env.USER_WALLET,
            user_email: `${to}@gmail.com`,
            value_in_usd: amount.toString(),
          },
          header: {
            cca_key: process.env.CCA_KEY,
            cca_secret: process.env.CCA_SECRET,
          },
        }),
      });

      const response = await request.json();

      console.log("Response:", response);

      return { ...response, transactionId };
    } catch (error: any) {
      console.error("Error occurred:", error);
      return { success: false, error };
    }
  }

  verifyAuthToken(token: any): any {
    const secretKey = process.env.JWT_SECRET!;
    try {
      const decoded = jwt.verify(token, secretKey);
      return decoded;
    } catch (error) {
      return null;
    }
  }

  async updateEligibilityLevel(userIds: number[] = []) {
    const usersToProcess =
      userIds.length > 0
        ? await this.userRepository.find({
            where: { id: In(userIds) },
            relations: [
              "referredUsers",
              "investments",
              "referredUsers.investments",
            ],
          })
        : await this.userRepository.find({
            relations: [
              "referredUsers",
              "investments",
              "referredUsers.investments",
            ],
          });
    const usersToSave: User[] = [];

    for (const user of usersToProcess) {
      console.log("updating eligibility level for user", user);
      let highestEligibleLevel = 0;

      for (const level of this.levels) {
        const isEligible =
          user.referredUsers.length >= level.minSponsors &&
          user.investments.reduce(
            (total, invest) => total + invest.amount,
            0
          ) >= level.selfInvestment &&
          user.referredUsers.reduce((total, referredUser) => {
            return (
              total +
              referredUser.investments.reduce(
                (sum, investment) => sum + investment.amount,
                0
              )
            );
          }, 0) >= level.directBusiness;

        if (isEligible) {
          highestEligibleLevel = Math.max(highestEligibleLevel, level.level);
        }
      }

      // Check if eligibility level needs update
      if (user.eligibilityLevel !== highestEligibleLevel) {
        user.eligibilityLevel = highestEligibleLevel;
        usersToSave.push(user);

        console.log(
          `Updated user ${user.id} eligibility level to ${highestEligibleLevel}`
        );
      }
    }
    if (usersToSave.length > 0) {
      await this.userRepository.save(usersToSave);
    }
  }

  async userWithdrawal(tnx_id: string): Promise<any> {
    const withdrawal = await this.withdrawalRepository.findOne({
      where: {
        transactionId: tnx_id,
      },
      relations: ["user"],
    });

    if (!withdrawal) {
      return {
        status: "failed",
        message: "Withdrawal not found",
        success: false,
      };
    }

    // if (withdrawal.amount < withdrawal.user.balance) {
    //   return {
    //     status: "failed",
    //     message: "Insufficient balance",
    //   };
    // }

    const body: ResquestBodyWithdraw = {
      data: {
        currency: "USDT",
        to_address: withdrawal.user.wallet,
        txn_id: tnx_id,
        user_address: withdrawal.user.wallet,
        user_email: withdrawal.user.email,
        value_in_usd: (withdrawal.amount * 0.9).toFixed(2),
      },
      header: {
        cca_key: process.env.CCA_KEY_WITHDRAW!,
        cca_secret: process.env.CCA_SECRET_WITHDRAW!,
      },
    };

    const response = await fetch(`https://api.coinconnect.tech/withdraw/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data: WithdrawResponse = await response.json();

    await this.withdrawalRepository.update(withdrawal.id, {
      status: data.status === "OK" ? "completed" : "failed",
    });

    if (data.status != "OK") {
      await this.userRepository.update(withdrawal.user.id, {
        balance: parseFloat(
          (Number(withdrawal.user.balance) + Number(withdrawal.amount)).toFixed(
            4
          )
        ),
      });
    }

    return {
      status: data.status === "OK" ? "success" : "failed",
      success: data.status === "OK" ? true : false,
      message:
        data.status === "OK"
          ? "Withdrawal request sent successfully"
          : "Withdrawal request failed",
      data: {
        txn_id: tnx_id,
      },
    };
  }
}
