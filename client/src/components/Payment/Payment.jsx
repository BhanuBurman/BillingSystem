// src/components/Payment/Payment.jsx

import React, { useState, useEffect } from 'react';
import './Payment.scss';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import axios from 'axios';
import { auth, onAuthStateChanged } from '../../firebase';

const Payment = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [firebaseId, setFirebaseId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setFirebaseId(user.uid);
      } else {
        // Handle the case where the user is not authenticated
        console.log('User is not authenticated');
      }
    });

    return () => unsubscribe();
  }, []);

  const plans = [
    {
      name: 'Basic',
      price: '$10',
      storage: 10,
      benefits: [
        'Basic support',
        '10GB storage',
        'Access to basic features',
      ],
    },
    {
      name: 'Advanced',
      price: '$20',
      storage: 50,
      benefits: [
        'Priority support',
        '50GB storage',
        'Access to all features',
      ],
    },
    {
      name: 'Premium',
      price: '$30',
      storage: 100,
      benefits: [
        '24/7 support',
        '100GB storage',
        'Access to all features and premium content',
      ],
    },
  ];

  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
  };

  const handleCloseModal = () => {
    setSelectedPlan(null);
  };

  const handleSubmit = async (additionalAssets) => {
    if (!firebaseId) {
      console.error('User is not authenticated');
      return;
    }

    try {
      const response = await axios.post('/api/update-assets', {
        userId: firebaseId, // Use the actual firebaseId
        additionalAssets
      });

      console.log('Assets updated successfully', response.data);
    } catch (error) {
      console.error('Error updating assets', error);
    }
  };

  return (
    <div className="payment">
      <h1>Choose Your Plan</h1>
      <div className="plan-cards">
        {plans.map((plan, index) => (
          <div className="plan-card" key={index} id={`plan-card-${index}`} onClick={() => handlePlanClick(plan)}>
            <h2>{plan.name}</h2>
            <p className="price">{plan.price}</p>
            <p className="storage">{plan.storage}GB</p>
            <ul className="benefits">
              {plan.benefits.map((benefit, i) => (
                <li key={i}>{benefit}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {selectedPlan && (
        <ConfirmationModal
          plan={selectedPlan}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default Payment;
