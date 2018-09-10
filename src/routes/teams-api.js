const express = require('express');
const api = new express.Router();
const Team = require('../models/team');

const updateTeam = async (id, teamBody) => {
    try {
        let team = await Team.findById(id);

        if (team == null) {
            throw new Error('Team not found');
        }

        team.code = teamBody.code || team.code;
        team.name = teamBody.name || team.name;
        team.ranking = teamBody.ranking || team.ranking;
        team.captain = teamBody.captain || team.captain;
        team.trainer = teamBody.trainer || team.trainer;
        team.confederation = teamBody.confederation || team.confederation;

        team = await team.save();

        return team;
    } catch (err) {
        throw err;
    }
};

api
    .route('/teams')
    .get((req, res, next) => {
        Team.find()
            .then(data => res.json(data))
            .catch(err => next(err));
    })
    .post((req, res, next) => {
        let team = new Team(req.body);

        team.save()
            .then(data => res.status(201).json(data))
            .catch(err => next(err));
    });
api
    .route('/teams/:id')
    .get((req, res, next) => {
        let id = req.params.id;

        Team.findById(id)
            .then(data => {
                if (data === null) {
                    throw new Error('Team not found');
                }
                return res.json(data);
            })
            .catch(err => next(err));
    })
    .put((req, res, next) => {
        updateTeam(req.params.id, req.body)
            .then(team => res.json(team))
            .catch(err => next(err));
    })
    .delete((req, res) => {
        let id = req.params.id;

        Team.remove({ _id: id })
            .then(result => res.json(result))
            .catch(err => next(err));
    });

module.exports = api;
