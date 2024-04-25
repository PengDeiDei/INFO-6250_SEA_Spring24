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
    const inputValue = e.target.value;
    if(isNaN(parseFloat(inputValue))){
      setAmount(0);
    } else if( category === 'salary' || category === 'transfer'){
      setAmount(parseFloat(inputValue));
    } else {
      const floatValue = -1 * parseFloat(inputValue);
      setAmount(floatValue > 0 ? -1*floatValue : floatValue);
    }
  }

  return (
    <form className="add__form" action="#/add" onSubmit={onSubmit}>
      <label className='add__category'>
        <span> Choose category: </span>
        <select className='add_select' onChange={onCategory}>
          <option value="">--Please choose an option--</option>
          <option value="gas"> Gas </option>
          <option value="travel"> Travel </option>
          <option value="grocery"> Grocery </option>
          <option value="home"> Home </option>
          <option value="shopping"> Shopping </option>
          <option value="dining"> Dining </option>
          <option value="salary"> Salary </option>
          <option value="transfer"> Transfer </option>
        </select>
      </label>
      <label className='add__amount'>
        <span> Amount: </span>
        <input className="add__input" value={amount} onChange={onAmount}/>
      </label>
      <button type="submit" className="add__button">Add</button>
    </form>
  );
}

export default AddTransactionForm;
