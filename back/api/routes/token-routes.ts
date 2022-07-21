import { Router } from 'express';
import { TokenController } from '../controller/token-controller';
import { newResponse } from '../../model/general';

export const tokenRouter = Router();
const tokenController = new TokenController();
// /tokens

tokenRouter.get('/', (req, res) => {
    const includeUsers = (req.query.includeUsers ? !!req.query.includeUsers : false);
    tokenController.allTokens(includeUsers)
        .then((tokens) => {
            res.json(newResponse(true, tokens))
        })
        .catch((err) => {
            res.send(newResponse(false, err.message))
        });
});

tokenRouter.get('/:id', (req, res) => {
    const tokenId = req.params.id;
    tokenController.findTokenById(tokenId)
        .then(token => res.json(newResponse(true, token)))
        .catch(err => res.json(newResponse(false, err.message)));
})

tokenRouter.post('/', (req, res) => {
    console.log(req.body);
    tokenController.newToken(req.body)
        .then((Token) => {
            res.json(newResponse(true, Token));
        })
        .catch((err) => {
            res.json(newResponse(false, err.message));
        })
})

tokenRouter.put('/:id', (req, res) => {
    console.log(req.params['id'])
    console.log(req.body);
    const tokenId = req.params.id;
    tokenController.updateToken(tokenId, req.body)
        .then((Token) => {
            res.json(newResponse(true, Token));
        })
        .catch((err) => {
            res.json(newResponse(false, err.message));
        })
})

tokenRouter.delete('/:id', (req, res) => {
    const tokenId = req.params.id;
    tokenController.deleteToken(tokenId)
        .then(() => {
            res.json(newResponse(true, tokenId));
        })
        .catch((err) => {
            res.json(newResponse(false, err.message));
        })
})

tokenRouter.get('/:id/accounts', (req, res) => {
    const tokenId = req.params.id;
    tokenController.getTokenUser(tokenId)
        .then(users => res.json(newResponse(true, users)))
        .catch(err => res.json(newResponse(false, err.message)))
})

tokenRouter.post('/:id/accounts', (req, res) => {
    const tokenId = req.params.id;
    const userId = req.body.userId;
    tokenController.addAccountToToken(tokenId, userId)
        .then(message => res.json(newResponse(true, message)))
        .catch(err => res.json(newResponse(false, err.message)));
})

