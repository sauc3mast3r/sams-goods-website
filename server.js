const express = require('express');
const app = express();
const stripe = require('stripe')('***REMOVED***'); // replace with your Stripe secret key
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  const { size } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: 'YOUR_PRICE_ID', // replace with your Stripe price ID
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:5500/success.html',
      cancel_url: 'http://localhost:5500/cancel.html',
      metadata: {
        size: size,
      },
    });
    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(4242, () => console.log('Server running on port 4242'));
