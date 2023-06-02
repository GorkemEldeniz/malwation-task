import { Request, Response, NextFunction } from "express";
import { prisma } from "../app";
import bcrypt from "bcrypt";

//create User
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, name, password, role, phone } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    if (!hashedPassword) {
      return res.status(400).send({
        error: true,
        message: "şifre hatası",
        path: "password",
      });
    }

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role,
        phone,
      },
    });

    if (user) {
      return res.send({ ...user, password: "" });
    }
  } catch (err) {
    next(err);
  }
  return res.status(400).send({
    message: "Kullanıcı yaratılamadı",
    error: true,
    path: "email",
  });
};
//update user by id
export const updateUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, name, role, phone, active } = req.body;

  try {
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        email,
        name,
        role,
        phone: Number(phone),
        active,
      },
    });

    if (user.name) {
      return res.send({ ...user, password: "" });
    }
    return res.status(400).send({
      message: "Kullanıcı olusturulamadı",
      error: true,
    });
  } catch (err) {
    return res.status(400).send({
      message: "Kullanıcı güncellenemedi",
      info: err,
      error: true,
    });
  }
};
//login User
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(400).send({
        error: true,
        message: "Mail adresi bulunamadı",
        path: "email",
      });
    }

    // const isPasswordMatch = await bcrypt.compare(password, user?.password);

    // if (isPasswordMatch) {
    //   return res.status(400).send({
    //     error: true,
    //     message: "Hatalı şifre",
    //   });
    // }

    return res.send({ ...user, password: "" });
  } catch (er) {
    return next(er);
  }
};
// get user by id
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });
    if (!user?.name) {
      return res.status(400).send({
        error: true,
        message: "Kullanıcı bulunmadı",
      });
    }
    return res.send({ ...user, password: "" });
  } catch (er) {
    return res.status(400).send({
      error: true,
      message: er,
    });
  }
};
// delete user by id
export const deleteUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    if (!user?.name) {
      return res.status(400).send({
        error: true,
        message: "Kullanıcı bulunmadı",
      });
    }
    return res.send({ ...user, password: "" });
  } catch (er) {
    return res.status(400).send({
      error: true,
      message: er,
    });
  }
};
//get all user
export const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    if (!users.length) {
      return res.status(400).send({
        error: true,
        message: "Kullanıcılar alınamadı",
      });
    }
    const usersWithoutPassword = users.map((user) => ({
      ...user,
      password: "",
    }));

    return res.send(usersWithoutPassword);
  } catch (er) {
    return res.status(400).send({
      error: true,
      message: er,
    });
  }
};
