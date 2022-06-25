import { Router } from 'express';
import { UserController } from '../controller/user-controller';
import { newResponse } from '../../model/general.js';

export const userRouter = Router();
const userController = new UserController();
// /users

userRouter.get('/', (req, res) => {
    userController.allUsers()
        .then((users) => {
            res.json(newResponse(true, users))
        })
        .catch((err) => {
            res.send(newResponse(false, err.message))
        });
});

userRouter.get('/:id', (req, res) => {
    const userId = req.params.id;
    userController.findUserById(userId)
        .then(user => res.json(newResponse(true, user)))
        .catch(err => res.json(newResponse(false, err.message)));
})

userRouter.post('/', (req, res) => {
    console.log(req.body);
    userController.newUser(req.body)
        .then((user) => {
            res.json(newResponse(true, user));
        })
        .catch((err) => {
            res.json(newResponse(false, err.message));
        })
})

userRouter.put('/:id', (req, res) => {
    console.log(req.params['id'])
    console.log(req.body);
    const userId = req.params.id;
    userController.updateUser(userId, req.body)
        .then((user) => {
            res.json(newResponse(true, user));
        })
        .catch((err) => {
            res.json(newResponse(false, err.message));
        })
})

userRouter.delete('/:id', (req, res) => {
    const userId = req.params.id;
    userController.deleteUser(userId)
        .then(() => {
            res.json(newResponse(true, userId));
        })
        .catch((err) => {
            res.json(newResponse(false, err.message));
        })
})