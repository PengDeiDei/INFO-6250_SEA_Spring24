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

  return(
    <div className="content">
        { show === SHOW.PENDING && <Loading className="transaction__waiting">Loading Transactions...</Loading> }
      { show === SHOW.EMPTY && (
        <p>No transaction yet, add one!</p>
      )}
      { show === SHOW.TODOS && (
        <ul className="transactions">
          { Object.values(transactions).map( transaction => (
            <li className="transaction" key={transaction.id}>
              <TransactionItem
                transaction={transaction}
                isLastAdded={lastAddedTransactionId===transaction.id}
                onDeleteTransaction={onDeleteTransaction}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Transactions;