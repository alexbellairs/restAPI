const { Router } = require("express"); //import Router method only from express
const {
  signUp,
  searchUser,
  deleteUser,
  login,
  editUser,
  listUser,
} = require("./controllers"); //import only signup from controllers file
const { hashPass, tokenCheck, unhashPass } = require("../middleware");
const userRouter = Router(); //create a router that can have endpoints added to it

userRouter.post("/user", hashPass, signUp); //defining a post request on /user path, that calls the signup controller
userRouter.post("/login", unhashPass, login); //defining a post request on /login path, that calls the login controller
userRouter.get("/user", searchUser);
userRouter.get("/user/:username", listUser);
userRouter.get("/token", tokenCheck, login);
userRouter.delete("/user", tokenCheck, deleteUser);
userRouter.patch("/user", hashPass, editUser);

module.exports = userRouter;
