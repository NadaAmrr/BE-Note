import noteModel from "../../../../DB/model/note.model.js";
import userModel from "../../../../DB/model/user.model.js";

// 1- add note
export const add = async (req, res, next) => {
  try {
    const user = await userModel.findOne({
      where: {
        id: req.body.UserId,
      },
    });
    if (user == null) {
      return res.json({ message: "In-valid UserId" });
    }
    const note = await noteModel.create(req.body, {
      fields: ["UserId", "title", "content"],
    });
    return res.json({ message: "Note added", note });
  } catch (error) {
    return res.json({
      message: "catch error",
      error,
      errMsg: error.message,
      stack: error.stack,
    });
  }
};
// 2- delete note (note creator only )
export const deleteNote = async (req, res, next) => {
  try {
    const user = await userModel.findOne({
      where: {
        id: req.params.UserId,
      },
    });
    if (user == null) {
      return res.json({ message: "In-valid UserId" });
    } else {
      const note = await noteModel.destroy({
        where: {
          id: req.params.id,
          UserId: req.params.UserId,
        },
      });
      return note
        ? res.json({ message: "Done", note })
        : res.json({ message: "In-valid Note ID", note });
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
// 3- update note (note owner only)
export const update = async (req, res, next) => {
  try {
    const user = await userModel.findOne({
      where: {
        id: req.params.UserId,
      },
    });
    if (user == null) {
      return res.json({ message: "In-valid UserId" });
    } else {
      const note = await noteModel.update(req.body, {
        fields: ["title", "content"],
        where: {
          id: req.params.id,
          UserId: req.params.UserId,
        },
      });
      return note[0]
        ? res.json({ message: "note updated", note })
        : res.json({ message: "In-valid Note ID", note });
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
// 4- get all notes
export const getAllNotes = async (req, res, next) => {
  try {
    const notes = await noteModel.findAll();
    return res.json({ message: "Done", notes });
  } catch (error) {
    return res.json({
      message: "catch error",
      error,
      errMsg: error.message,
      stack: error.stack,
    });
  }
};
// 5- get all notes with their owners informaion (using include)
export const noteList = async (req, res, next) => {
  try {
    const notes = await noteModel.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: {
        model: userModel,
        attributes: { exclude: [ "password", "createdAt", "updatedAt"] },
      },
    });
    return res.json({ message: "Done", notes });
  } catch (error) {
    return res.json({
      message: "catch error",
      error,
      errMsg: error.message,
      stack: error.stack,
    });
  }
};
