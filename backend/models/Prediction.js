const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { 
    type: String, 
    required: true, 
    enum: ['electricity', 'server', 'pc_health'] 
  },
  inputs: { type: Object, required: true },
  result: { type: Object, required: true },
  riskLevel: { 
    type: String, 
    enum: ['low', 'medium', 'high', 'critical'], 
    default: 'low' 
  },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Prediction', predictionSchema);
