// routes/route.js

import express from 'express';
import * as userController from '../Controllers/userController.js';
const router = express.Router();

router.get('/getUserList', userController.getUsers);
router.get('/getUserById/:id', userController.getUserById);
router.post('/addUser', userController.createUser);
router.put('/updateByUserId/:id', userController.updateUser);
router.delete('/deleteUserById/:id', userController.deleteUser);

export default router;
