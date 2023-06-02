import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { body } from "express-validator";
import { validate, handleError } from "./middlewares/index";
import cors from "cors";
import * as controller from "./controllers/index";
import bcrypt from "bcrypt";

// dotenv config
dotenv.config();
// port
const PORT = process.env.PORT || 3001;
//initialize app
const app = express();
//initialize prisma
export const prisma = new PrismaClient();
//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post(
  "/",
  validate([
    body("name")
      .isLength({ max: 20, min: 2 })
      .withMessage("kullanıcı adı en az 2 en fazla 20 harf olabilir")
      .custom(async (value, { req }) => {
        const user = await prisma.user.findFirst({
          where: {
            name: req.body.name,
          },
        });
        if (user?.name) {
          throw new Error("Kullanıcı adı mevcut");
        }
      }),
    body("email")
      .isEmail()
      .withMessage("Hatalı email adresi")
      .custom(async (value) => {
        const user = await prisma.user.findFirst({
          where: {
            email: value,
          },
        });
        if (user?.name) {
          throw new Error("Bu mail kullanılmakta.");
        }
      }),
    body("password")
      .isLength({ max: 20, min: 2 })
      .withMessage("kullanıcı adı en az 2 en fazla 20 harf olabilir"),
    body("phone").matches(
      /(^[0\s]?[\s]?)([(]?)([5])([0-9]{2})([)]?)([\s]?)([0-9]{3})([\s]?)([0-9]{2})([\s]?)([0-9]{2})$/g
    ),
  ]),
  controller.createUser
);

// app.delete("/delete", async (req, res) => {
//   const response = await prisma.user.deleteMany();
//   if (response) {
//     return res.send("veriler silindi..");
//   }

//   return res.send("silinemedi...");
// });

app.put(
  "/user/:id",
  validate([
    body("name")
      .isLength({ max: 20, min: 2 })
      .withMessage("kullanıcı adı en az 2 en fazla 20 harf olabilir"),
    body("email").isEmail().withMessage("Hatalı email adresi"),
    body("phone").matches(
      /(^[0\s]?[\s]?)([(]?)([5])([0-9]{2})([)]?)([\s]?)([0-9]{3})([\s]?)([0-9]{2})([\s]?)([0-9]{2})$/g
    ),
  ]),
  controller.updateUserById
);

app.get("/all", controller.getAllUser);

app.post(
  "/login",
  validate([
    body("email")
      .isEmail()
      .withMessage("Hatalı email adresi")
      .custom(async (value) => {
        const user = await prisma.user.findFirst({
          where: {
            email: value,
          },
        });
        if (!user?.name) {
          throw new Error("Hatalı email adresi");
        }
      }),
    body("password")
      .isLength({ max: 20, min: 2 })
      .withMessage("kullanıcı adı en az 2 en fazla 20 harf olabilir")
      .custom(async (value, { req }) => {
        const user = await prisma.user.findFirst({
          where: {
            email: req.body.email,
          },
        });
        const isPasswordMatch = await bcrypt.compare(
          value,
          user?.password || ""
        );
        if (!isPasswordMatch) {
          throw new Error("Hatalı şifre");
        }
      }),
  ]),
  controller.loginUser
);

app.get("/user/:id", controller.getUserById);

app.delete("/user/:id", controller.deleteUserById);

app.use(handleError);

prisma
  .$connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server ${PORT} portunda çalışmakta...`);
    });
  })
  .catch(async (er) => {
    console.log(er);
    await prisma.$disconnect();
  });
