const csv = require('csv-parser');
const XLSX = require('xlsx');
const fs = require('fs');
const List = require('../models/List');
const User = require('../models/User');

// Upload and process list
const uploadList = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    const filePath = req.file.path;
    const fileExtension = req.file.originalname.split('.').pop().toLowerCase();
    let items = [];

    if (fileExtension === 'csv') {
      // Process CSV file
      items = await processCSV(filePath);
    } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
      // Process Excel file
      items = await processExcel(filePath);
    } else {
      return res.status(400).json({ message: 'Unsupported file format' });
    }

    // Validate items
    if (items.length === 0) {
      return res.status(400).json({ message: 'No valid data found in the file' });
    }

    // Get all agents
    const agents = await User.find({ role: 'agent' });
    
    if (agents.length === 0) {
      return res.status(400).json({ message: 'No agents available to distribute the list' });
    }

    // Distribute items among agents
    const distributedItems = distributeItems(items, agents);

    // Create list record
    const list = await List.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      items: distributedItems,
      totalItems: items.length,
      distributed: true,
      uploadedBy: req.user._id
    });

    res.status(201).json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Process CSV file
const processCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        if (data.FirstName && data.Phone) {
          results.push({
            firstName: data.FirstName,
            phone: data.Phone,
            notes: data.Notes || ''
          });
        }
      })
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

// Process Excel file
const processExcel = (filePath) => {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet);
  
  return data.map(row => ({
    firstName: row.FirstName,
    phone: row.Phone.toString(),
    notes: row.Notes || ''
  })).filter(item => item.firstName && item.phone);
};

// Distribute items among agents
const distributeItems = (items, agents) => {
  const distributedItems = [];
  const itemsPerAgent = Math.floor(items.length / agents.length);
  let remainder = items.length % agents.length;
  let itemIndex = 0;

  agents.forEach(agent => {
    let agentItemCount = itemsPerAgent;
    
    if (remainder > 0) {
      agentItemCount++;
      remainder--;
    }

    for (let i = 0; i < agentItemCount; i++) {
      if (itemIndex < items.length) {
        distributedItems.push({
          ...items[itemIndex],
          agentId: agent._id
        });
        itemIndex++;
      }
    }
  });

  return distributedItems;
};

// Get all lists
const getLists = async (req, res) => {
  try {
    const lists = await List.find().populate('uploadedBy', 'name').sort({ createdAt: -1 });
    res.json(lists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get list by ID
const getListById = async (req, res) => {
  try {
    const list = await List.findById(req.params.id)
      .populate('uploadedBy', 'name')
      .populate('items.agentId', 'name email');
    
    if (list) {
      res.json(list);
    } else {
      res.status(404).json({ message: 'List not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadList, getLists, getListById };