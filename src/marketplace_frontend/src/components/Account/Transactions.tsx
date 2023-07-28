import React, { useState, useEffect } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

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
    const staticTransactions = [];

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
      <h1 style={{fontWeight: 'bold'}}>Transactions</h1>
      <div>
        {/* Filter and date range input fields */}
      </div>
      <div>
        {filteredTransactions.map((transaction) => (
          <div key={transaction.id} style={{ backgroundColor: 'white', padding: '10px', marginBottom: '10px'}}>
            <p>Date: {transaction.date}</p>
            <p>Amount: {transaction.amount}</p>
            <p>Status: {transaction.status}</p>
            <p>Payment Method: {transaction.paymentMethod}</p>
            <p>Shipping Details: {transaction.shippingDetails}</p>
            <p>Tracking Number: {transaction.trackingNumber}</p>
            <div>
              {transaction.notes && <p>Notes: {transaction.notes}</p>}
            </div>
          </div>
        ))}
      </div>
      <div className="collapse bg-base-200">
  <input type="radio" name="my-accordion-1" checked={true} /> 
  <div className="collapse-title text-l font-bold">
    Click to open your transaction
  </div>
  <div className="collapse-content font-semibold"> 
    <p>Date:10/05/2023</p>
    <p>Amount:$1500</p>
    <p>Status:Completed</p>
    <p>Payment Method:Paypal</p>
    <p>Shipping Details: 7341,Rujeko B,Masvingo</p>
    <p>Tracking Number:abc788</p>
    <p>Notes:Your order has been delivered successfully,Thank you for your patience.</p>
    <button onClick={() => handleDownloadInvoice('invoiceUrl')} className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Download Invoice</button>
  </div>
</div>
<div className="collapse bg-base-200">
  <input type="radio" name="my-accordion-1" /> 
  <div className="collapse-title text-l font-bold">
    Click to open your transaction
  </div>
  <div className="collapse-content font-semibold"> 
    <p>Date:4/08/2022</p>
    <p>Amount:$2800</p>
    <p>Status:Pending</p>
    <p>Payment Method:GooglePay</p>
    <p>Shipping Details: No 3,Downham Avenue,Harare</p>
    <p>Tracking Number:xya127</p>
    <p>Notes:We have a lot of orders,please your order is under processing.</p>
    <button onClick={() => handleDownloadInvoice('invoiceUrl')} className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Download Invoice</button> 
  </div>
</div>
<div className="collapse bg-base-200">
  <input type="radio" name="my-accordion-1" /> 
  <div className="collapse-title text-l font-bold">
    Click to open your transaction
  </div>
  <div className="collapse-content font-semibold"> 
    <p>Date:8/01/2021</p>
    <p>Amount:$4800</p>
    <p>Status:Completed</p>
    <p>Payment Method:Paypal</p>
    <p>Shipping Details: No 8,Drayton Avenue,Harare</p>
    <p>Tracking Number:xya127</p>
    <p>Notes:Congratulations,your order is successfully deliverd.</p>
    <button onClick={() => handleDownloadInvoice('invoiceUrl')} className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Download Invoice</button> 
  </div>
</div>
    </div> 

  );
};
export default Transactions;
