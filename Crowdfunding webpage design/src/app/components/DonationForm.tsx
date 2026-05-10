import { useState } from 'react';
import { X, CreditCard, Lock } from 'lucide-react';
import type { Event } from './EventCard';

import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

interface DonationFormProps {
  event: Event;
  onClose: () => void;
  onDonationComplete: (eventId: string, amount: number) => void;
}

export function DonationForm({ event, onClose, onDonationComplete }: DonationFormProps) {
  const [donationType, setDonationType] = useState<'one-time' | 'recurring'>('one-time');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    zipCode: '',
    comments: '',
  });

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!stripe || !elements) {
    return;
  }

  const amount =
    selectedAmount === null
      ? parseFloat(customAmount)
      : selectedAmount;

  const response = await fetch(
    'http://localhost:3001/create-payment-intent',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100),
      }),
    }
  );

  const data = await response.json();

  const cardElement = elements.getElement(CardElement);

  if (!cardElement) {
    return;
  }

  const result = await stripe.confirmCardPayment(
    data.clientSecret,
    {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: formData.fullName,
          email: formData.email,
          address: {
            postal_code: formData.zipCode,
          },
        },
      },
    }
  );

  if (result.error) {
    alert(result.error.message);
  } else {
    alert('Donation successful!');

    onDonationComplete(event.id, amount);
    onClose();
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const presetAmounts = [50, 100, 250, 500];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#F4C145] px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-[#333333]">Make a Donation</h2>
          <button
            onClick={onClose}
            className="text-gray-700 hover:text-gray-900"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
            <h3 className="font-semibold text-[#2E5490] mb-1">{event.title}</h3>
            <p className="text-sm text-gray-600">Organized by {event.organizer}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-3">Gift Type</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setDonationType('one-time')}
                  className={`flex-1 py-3 px-6 rounded-md border-2 transition-colors ${
                    donationType === 'one-time'
                      ? 'bg-[#0077A8] text-white border-[#0077A8]'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-[#0077A8]'
                  }`}
                >
                  One-time donation
                </button>
                <button
                  type="button"
                  onClick={() => setDonationType('recurring')}
                  className={`flex-1 py-3 px-6 rounded-md border-2 transition-colors ${
                    donationType === 'recurring'
                      ? 'bg-[#0077A8] text-white border-[#0077A8]'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-[#0077A8]'
                  }`}
                >
                  Recurring donation
                </button>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-3">Gift Amount</label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-3">
                {presetAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount('');
                    }}
                    className={`py-4 px-6 rounded-md border-2 transition-colors ${
                      selectedAmount === amount
                        ? 'bg-[#0077A8] text-white border-[#0077A8]'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-[#0077A8]'
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedAmount(null);
                  }}
                  className={`py-4 px-6 rounded-md border-2 transition-colors ${
                    selectedAmount === null
                      ? 'bg-[#0077A8] text-white border-[#0077A8]'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-[#0077A8]'
                  }`}
                >
                  Other amount
                </button>
              </div>

              {selectedAmount === null && (
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  min="1"
                  step="0.01"
                  required
                  placeholder="Enter custom amount"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E5490]"
                />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E5490]"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E5490]"
                />
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-[#2E5490]" />
                <h3 className="font-semibold text-gray-700">Payment Information</h3>
                <Lock className="w-4 h-4 text-gray-500 ml-auto" />
                <span className="text-sm text-gray-500">Secure Payment via Stripe</span>
              </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">
                  Card Information *
                </label>

                <div className="w-full px-4 py-4 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-[#2E5490]">
                  <CardElement
                    options={{
                      style: {
                        base: {
                          fontSize: '16px',
                          color: '#333333',
                          '::placeholder': {
                            color: '#9CA3AF',
                          },
                        },
                        invalid: {
                          color: '#EF4444',
                        },
                      },
                      hidePostalCode: true,
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  ZIP Code *
                </label>

                <input
                  type="text"
                  name="zipCode"
                  required
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="12345"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E5490]"
                />
              </div>
            </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Comments (optional)</label>
              <textarea
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2E5490]"
                placeholder="Leave a message of support..."
              />
            </div>

            <div className="bg-gray-50 rounded-md p-4 text-sm text-gray-600">
              <p className="mb-2">
                <Lock className="w-4 h-4 inline mr-1" />
                Your payment information is encrypted and secure. This donation will be processed through Stripe.
              </p>
              <p className="text-xs text-gray-500">
                Demo Mode: STRIPE_SECRET_KEY would be configured in environment variables.
                Google Workspace Calendar integration would send donation receipts and event updates.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-[#2D8B3E] hover:bg-[#236a2f] text-white py-4 rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <Lock className="w-5 h-5" />
              Give Securely - ${selectedAmount || customAmount || 0}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
