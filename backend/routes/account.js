const express = require("express");
const assert = require("assert");
const { Account } = require("../db/dbSchema");
const { authMiddleware } = require("../middlewares/user");
const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  const user_account = await Account.findOne({
    userId: req.userId,
  });

  const balance = user_account.balance;

  return res.status(200).json({
    balance: balance,
  });
});

/*Some context for the following route:-
 * When performing transactions, balance is deducted from some users' account and added to some other users' account.
 * Normally, transactions are not atomic i.e. when we deducted the amount from the user maybe our database could fail or
 maybe Node.js might fail which lead to the other user never receiving the amount even though it got deducted from the first users' account
 (Similar to the Banker's problem in Operating Systems)
 * To avoid this we want all actions to be atomic i.e. either both deduction and addition happens together at the same time or none of them happen.
 * This can be facilitated by using the 'Transaction' feature that mongoose provides which allows us to run all these operations together in isolation.*/

router.post("/transfer", authMiddleware, async (req, res) => {
  let session = null;

  Account.startSession()
    .then((_session) => {
      session = _session;
      return session.withTransaction(async () => {
        // Fetch sender and receiver accounts within the transaction
        const sender = await Account.findOne({ userId: req.userId }).session(
          session,
        );

        const receiver = await Account.findOne({ userId: req.body.to }).session(
          session,
        );

        if (!receiver) {
          throw new Error("Invalid Account");
        }

        // Check if sender has sufficient balance
        if (!sender || req.body.amount > sender.balance) {
          throw new Error("Insufficient Balance");
        }

        if (req.body.amount <= 0) {
          throw new Error("Transaction Declined: Amount has to be more than 0");
        }

        const sender_old_balance = sender.balance;
        const receiver_old_balance = receiver.balance;

        await Account.updateOne(
          {
            userId: req.userId,
          },
          {
            $inc: {
              balance: -req.body.amount,
            },
          },
        );

        await Account.updateOne(
          {
            userId: req.body.to,
          },
          {
            $inc: {
              balance: req.body.amount,
            },
          },
        );

        return {
          sender_old_balance,
          receiver_old_balance,
        };
      });
    })
    .then(async ({ sender_old_balance, receiver_old_balance }) => {
      // Re-fetch sender and receiver to confirm balance updates
      const sender = await Account.findOne({ userId: req.userId });
      const receiver = await Account.findOne({ userId: req.body.to });

      const condition1 = sender_old_balance - req.body.amount == sender.balance;
      const condition2 =
        receiver_old_balance + req.body.amount == receiver.balance;

      // To check if the balances have been updated correctly
      return {
        condition1,
        condition2,
      };
    })
    .then(({ condition1, condition2 }) => {
      assert.strictEqual(condition1, true);
      assert.strictEqual(condition2, true);
      res.status(200).json({ message: "Transfer successful" });
    })
    .catch((error) => {
      if (error.message == "Insufficient Balance") {
        res.status(400).json({ message: error.message });
      } else if (error.message == "Invalid Account") {
        res.status(400).json({
          message: "Invalid Account",
        });
      } else if (error.message == "Transaction Declined: ") {
        res.status(400).json({
          message: "Invalid Account",
        });
      } else {
        res.status(500).json({
          message: "Transaction Declined: Amount has to be more than 0",
        });
      }
    })
    .finally(() => session.endSession());
});

module.exports = router;
