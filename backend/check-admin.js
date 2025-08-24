const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.log('❌ Connection error:', err));

// Check admin user
async function checkAdmin() {
  try {
    const User = require('./models/User');
    const admin = await User.findOne({ email: 'admin@example.com' });
    
    if (!admin) {
      console.log('❌ No admin user found with email: admin@example.com');
      return;
    }
    
    console.log('✅ Admin user found:');
    console.log('   Name:', admin.name);
    console.log('   Email:', admin.email);
    console.log('   Role:', admin.role);
    
    // Test password
    const isMatch = await bcrypt.compare('admin123', admin.password);
    console.log('🔐 Password test "admin123":', isMatch ? '✅ CORRECT' : '❌ INCORRECT');
    
    if (!isMatch) {
      console.log('💡 Try these passwords:');
      console.log('   - admin123');
      console.log('   - password');
      console.log('   - admin');
      console.log('   - 123456');
    }
    
  } catch (error) {
    console.log('❌ Error:', error.message);
  } finally {
    process.exit();
  }
}

checkAdmin();