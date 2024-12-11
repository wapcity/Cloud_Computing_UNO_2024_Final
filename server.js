const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors');
const app = express();


app.use(cors());
AWS.config.update({ region: 'us-east-1' });


const dynamoDb = new AWS.DynamoDB.DocumentClient();


app.get('/getHouses', async (req, res) => {
  const params = {
    TableName: 'HousesForSale',
  };

  try {

    const data = await dynamoDb.scan(params).promise();


    console.log('Fetched items:', data.Items);


    res.json({ houses: data.Items.map(item => ({
      houseID: item.houseID,
      address: item.address,
      bathrooms: item.bathroom,
      bedrooms: item.Bedroom,
      imageUrl: item.ImageURL,
      price: item.Price,
      sqft: item.SquareFT,
    })) });
  } catch (error) {

    console.error('Error fetching data:', error);


    res.status(500).json({ error: 'Unable to fetch houses' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
