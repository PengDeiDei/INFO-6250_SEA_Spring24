function TransactionItem({
    transaction,
    isLastAdded,
    onDeleteTransaction,
}) {
    const isAddedClass = isLastAdded ? "transaction__text--added" : "";
    return (
        <>
            <label className="transaction__label">
                <span
                    data-id={transaction.id}
                    className={`transaction__text ${isAddedClass}`}
                >
                    Category: {transaction.category}
                </span>
                <span
                    data-id={transaction.id}
                    className={`transaction__text ${isAddedClass}`}
                >
                    Amount: {transaction.amount}
                </span>
            </label>
            <button 
                data-id={transaction.id} 
                className="transaction__delete"
                onClick={ (e) => {
                    const id = e.target.dataset.id;
                    onDeleteTransaction(id);
                }}
            >
                &#10060;
            </button>
        </>
    );
}

export default TransactionItem;