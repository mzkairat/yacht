require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/IMAGES', express.static(path.join(__dirname, 'IMAGES')));
app.use('/pickup', express.static(path.join(__dirname, 'pickup')));

const bookings = [];

app.post('/api/bookings', async (req, res) => {
  try {
    const { name, phone, email, pickupAddress, date, time, hours, totalPrice, paymentMethod } = req.body;

    if (!name || !phone || !email || !pickupAddress || !date || !time || !hours || !paymentMethod) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const booking = {
      id: Date.now().toString(),
      name,
      phone,
      email,
      pickupAddress,
      date,
      time,
      hours,
      totalPrice,
      paymentMethod,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    bookings.push(booking);
    console.log('New booking:', booking);

    res.json({ success: true, bookingId: booking.id });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ error: 'Failed to process booking' });
  }
});

app.get('/api/bookings/:id', (req, res) => {
  const booking = bookings.find(b => b.id === req.params.id);
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }
  res.json(booking);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Prestigia Yacht server running on http://localhost:${PORT}`);
});
