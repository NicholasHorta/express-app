import express from 'express';
import sessions from '../data/sessions.json'


const sessionRouter = express.Router();


sessionRouter.route('/')
    .get((req, res) => {
        res.render('sessions', { sessions })
    })
    
sessionRouter.route('/:id')
    .get((req, res) => {
        const id = req.params.id
        res.render('session', {callMeAnything: sessions[id]})
    })


export default sessionRouter