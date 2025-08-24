const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.log('❌ Connection error:', err));

async function checkDistribution() {
  try {
    const List = require('./models/List');
    
    console.log('📊 Checking list distributions...');
    
    // Get the most recent list
    const latestList = await List.findOne().sort({ createdAt: -1 })
      .populate('items.agentId', 'name email')
      .populate('uploadedBy', 'name');
    
    if (!latestList) {
      console.log('❌ No lists found');
      return;
    }
    
    console.log(`📋 List: ${latestList.originalName}`);
    console.log(`📦 Total items: ${latestList.totalItems}`);
    console.log(`👤 Uploaded by: ${latestList.uploadedBy.name}`);
    console.log(`🕒 Uploaded at: ${latestList.createdAt}`);
    
    // Count items per agent
    const agentCounts = {};
    latestList.items.forEach(item => {
      const agentName = item.agentId ? item.agentId.name : 'Unassigned';
      agentCounts[agentName] = (agentCounts[agentName] || 0) + 1;
    });
    
    console.log('\n📈 Distribution summary:');
    for (const [agentName, count] of Object.entries(agentCounts)) {
      console.log(`   ${agentName}: ${count} items`);
    }
    
  } catch (error) {
    console.log('❌ Error:', error.message);
  } finally {
    process.exit();
  }
}

checkDistribution();