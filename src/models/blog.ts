import mongoose from 'mongoose'

const blogSchema=new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    slug:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    tags:{
        type:[String],
        default:[]
    },
    coverImage:{
        type: String,
        default:""
    },
    isPublished:{
        type: Boolean,
        default: false,
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now,
    },
    metaDescription:{
        type: String,
        default:"",
    },
    readTime:{
        type: Number,
        default:0,
    },

    views:{
        type: Number,
        default: 0,
    },

    likes:{
    type: Number,
    default: 0
    },
    comments:[
        {
            user: {type: mongoose.Schema.Types.ObjectId,  ref:"User"},
            comment: String,
            createdAt:{ type: Date, default: Date.now}
        }
    ]

})

blogSchema.pre("save", function(next){
    this.updatedAt=new Date();
    next();
})

const Blog=mongoose.models.Blog || mongoose.model("Blog", blogSchema);

export default Blog;

