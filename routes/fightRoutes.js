import { Router } from "express";
import { fightService } from "../services/fightService.js";
import {
  createFightValid,
  updateFightValid,
} from "../middlewares/fight.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

//get all fighters
router.get(
  '/',
  (_, res, next) => {
    try {
      const fights = fightService.getAll()

      if (!fights.length) {
        res.err = 'Fights not found'
        res.errCode = 404
      } else {
        res.data = fights
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

//create fight
router.post(
  '/',
  createFightValid,
  (req, res, next) => {
    try {
      const fightData = req.body
      const fight = fightService.create(fightData)
      res.data = fight
    } catch (e) {
      res.err = e
      res.errCode = 500
    } finally {
      next()
    }
  },
  responseMiddleware,
)

// find fight by id
router.get(
  '/:id',
  (req, res, next) => {
    try {
      const { id } = req.params
      const fight = fightService.getById(id)

      if (!fight) {
        res.err = 'Fight not found'
        res.errCode = 404
      } else {
        res.data = fight
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

//update fight
router.put(
  '/:id',
  updateFightValid,
  (req, res, next) => {
    try {
      const { id } = req.params
      const fightInfo = req.body
      const updatedFight = fightService.update(id, fightInfo)
   
      if (!updatedFight.id) {
        res.err = 'Fight not found'
        res.errCode = 404
      } else {
        res.data = updatedFight
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

//delete fight
router.delete(
  '/:id',
  (req, res, next) => {
    try {
      const { id } = req.params
      const deletedFight = fightService.delete(id)

      if (!deletedFight.length) {
        res.err = 'Fight not found'
        res.errCode = 404
      } else {
        res.data = deletedFight
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
