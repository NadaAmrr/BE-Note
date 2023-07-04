import * as userController from './controller/user.js'
import { Router } from "express";
const router = Router()
//*1-signup
router.post('/signup',  userController.signup);
//*2-login
router.post("/login", userController.login);
// router.post("/login1", userController.login1);
//*3- update user 
router.put("/:id", userController.update);
//*3- delete user 
router.delete("/:id", userController.deleteUser);
//*5- search for user where his name start with "a" and age less than 30 => using like for characters
router.get('/search',userController.search)
//*6- search for user where his age is between 20 and 30
router.get('/age/search',userController.ageSearch)
//*7 - get the 3 oldest users
router.get('/search/oldest/:limit',userController.searchOldest)
//*8- search for users by list of ids => using IN
router.get('/searchList',userController.searchByLists)
//*9- get all user 
router.get("/", userController.users);

export default router