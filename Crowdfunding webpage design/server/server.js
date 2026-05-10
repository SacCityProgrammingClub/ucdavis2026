require('dotenv').config();

const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(cors());
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error(err);

    res.status(500).send({
      error: 'Payment intent creation failed',
    });
  }
});

app.listen(3001, () => {
  console.log('Stripe server running on port 3001');
});