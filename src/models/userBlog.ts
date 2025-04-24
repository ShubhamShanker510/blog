import mongoose from "mongoose";

const userBlogSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog",

        }
    ]
})

const UserBlog=mongoose.models.UserBlog || mongoose.model("UserBlog", userBlogSchema);

export default UserBlog