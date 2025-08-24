const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.log('❌ Connection error:', err));

async function resetAdminPassword() {
  try {
    const User = require('./models/User');
    
    console.log('🔄 Resetting admin password to "admin123"...');
    
    // Hash the correct password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    
    // Update the admin user with the correct password
    const result = await User.updateOne(
      { email: 'admin@example.com' },
      { $set: { password: hashedPassword } }
    );
    
    console.log('✅ Password reset successfully!');
    console.log('Modified count:', result.modifiedCount);
    
    // Verify the new password works
    const admin = await User.findOne({ email: 'admin@example.com' });
    const isMatch = await bcrypt.compare('admin123', admin.password);
    console.log('🔐 Password verification:', isMatch ? '✅ SUCCESS' : '❌ FAILED');
    
    if (isMatch) {
      console.log('\n🎉 You can now login with:');
      console.log('   Email: admin@example.com');
      console.log('   Password: admin123');
    }
    
  } catch (error) {
    console.log('❌ Error:', error.message);
  } finally {
    process.exit();
  }
}

resetAdminPassword();