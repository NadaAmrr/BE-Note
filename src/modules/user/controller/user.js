import noteModel from "../../../../DB/model/note.model.js";
import userModel from "../../../../DB/model/user.model.js";
import { Sequelize } from "sequelize";
import { Op } from "sequelize";

//*1- sign up
export const signup = async (req, res, next) => {
  try {
    const { name, email, password, age } = req.body;
    const check = await userModel.findOne({
      where: {
        email,
      },
    });
    if (check) {
      return res.json({ message: "Email Exist" });
    }
    const user = await userModel.create({ email, name, password, age });
    return res.json({
      message: "Sign Up successfully",
      user,
    });
  } catch (error) {
    return res.json({
      message: "catch error",
      error,
      errMsg: error.message,
      stack: error.stack,
    });
  }
};
//*2- sign in
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const checkEmail = await userModel.findOne({
      where: {
        email,
      },
    });
    if (checkEmail) {
      const checkPass = await userModel.findOne({
        where: {
          id: checkEmail.id,
          password: password,
        },
      });
      console.log(checkEmail.id);
      return checkPass
        ? res.json({ message: "Login successfully", checkPass })
        : res.json({ message: "password wrong", checkEmail });
    } else if (!checkEmail) {
      res.json({ message: "Invalid Email", checkEmail });
    }
  } catch (error) {
    return res.json({
      message: "catch error",
      error,
      errMsg: error.message,
      stack: error.stack,
    });
  }
};
//*3- update user
export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, password, age } = req.body;
    const user = await userModel.update(
      { name, email, password, age },
      {
        where: {
          id: id,
        },
      }
    );
    return user[0]
      ? res.json({ message: "updated successfully", user })
      : res.json({ message: "In-valid ID", user });
  } catch (error) {
    return res.json({
      message: "catch error",
      error,
      errMsg: error.message,
      stack: error.stack,
    });
  }
};
//*4- delete user
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userModel.destroy({
      where: {
        id: id,
      },
    });
    return user
      ? res.json({ message: "deleted successfully", user })
      : res.json({ message: "In-valid ID", user });
  } catch (error) {
    return res.json({
      message: "catch error",
      error,
      errMsg: error.message,
      stack: error.stack,
    });
  }
};
//*5- search for user where his name start with "a" and age less than 30 => using like for characters
export const search = async (req, res, next) => {
  try {
    const { start, maxAge } = req.query;
    const user = await userModel.findAll({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
      where: {
        name: { [Sequelize.Op.like]: `${start}%` },
        age: { [Sequelize.Op.lt]: maxAge },
      },
    });
    return res.json({ message: "Done", user });
  } catch (error) {
    return res.json({
      message: "catch error",
      error,
      errMsg: error.message,
      stack: error.stack,
    });
  }
};
//*6- search for user where his age is between 20 and 30
export const ageSearch = async (req, res) => {
  try {
    const { minAge, maxAge } = req.query;
    const users = await userModel.findAll({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
      where: {
        age: { [Sequelize.Op.between]: [minAge, maxAge] },
      },
    });
    return res.json({ message: "Done", users });
  } catch (error) {
    return res.json({
      message: "catch error",
      error,
      errMsg: error.message,
      stack: error.stack,
    });
  }
};
//*7 - get the 3 oldest users
export const searchOldest = async (req, res, next) => {
  try {
    const limit = req.params.limit;
    const users = await userModel.findAll({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
      order: [["age", "DESC"]],
      limit: Number(limit),
    });
    return res.json({ message: `${limit} Oldest Users`, users });
  } catch (error) {
    return res.json({
      message: "catch error",
      error,
      errMsg: error.message,
      stack: error.stack,
    });
  }
};
//*8- search for users by list of ids => using IN
export const searchByLists = async (req, res, next) => {
  try {
    const { id } = req.query;
    const users = await userModel.findAll({
      where: {
        id: {
          [Op.in]: id,
        },
      },
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });
    return res.json({ message: `Done`, users });
  } catch (error) {
    return res.json({
      message: "catch error",
      error,
      errMsg: error.message,
      stack: error.stack,
    });
  }
};
//*9- get all user
export const users = async (req, res, next) => {
  const users = await userModel.findAll({
    attributes: { exclude: ["password", "createdAt", "updatedAt"] },
    include: {
      model: noteModel,
      attributes: { exclude: ["createdAt", "updatedAt"]},
    },
  });
  return res.json({ message: "All users", users });
};
// =============Another scenario for Login ==========//
// export const login1 = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     const check = await userModel.findOne({
//       where: {
//         email,
//         password,
//       },
//     });
//     if (check) {
//       res.json({ message: "Login successfully", check });
//     } else {
//       res.json({ message: "invalid", check });
//     }
//   } catch (error) {
//     return res.json({
//       message: "catch error",
//       error,
//       errMsg: error.message,
//       stack: error.stack,
//     });
//   }
// };
// ============================================================
