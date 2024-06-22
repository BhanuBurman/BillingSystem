// routes/user.route.js
import express from 'express';
import { getUser, addUser,addAsset } from '../controller/user.controller.js';

const router = express.Router();

router.post('/add', addUser);
router.get('/get/:firebaseId', getUser); // Using :firebaseId as a route parameter
router.put('/addAsset', addAsset); // Using :firebaseId as a route parameter

export default router;
