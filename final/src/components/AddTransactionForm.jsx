import { useState } from 'react';

function AddTransactionForm({ onAddTransaction }) {

  const [ category, setCategory ] = useState('');
  const [ amount, setAmount ] = useState(0);

  function onSubmit(e) {
    e.preventDefault(); // Don't forget, confusion follows if form submits
    setCategory('');
    setAmount(0);
    onAddTransaction({category, amount});
  }

  function onCategory(e) {
    setCategory(e.target.value);
  }

  function onAmount(e) {
    setAmount(e.target.value);
  }

  return (
    <form className="add__form" action="#/add" onSubmit={onSubmit}>
      <input className="add__category" value={category} onChange={onCategory}/>
      <input className="add__amount" value={amount} onChange={onAmount}/>
      <button type="submit" className="add__button">Add</button>
    </form>
  );
}

export default AddTransactionForm;
