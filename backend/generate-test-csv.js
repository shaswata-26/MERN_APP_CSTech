const fs = require('fs');

// Generate test-contacts.csv
const testContacts = `FirstName,Phone,Notes
John Doe,1234567890,Interested in product demo
Jane Smith,0987654321,Follow up next week
Robert Johnson,5551234567,Customer since 2020
Sarah Williams,4449876543,Preferred contact: email
Michael Brown,3334567890,Referred by friend
Emily Davis,2227654321,High priority client
David Miller,1112345678,Requested callback
Lisa Wilson,9998765432,Interested in premium plan
James Anderson,8883456789,Scheduled meeting on Friday
Jessica Thomas,7776543210,Technical support needed`;

// Generate large-contacts.csv
const largeContacts = `FirstName,Phone,Notes
Alex Johnson,1234567890,Potential investor
Maria Garcia,2345678901,New lead from website
David Smith,3456789012,Existing customer - renewal due
Sarah Brown,4567890123,Interested in partnership
James Wilson,5678901234,Technical inquiry
Emily Davis,6789012345,Requested pricing information
Michael Taylor,7890123456,Follow up after meeting
Jessica Martinez,8901234567,Referral from Maria Garcia
Christopher Anderson,9012345678,High value prospect
Amanda Thomas,1122334455,Subscription upgrade requested
Daniel Lopez,2233445566,Complaint resolution
Jennifer Lee,3344556677,Product feedback
Matthew Harris,4455667788,Requested documentation
Elizabeth Clark,5566778899,International customer
Kevin Lewis,6677889900,Bulk order inquiry`;

// Generate edge-cases.csv
const edgeCases = `FirstName,Phone,Notes
A,1,Minimal data
VeryLongFirstNameExample,123456789012345,Phone with extra digits
,,Missing data
John Doe,,Missing phone
,1234567890,Missing name
"FirstName,WithComma",1234567890,"Notes, with, commas"
O'Malley,1234567890,Name with apostrophe
Élise,1234567890,Name with special characters
测试,1234567890,Unicode characters
,,"Empty row"`;

// Write files
fs.writeFileSync('test-contacts.csv', testContacts, 'utf8');
fs.writeFileSync('large-contacts.csv', largeContacts, 'utf8');
fs.writeFileSync('edge-cases.csv', edgeCases, 'utf8');

console.log('✅ CSV files created successfully!');
console.log('1. test-contacts.csv (10 contacts)');
console.log('2. large-contacts.csv (15 contacts)');
console.log('3. edge-cases.csv (10 edge cases)');