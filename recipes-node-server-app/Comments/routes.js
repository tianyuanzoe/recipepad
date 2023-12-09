// import comments from "./comments.json" assert { type: "json" };
import * as dao from "./dao.js";

let currentRecipe = null;
function CommentRoutes(app) {
    const findCommentByRecipeId = async (req, res) => {
        const { recipeId } = req.params;
        // const commentsForRecipe = comments.filter(comment => comment.recipeId == recipeId);
        const commentsForRecipe = await dao.findCommentByRecipeId(recipeId);
        res.json({ comments: commentsForRecipe }); 
    };

    const findCommentByCommentId = async (req, res) => {
        const { commentId } = req.params;
        // const commentSingle = comments.filter(comment => comment._id == commentId);
        const commentSingle = await dao.findCommentByCommentId(commentId);
        res.json({ comments: commentSingle }); 
     };
    const findCommentByUserId = async (req, res) => { 
        const { userId } = req.params;
        const commentForUser = await dao.findCommentByUserId(userId);
        res.json({ comments: commentForUser }); 
    };

    const createComment = async (req, res) => {
        const comment = await dao.createComment(req.body);
        res.json(comment);
     };





    
    // const findAllComment = async (req, res) => { };
    
    const deleteComment = async (req, res) => { 
        const status = await dao.deleteUser(req.params.userId);
        res.json(status);
    };


    const findSavedRecipe = async (req, res) => { 
        const { userId } = req.params;
        // console.log("backend"+userId);
        const userSavedRecipe = await dao.findSaveByUserId(userId);
        res.json({ user: userSavedRecipe}); 
    };

    // const updateSavedRecipe = async (req, res) => { 
    //     const { userId } = req.params;

    //     const { user } = req.body;
    //     const status_delete = dap.deleteByUserId(userId);
    //     const status_create = dao.updateSaveByUserId(user);
    //     const userSavedRecipe = await dao.findSaveByUserId(userId);
    //     res.json({ user: userSavedRecipe}); 
    // };

    const updateSavedRecipe = async (userId, updatedRecipeArray) => { 
        try {
            // 找到对应 userId 的用户记录
            // console.log("backend ")
            // const user = await findSaveByUserId({ userId });
            // const user = await findSaveByUserId(userId);
            // console.log(user)
            // try {
            //     const user = await dao.findSaveByUserId(userId);
            //     console.log(user);
            //   } catch (error) {
            //     console.error('Error fetching user:', error);
            //   }
            const user = await dao.findSaveByUserId(userId);
            console.log(user);
            if (user) {
                
                console.log("backend ")
                user.saveRecipe = updatedRecipeArray;
    
               
                console.log("backend " + user)
                await user.save();
    
                return { success: true, message: 'Save recipe array updated successfully' };
            } else {
                console.log("failed")
                return { success: false, message: 'User not found' };
            }
        } catch (error) {
            return { success: false, message: 'Failed to update save recipe array', error };
        }
    };


    
    app.post("/api/comments", createComment);
    // app.get("/api/comments", findAllComment);
    app.get("/api/comments/:recipeId", findCommentByRecipeId);
    app.get("/api/comments/:commentId", findCommentByCommentId);
    app.get("/api/comments/:userId", findCommentByUserId);
    
    app.delete("/api/comments/:commentId", deleteComment);
    app.get("/api/comments/saved/:userId", findSavedRecipe);
    // app.post("/api/comments/update/", updateSavedRecipe);
    app.post("/api/comments/update/:userId", async (req, res) => {
        const { userId } = req.params;
        const updatedRecipeArray = req.body;
        
        try {
            // console.log("backend")
            // console.log(userId)
            // console.log(updatedRecipeArray)
          const result = await updateSavedRecipe(userId, updatedRecipeArray);
          res.json(result);
        } catch (error) {
          res.status(500).json({ success: false, message: 'Failed to update save recipe array', error });
        }
      });




   
  
}
export default CommentRoutes;





