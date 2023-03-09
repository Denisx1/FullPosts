import UserModel from "../model/UserModel.js";
import Post from "../model/PostModels.js";



export const deleteUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.json({ message: `this user: ${username} is absent` });
    }
    await Post.deleteMany({ author: user._id });
    await UserModel.findByIdAndDelete(user._id);
    return res.json({ message: "Delete Successfuly" });
  } catch (e) {
    console.log(e);
  }
};
export const updateUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.json({ message: `this user: ${username} is absent` });
    }
    if (user.role === "MANAGER") {
      return res.json({
        message: `this user: ${username} already is MANAGER`,
      });
    }
    await UserModel.findOneAndUpdate(
      { username },
      {
        role: "MANAGER",
      }
    );

    return res.json({ message: `update user ${username} to MANAGER` });
  } catch (e) {
    console.log(e);
  }
};
