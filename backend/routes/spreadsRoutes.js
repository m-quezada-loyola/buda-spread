const express = require("express");
const router = express.Router();
const spreadsController = require("../controllers/spreadController");
const catchAsync = require("../utils/CatchAsync");
const { validateSpreadAlert } = require("../middleware/validations");


router.get("/", (req, res) => {
    res.send("Buda Spread API");
})

/**
 * @openapi
 * /spreads:
 *  get:
 *     tags:
 *       - Controlador de spreads
 *     summary: Retorna todos los spreads del mercado.
 *     responses:
 *      200:
 *        description: Retorna todos los spreads.
 */
router.get("/spreads", catchAsync(spreadsController.getAllSpreads));

/**
 * @openapi
 * /spreads/{market_id}:
 *  get:
 *     tags:
 *       - Controlador de spreads
 *     summary: Retorna el spread de un mercado.
 *     parameters:
 *       - name: market_id
 *         in: path
 *         description: ID del mercado del spread.
 *         required: true
 *         schema:
 *           type: string
 *           example: eth-clp
 *     responses:
 *      200:
 *        description: Retorna el spread.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                market:
 *                  type: object
 *                  properties:
 *                    market_id:
 *                      type: string
 *                      description: ID del marcado del spread.
 *                    spread:
 *                      type: number
 *                      description: Spread del mercado.
 *            example:
 *              market:
 *                market_id: btc-clp
 *                spread: 300000
 *      400:
 *        description: Mercado no válido.
 */
router.get("/spreads/:marketId", catchAsync(spreadsController.getMarketSpread));

/**
 * @openapi
 * '/spreads/{market_id}/alert':
 *  post:
 *     tags:
 *     - Controlador de spreads
 *     summary: Crea una alerta de spread para un mercado.
 *     parameters:
 *       - name: market_id
 *         in: path
 *         description: ID del mercado del spread.
 *         required: true
 *         schema:
 *           type: string
 *           example: eth-clp      
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            required:
 *              - alert_value
 *            properties:
 *              alert_value:
 *                type: number
 *                description: Valor de la alerta creada.
 *           example:
 *             alert_value: 5000.45
 *     responses:
 *      200:
 *        description: Alerta creada.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                market_id:
 *                  type: string
 *                  description: ID del mercado de la alerta especificada
 *                alert_value:
 *                  type: number
 *                  description: Valor de la alerta especificada.
 *            example:
 *              market_id: eth-clp
 *              alert_value: 15000.50
 *      400:
 *        description: Mercado no válido o alerta ya existe.
 */
router.post("/spreads/:marketId/alert", validateSpreadAlert, catchAsync(spreadsController.setSpreadAlert));

/**
 * @openapi
 * /spreads/{market_id}/alert:
 *  get:
 *     tags:
 *       - Controlador de spreads
 *     summary: Retorna el estado del spread de un mercado según su valor de alerta.
 *     parameters:
 *       - name: market_id
 *         in: path
 *         description: ID del mercado del spread.
 *         required: true
 *         schema:
 *           type: string
 *           example: eth-clp
 *     responses:
 *      200:
 *        description: Retorna el estado del spread.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                market:
 *                  type: object
 *                  properties:
 *                    market_id:
 *                      type: string
 *                      description: ID del marcado del spread.
 *                    status:
 *                      type: string
 *                      description: Estado actual del spread segun su valor de alerta
 *                    alert_value:
 *                      type: number
 *                      description: Valor especificado para la alerta del spread
 *                    spread:
 *                      type: number
 *                      description: Spread del mercado.
 *            example:
 *              market:
 *                market_id: btc-clp
 *                status: Higher
 *                alert_value: 500000
 *                spread: 300000
 *      400:
 *        description: Mercado no válido o alerta no especificada.
 */
router.get("/spreads/:marketId/alert", catchAsync(spreadsController.getMarketSpreadStatus));

router.put("/spreads/:marketId/alert", catchAsync(spreadsController.updateAlertValue))

module.exports = router;