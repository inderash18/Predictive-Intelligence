const express = require('express');
const axios = require('axios');
const Prediction = require('../models/Prediction');
const { protect } = require('../middleware/auth');
const router = express.Router();

// @desc    Get all predictions for user
// @route   GET /api/predictions
router.get('/', protect, async (req, res) => {
  const predictions = await Prediction.find({ userId: req.user._id }).sort({ timestamp: -1 });
  res.json(predictions);
});

// @desc    Create prediction
// @route   POST /api/predictions/:type
router.post('/:type', protect, async (req, res) => {
  const { type } = req.params;
  const inputs = req.body;

  try {
    // Proxy request to ML Service
    const mlResponse = await axios.post(`${process.env.ML_SERVICE_URL}/predict/${type}`, inputs);
    const result = mlResponse.data;

    // Determine risk level based on result (simplified logic)
    let riskLevel = 'low';
    if (type === 'server' && result.failure_probability > 0.7) riskLevel = 'high';
    else if (type === 'server' && result.failure_probability > 0.4) riskLevel = 'medium';
    
    if (type === 'pc_health' && result.crash_risk > 0.8) riskLevel = 'critical';
    else if (type === 'pc_health' && result.crash_risk > 0.5) riskLevel = 'high';

    if (type === 'electricity' && result.predicted_demand > 500) riskLevel = 'medium';

    const prediction = await Prediction.create({
      userId: req.user._id,
      type,
      inputs,
      result,
      riskLevel,
    });

    res.status(201).json(prediction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'ML Service Error', details: error.message });
  }
});

module.exports = router;
