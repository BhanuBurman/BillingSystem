// src/components/ConfirmationModal/ConfirmationModal.jsx

import React, { useState } from 'react';
import './ConfirmationModal.scss';

const ConfirmationModal = ({ plan, onClose, onSubmit }) => {
  const [cardNumber, setCardNumber] = useState('');

  const handleSubmit = () => {
    if (cardNumber.trim() !== '') {
      onSubmit(plan.storage);
      onClose();
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Confirm Your Purchase</h2>
        <p>You are about to purchase the {plan.name} plan with {plan.storage} of storage.</p>
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </div>
        <div className="modal-buttons">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
