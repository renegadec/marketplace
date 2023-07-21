import React, { useState, useEffect } from 'react';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([
    { name: 'Credit Card', icon: 'credit-card' },
    { name: 'Ecocash', icon: 'eco-cash'},
    { name: 'PayPal', icon: 'paypal' },
    { name: 'Apple Pay', icon: 'apple-pay' },
    { name: 'Google Pay', icon: 'google-pay' },
  ]);

  useEffect(() => {
    // Fetch transactions from your API and set them to state
    // For now, let's use static data
    const staticTransactions = [
      {
        id: 1,
        date: '2023-07-18',
        amount: '$5100',
        status: 'completed',
        paymentMethod: 'Credit Card',
        shippingDetails: '7341, Rujeko B, Dendera Crescent, Masvingo',
        trackingNumber: '123tec',
        invoice: 'https://example.com/invoice.pdf',
        notes: "Great news! Your order has been successfully delivered. We hope you enjoy your purchase. If you have any questions or concerns, please don't hesitate to reach out to us.",
      },
      {
        id: 2,
        date: '2023-07-19',
        amount: '$2200',
        status: 'pending',
        paymentMethod: 'PayPal',
        shippingDetails: '456 Elm St, Los Angeles, CA',
        trackingNumber: '894bpc',
        invoice: 'https://example.com/invoice.pdf',
        notes: "Dear customer, thank you for your order. We are currently processing your request and will notify you once it is ready for shipment."
      },
      {
        id: 3,
        date: '2023-07-2',
        amount: '$200',
        status: 'pending',
        paymentMethod: 'Ecocash',
        shippingDetails: 'No 3, Downham Avenue , Harare',
        trackingNumber: '7341abc',
        invoice: 'https://example.com/invoice.pdf',
        notes: "We have a lot of orders be patient we are currently processing your request"
      },
      
      

    ];

    setTransactions(staticTransactions);
    setFilteredTransactions(staticTransactions);
  }, []);

  const handleFilterClick = () => {
    // Filter transactions based on date range
  };

  const handleDownloadInvoice = (invoiceUrl) => {
    // Handle download invoice
  };

  const handleSubmitFeedback = (e) => {
    // Handle submit feedback
  };

  return (
    <div>
     <h1 style={{ fontWeight: 'bold' }}>Transactions</h1>
      <div>
        {/* Filter and date range input fields */}
      </div>
      <div>
        {filteredTransactions.map((transaction) => (
          <div key={transaction.id} style={{ backgroundColor: 'white', padding: '10px', marginBottom: '10px' }}>
            <p>Date: {transaction.date}</p>
            <p>Amount: {transaction.amount}</p>
            <p>Status: {transaction.status}</p>
            <p>Payment Method: {transaction.paymentMethod}</p>
            <p>Shipping Details: {transaction.shippingDetails}</p>
            <p>Tracking Number: {transaction.trackingNumber}</p>
            <button onClick={() => handleDownloadInvoice(transaction.invoice)}className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Download Invoice</button>
            <div>
              {transaction.notes && <p>Notes: {transaction.notes}</p>}</div>
          </div>
        ))}
      </div>
      <div>
        <h3>Leave Feedback</h3>
        <textarea className="form-control"></textarea>
        <button type="submit"className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={handleSubmitFeedback}>Submit</button>
      </div>
    </div>
  );
};

export default Transactions;
