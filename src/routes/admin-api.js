const express = require('express');
const api = express.Router();
const Match = require('../models/match');

const updateScore = async (matchId, teamId) => {
    try {
        let match = await Match.findById(matchId);

        if (match == null) {
            throw new Error('Match not found');
        }

        if (teamId === 'team_id') {
            match.score.team_1++;
        } else {
            match.score.team_2++;
        }

        match = await match.save();

        return match;
    } catch (err) {
        throw err;
    }
};

api
    .route('/admin/match/:id?')
    .post((req, res, next) => {
        const match = new Match(req.body);
        match.save()
            .then(data => res.json(data))
            .catch(err => next(err));
    })
    .put((req, res, next) => {
        const matchId = req.params.id;
        const teamId = req.body.teamId;

        updateScore(matchId, teamId)
            .then(match => res.json(match))
            .catch(err => next(err));
    });

module.exports = api;
