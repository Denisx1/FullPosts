import Comments from "../model/Comments.js";
import PostModels from "../model/PostModels.js";

export const createComment = async (req, res) => {
  try {
    const { postId, comment } = req.body;
    if (!comment) {
      return res.json({ message: "Коментарий не может быть пустым" });
    }
    const { userId } = req;
    const newComment = new Comments({ comment, author: userId });
    await newComment.save();
    try {
      await PostModels.findByIdAndUpdate(postId, {
        $push: { comments: newComment._id }
      });
    } catch (e) {
      console.log(e);
    }
    res.json(newComment);
  } catch (e) {
    res.json({ message: "Что то пошло не так" });
  }
};

export const deletComment = async (req, res) => {
  try {
    const { id, comentId } = req.params;
    const comment = await Comments.findByIdAndDelete(comentId);
    if (!comment) {
      return res.json({ message: "такого комента нету" });
    }
    await PostModels.findByIdAndUpdate(id, {
      $pull: { comments: comentId },
    });
    return res.json({ message: "коментарий был удален" });
  } catch (e) {
    console.log(e);
  }
};
