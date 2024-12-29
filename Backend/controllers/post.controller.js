import Post from "../Models/post.model.js";


export const getFeedPosts = async (req, res) => {
    try {
        const posts = await Post.find({ author: { $in: req.user.conncetions } }).populate("author", "name username  profilePicture headline  ").populate("comments.user", "name   profilePicture ").sort({ createdAt: -1 })
        res.json(posts)
    } catch (error) {
        console.log(`Problem occured:${error}`)
        res.status(500).json({ message: "Server Error" })
    }
}
export const createPost = async (req, res) => {
    try {
        const newPost = new Post({
            author: req.user._id,
            content: req.body.content
        })
        const post = await newPost.save()
        res.json(post)
    } catch (error) {
        console.log(`Problem occured:${error}`)
        res.status(500).json({ message: "Server Error" })
    }
}
export const deletePost = async (req, res) => {
    try {
        const post = req.params.id
        const user = req.user._id
        if (post && user) {
            const postDeleted = await Post.findOneAndDelete({ _id: post, author: user })
            if (!postDeleted) {
                return res.status(404).json({ message: "Post not found" })
            }
            res.json({ message: "Post deleted" })
        }
    } catch (error) {
        console.log(`Problem occured:${error}`)
        res.status(500).json({ message: "Server Error" })
    }
}
export const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate("author", "name username  profilePicture headline  ").populate("comments.user", "name   profilePicture ").sort({ createdAt: -1 })
        if (!post) {
            return res.status(404).json({ message: "Post not found" })
        }
    } catch (error) {
        console.log(`Problem occured:${error}`)
        res.status(500).json({ message: "Server Error" })
    }

}
export const createComment = async (req, res) => {
    try {

        const postId = req.params.body
        const { content } = req.body
        const post = await Post.findByIdAndUpdate(postId, {
            $push: {
                comments: {
                    user: req.user._id,
                    content
                }
            },
        }, { new: true }).populate("author", "name profilePicture")
        if (!post) {
            return res.status(404).json({ message: "Post not found" })
        }
        res.json(post)
    } catch (error) {

    }

}
export const likePost = async (req, res) => {
    try {
        const postId=req.params.id
        const post=await Post.findById(postId)
        const user=req.user._id
        if(post.likes.includes(user)){
            return res.status(400).json({message:"Already liked"})
        }
        post.likes.push(user)
        await post.save()
        res.json(post)
        
    } catch (error) {
        console.log(` error liking: ${error}`)
    }   
}