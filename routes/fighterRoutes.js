import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

//get all fighters
router.get(
  '/',
  (_, res, next) => {
    try {
      const fighters = fighterService.getAll()

      if (!fighters.length) {
        res.err = 'Fighters not found'
        res.errCode = 404
      } else {
        res.data = fighters
      }
    } catch (e) {
      res.err = e
      res.errCode = 500
    } finally {
      next()
    }
  },
  responseMiddleware,
)

//create fighter
router.post(
  '/',
  createFighterValid,
  (req, res, next) => {
    try {
      const fighterData = req.body

      if(!fighterData.health){
        fighterData.health = 100
      }

      const fighter = fighterService.create(fighterData)
      res.data = fighter
    } catch (e) {
      res.err = e
      res.errCode = 500
    } finally {
      next()
    }
  },
  responseMiddleware,
)

// find fighter by id
router.get(
  '/:id',
  (req, res, next) => {
    try {
      const { id } = req.params
      const fighter = fighterService.getById(id)

      if (!fighter) {
        res.err = 'Fighter not found'
        res.errCode = 404
      } else {
        res.data = fighter
      }
    } catch (e) {
      res.err = e
      res.errCode = 500
    } finally {
      next()
    }
  },
  responseMiddleware,
)

//update fighter
router.put(
  '/:id',
  updateFighterValid,
  (req, res, next) => {
    try {
      const { id } = req.params
      const fighterInfo = req.body
      const updatedFighter = fighterService.update(id, fighterInfo)
   
      if (!updatedFighter.id) {
        res.err = 'Fighter not found'
        res.errCode = 404
      } else {
        res.data = updatedFighter
      }
    } catch (e) {
      res.err = e
      res.errCode = 500
    } finally {
      next()
    }
  },
  responseMiddleware,
)

//delete fighter
router.delete(
  '/:id',
  (req, res, next) => {
    try {
      const { id } = req.params
      const deletedFighter = fighterService.delete(id)

      if (!deletedFighter.length) {
        res.err = 'Fighter not found'
        res.errCode = 404
      } else {
        res.data = deletedFighter
      }
    } catch (e) {
      res.err = e
      res.errCode = 500
    } finally {
      next()
    }
  },
  responseMiddleware,
)

export { router };
