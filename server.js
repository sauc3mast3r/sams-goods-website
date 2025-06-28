require('dotenv').config();
const express = require('express');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // ✅ safer
const cors = require('cors');
app.use(cors());
app.use(express.json());
const productPriceIds = {
  'MFJ Brass Knuckles Tee - $22.99': {
    'S': 'price_1ReGxCGxcJlKkC4eazAP1Xuf',
    'M': 'price_1RenaDGxcJlKkC4eZzPWiK74',
    'L': 'price_1RenaDGxcJlKkC4eKbctikv1',
    'XL': 'price_1RenaDGxcJlKkC4eLxhpKi03',
    'XXL': 'price_1RenaDGxcJlKkC4eHTmDUb02',
  },
  'ENONO Flip Hoodie - $39.99': {
    'S': 'price_1ReGsMGxcJlKkC4eak4anHKm',
    'M': 'price_1ReoivGxcJlKkC4ewZzF6pou',
    'L': 'price_1ReoivGxcJlKkC4eCoIy59Au',
    'XL': 'price_1ReoivGxcJlKkC4eyQiBRTla',
    'XXL': 'price_1ReoivGxcJlKkC4e9dn5mqPY',
  },
  'ENONO Classic Tee - $22.99': {
    'S': 'price_1ReGDUGxcJlKkC4efyAXY1Sq',
    'M': 'price_1ReqchGxcJlKkC4elJqrOZiB',
    'L': 'price_1ReqchGxcJlKkC4eSnHVGD6g',
    'XL': 'price_1ReqchGxcJlKkC4eV4claPxC',
    'XXL': 'price_1ReqchGxcJlKkC4eVzEwvpUL',
  },
  'Let\'s Get Drunk Tee - $22.99': {
    'S': 'price_1RepMfGxcJlKkC4eALD7fFiR',
    'M': 'price_1RepMfGxcJlKkC4eIdJcjlRO',
    'L': 'price_1RepMfGxcJlKkC4eH75121u5',
    'XL': 'price_1ReGIDGxcJlKkC4egLabGCdm',
    'XXL': 'price_1RepMfGxcJlKkC4eiD65VSCT',
  },
  'ENO NO Limited Edition Box Logo Tee - $24.99': {
    'S': 'price_1RepSNGxcJlKkC4eqYuWAGcm',
    'M': 'price_1RepSNGxcJlKkC4emx6RDExB',
    'L': 'price_1ReGNEGxcJlKkC4e8zKw88s9',
    'XL': 'price_1RepSNGxcJlKkC4eahz2d9mh',
    'XXL': 'price_1RepSNGxcJlKkC4ezCQLkjW6',
  },
  'Trump_Original_Gangster_Mugshot_Hoodie - $44.99': {
    'S': 'price_1RepYBGxcJlKkC4eQCRNBsvM',
    'M': 'price_1RepYBGxcJlKkC4enrl5PxJj',
    'L': 'price_1RepYBGxcJlKkC4eLb8fUxHZ',
    'XL': 'price_1ReGQEGxcJlKkC4exH7zRc2g',
    'XXL': 'price_1RepYBGxcJlKkC4e25DeRZOT',
  },
  'Trumpasaurus Rex Tee - $22.99': {
    'S': 'price_1ReGS6GxcJlKkC4eHOgtuzKT',
    'M': 'price_1RepdzGxcJlKkC4eMjRSk3Ys',
    'L': 'price_1RepdzGxcJlKkC4eS9ZpAdOw',
    'XL': 'price_1RepdzGxcJlKkC4eWAUEbY8y',
    'XXL': 'price_1RepdzGxcJlKkC4eguQehCMw',
  },
  'ENONO Pixel Hoodie - $44.99': {
    'S': 'price_1ReGTaGxcJlKkC4e6mJjbonp',
    'M': 'price_1RepjMGxcJlKkC4e5fkP5SGU',
    'L': 'price_1RepjMGxcJlKkC4emv3rlcd1',
    'XL': 'price_1RepjMGxcJlKkC4es8piuF1E',
    'XXL': 'price_1RepjMGxcJlKkC4eCluwwuZG',
  },
  'Not Here to Adult Today Tee - $22.99': {
    'S': 'price_1ReGm1GxcJlKkC4eNbZYwu2U',
    'M': 'price_1RepnSGxcJlKkC4e560FtD4G',
    'L': 'price_1RepnSGxcJlKkC4eCTb5vGD2',
    'XL': 'price_1RepnSGxcJlKkC4eCTb5vGD2',
    'XXL': 'price_1RepnSGxcJlKkC4eWGFMZ39r',
  },
  'ENONO Wave Hoodie - $39.99': {
    'S': 'price_1ReGnLGxcJlKkC4eZF7F5Iph',
    'M': 'price_1ReqOTGxcJlKkC4eHHNtsg4g',
    'L': 'price_1ReqOTGxcJlKkC4ewx0TQWYy',
    'XL': 'price_1ReqOTGxcJlKkC4ekPrefOYM',
    'XXL': 'price_1ReqOTGxcJlKkC4eqGi3jOcr',
  },
  'ENONO Wave Tee - $22.99': {
    'S': 'price_1ReGoAGxcJlKkC4eub8WJp4x',
    'M': 'price_1ReqT2GxcJlKkC4efPJKYgjK',
    'L': 'price_1ReqT2GxcJlKkC4eFNwHpa8T',
    'XL': 'price_1ReqT2GxcJlKkC4eHH2hG6O1',
    'XXL': 'price_1ReqT2GxcJlKkC4eg6pMSf5w',
  },
  'ENONO Classic_Hoodie - $39.99': {
    'S': 'price_1ReGpwGxcJlKkC4ejAE4T7Br',
    'M': 'price_1ReqXMGxcJlKkC4eF8OEQxMG',
    'L': 'price_1ReqXMGxcJlKkC4e6uV66yx6',
    'XL': 'price_1ReqXMGxcJlKkC4eyhiecJmc',
    'XXL': 'price_1ReqXMGxcJlKkC4e87UC9FF5',
  },
  'Commander of Confidence Tee - $24.99': {
    'S': 'price_1ReGr7GxcJlKkC4etYSmKpJM',
    'M': 'price_1RepCuGxcJlKkC4eoHtCt7dz',
    'L': 'price_1RepCuGxcJlKkC4e41qo1WCP',
    'XL': 'price_1RepCuGxcJlKkC4ear3aF4Lc',
    'XXL': 'price_1RepCuGxcJlKkC4ebVCdQH8I',
  },
};

app.post('/create-checkout-session', async (req, res) => {
  const { productName, size } = req.body;

  try {
    const priceId = productPriceIds[productName][size];

    if (!priceId) {
      return res.status(400).json({ error: 'Invalid product name or size' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:5500/success.html',
      cancel_url: 'http://localhost:5500/cancel.html',
      metadata: {
        productName: productName,
        size: size,
      },
    });
    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(4242, () => console.log('Server running on port 4242'));
