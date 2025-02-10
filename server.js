const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

// Create a data directory if it doesn't exist
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)){
    fs.mkdirSync(dataDir);
}

app.post('/api/save', (req, res) => {
    const data = req.body;
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `form_${timestamp}.json`;
    
    fs.writeFile(path.join(dataDir, fileName), JSON.stringify(data, null, 2), (err) => {
        if (err) {
            res.status(500).json({ error: 'Error saving data' });
            return;
        }
        res.json({ message: 'Data saved successfully', fileName });
    });
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
}); 