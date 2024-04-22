import Loading from "./Loading";
import TransactionItem from "./TransactionItem";

function Transactions({
    transactions,
    isTransactionPending,
    lastAddedTransactionId,
    onDeleteTransaction,
}) {
    const SHOW = {
        PENDING: 'pending',
        EMPTY: 'empty',
        TRANSACTIONS: 'transactions',
    };

    let show;
  if(isTransactionPending) {
    show = SHOW.PENDING;
  } else if (!Object.keys(transactions).length) {
    show = SHOW.EMPTY;
  } else {
    show = SHOW.TRANSACTIONS;
  }

  let totalExpense = 0;
  let totalIncome = 0;
  Object.values(transactions).forEach(transaction => {
    // Check if the amount is positive (income) or negative (expense)
    if (transaction.amount > 0) {
        totalIncome += transaction.amount; // Add to total income
    } else {
        totalExpense += transaction.amount; // Add absolute value to total expense
    }
  });

  let netTotal = totalExpense + totalIncome;

  return(
    <div className="transaction">
        { show === SHOW.PENDING && <Loading className="transaction__waiting">Loading Transactions...</Loading> }
      { show === SHOW.EMPTY && (
        <p>No transaction yet, add one!</p>
      )}
      { show === SHOW.TRANSACTIONS && (
        <div className="transaction__container">
          <span> Total Expense: {totalExpense} </span>
          <span> Total Income: {totalIncome} </span>
          <span> Net Total: {netTotal} </span>
          <ul className="transactions__list">
          { Object.values(transactions).map( transaction => (            
            <li className="transaction__item" key={transaction.id}>
              <TransactionItem
                transaction={transaction}
                isLastAdded={lastAddedTransactionId===transaction.id}
                onDeleteTransaction={onDeleteTransaction}
              />
            </li>
          ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Transactions;