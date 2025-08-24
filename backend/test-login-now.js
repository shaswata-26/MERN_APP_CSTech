const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.log('❌ Connection error:', err));

async function testLogin() {
  try {
    const User = require('./models/User');
    const admin = await User.findOne({ email: 'admin@example.com' });
    
    console.log('🔐 Testing login after password reset...');
    
    // Test the password match
    const isMatch = await admin.matchPassword('admin123');
    console.log('Password "admin123" matches:', isMatch);
    
    if (isMatch) {
      console.log('✅ Password is working correctly!');
      console.log('You should now be able to login through the web interface.');
    } else {
      console.log('❌ Password is still not working.');
      console.log('The issue might be in your User model matchPassword method.');
    }
    
  } catch (error) {
    console.log('❌ Error:', error.message);
  } finally {
    process.exit();
  }
}

testLogin();