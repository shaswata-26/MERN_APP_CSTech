const User = require('../models/User');

// Get all agents
const getAgents = async (req, res) => {
  try {
    const agents = await User.find({ role: 'agent' }).select('-password');
    res.json(agents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new agent
const createAgent = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    const agentExists = await User.findOne({ email });

    if (agentExists) {
      return res.status(400).json({ message: 'Agent already exists' });
    }

    const agent = await User.create({
      name,
      email,
      mobile,
      password,
      role: 'agent'
    });

    if (agent) {
      res.status(201).json({
        _id: agent._id,
        name: agent.name,
        email: agent.email,
        mobile: agent.mobile,
        role: agent.role
      });
    } else {
      res.status(400).json({ message: 'Invalid agent data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an agent
const deleteAgent = async (req, res) => {
  try {
    const agent = await User.findById(req.params.id);

    if (agent && agent.role === 'agent') {
      await User.deleteOne({ _id: agent._id });
      res.json({ message: 'Agent removed' });
    } else {
      res.status(404).json({ message: 'Agent not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAgents, createAgent, deleteAgent };