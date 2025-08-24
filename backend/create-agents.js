const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.log('❌ Connection error:', err));

async function createAgents() {
  try {
    const User = require('./models/User');
    
    console.log('👥 Creating agents...');
    
    // Delete any existing agents first
    await User.deleteMany({ role: 'agent' });
    console.log('✅ Removed existing agents');
    
    // Create multiple agents
    const agents = [
      {
        name: 'Agent 1',
        email: 'agent1@example.com',
        mobile: '+1111111111',
        password: 'agent123',
        role: 'agent'
      },
      {
        name: 'Agent 2',
        email: 'agent2@example.com',
        mobile: '+2222222222',
        password: 'agent123',
        role: 'agent'
      },
      {
        name: 'Agent 3',
        email: 'agent3@example.com',
        mobile: '+3333333333',
        password: 'agent123',
        role: 'agent'
      },
      {
        name: 'Agent 4',
        email: 'agent4@example.com',
        mobile: '+4444444444',
        password: 'agent123',
        role: 'agent'
      },
      {
        name: 'Agent 5',
        email: 'agent5@example.com',
        mobile: '+5555555555',
        password: 'agent123',
        role: 'agent'
      }
    ];
    
    // Create agents (password will be auto-hashed by your User model)
    for (const agentData of agents) {
      await User.create(agentData);
      console.log(`✅ Created ${agentData.name}`);
    }
    
    console.log('\n🎉 All agents created successfully!');
    console.log('You can now upload CSV files for distribution.');
    
  } catch (error) {
    console.log('❌ Error creating agents:', error.message);
  } finally {
    process.exit();
  }
}

createAgents();