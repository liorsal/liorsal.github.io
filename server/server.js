const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();

// Enable CORS
app.use(cors());
app.use(express.json());

// Create a data directory in server/data if it doesn't exist
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)){
    fs.mkdirSync(dataDir);
}

app.post('/api/save', (req, res) => {
    console.log('Received data:', req.body); // Log incoming data
    const data = req.body;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `form_${timestamp}.json`;
    const filePath = path.join(dataDir, fileName);
    
    // Ensure data directory exists
    if (!fs.existsSync(dataDir)){
        fs.mkdirSync(dataDir, { recursive: true });
    }
    
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Error saving file:', err);
            res.status(500).json({ error: 'Error saving data' });
            return;
        }
        console.log(`Data saved to ${filePath}`);
        res.json({ message: 'Data saved successfully', fileName });
    });
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
    console.log('Data will be saved to:', dataDir);
}); 