const uuid = require('uuid').v4;
const { EXPENSE, INCOME } = require('./transactionsConstants');

function makeTransactionList(){
    const id1 = uuid();
    const id2 = uuid();
    const id3 = uuid();

    const transactionList = {};
    const transactions = {
        [id1]: {
            id: id1,
            category: EXPENSE.TRAVEL,
            amount: -800,

          },
          [id2]: {
            id: id2,
            category: INCOME.SALARY,
            amount: 4000,
          },
          [id3]: {
            id: id3,
            category: EXPENSE.GROCERY,
            amount: -180,
          },
    };

    transactionList.contains = function contains(id){
        return !!transactions[id];
    };

    transactionList.getTransactions = function getTransactions() {
        return transactions;
    };

    transactionList.addTransactions = function addTransactions(transaction){
        const id = uuid();
        transactions[id] = {
            id,
            category: transaction.category,
            amount: transaction.amount,
        };
        return id;
    };

    transactionList.getTransaction = function getTransaction(id){
        return transactions[id];
    };

    transactionList.updateTransaction = 
     function updateTransaction(id, transaction){
        transactions[id].category = 
         transaction.category || transactions[id].category;

        transactions[id].amount = 
         transaction.amount || transactions[id].amount;
    };

    transactionList.deleteTransaction = function deleteTransaction(id){
        delete transactions[id];
    };

    return transactionList;
}

module.exports = {
    makeTransactionList,
};