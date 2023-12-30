import { Progress } from "antd";
import React from "react";

const Analytics = ({ allTransection }) => {
  //category
  const category = [
    "salary",
    "tip",
    "project",
    "food",
    "movie",
    "bills",
    "medical",
    "fee",
    "tax",
  ];

  //------------Total Transection---------------

  const totalTransaction = allTransection.length;
  const totalIncomeTransaction = allTransection.filter(
    (transaction) => transaction.type === "income"
  );
  const totalExpenseTransaction = allTransection.filter(
    (transaction) => transaction.type === "expense"
  );
  const totalIncomePercent =
    (totalIncomeTransaction.length / totalTransaction) * 100;
  const totalExpensePercent =
    (totalExpenseTransaction.length / totalTransaction) * 100;

  //--------------Total turn over---------------
  const totalTurnover = allTransection.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = allTransection
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpenseTurnover = allTransection
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalIncomeTurnoverPercent =
    (totalIncomeTurnover / totalTurnover) * 100;

  const totalExpenseTurnoverPercent =
    (totalExpenseTurnover / totalTurnover) * 100;

  return (
    <>
      <div className="row m-3">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              Total Transactions: {totalTransaction}
            </div>
            <div className="card-body">
              <h5>Income : {totalIncomeTransaction.length}</h5>
              <h5>Expense: {totalExpenseTransaction.length}</h5>

              <Progress
                type="line"
                strokeColor={"green"}
                className="mx-2"
                percent={totalIncomePercent.toFixed(0)}
              />
              <Progress
                type="line"
                strokeColor={"red"}
                className="mx-2"
                percent={totalExpensePercent.toFixed(0)}
              />
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">Total TurnOver : {totalTurnover}</div>
            <div className="card-body">
              <h5 className="text-success">Income : {totalIncomeTurnover}</h5>
              <h5 className="text-danger">Expense: {totalExpenseTurnover}</h5>

              <Progress
                type="line"
                strokeColor={"green"}
                className="mx-2"
                percent={totalIncomeTurnoverPercent.toFixed(0)}
              />
              <Progress
                type="line"
                strokeColor={"red"}
                className="mx-2"
                percent={totalExpenseTurnoverPercent.toFixed(0)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row m-3">
        <div className="col-md-4">
          <h4>CategoryWise Income</h4>
          {category.map((category) => {
            const amount = allTransection
              .filter(
                (transaction) =>
                  transaction.type === "income" &&
                  transaction.category === category
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);
            return (
              amount > 0 && 
             ( <div className="card">
                <div className="card-body">
                  <h5>{category}</h5>
                  <Progress  strokeColor={"blue"}
                    percent={((amount / totalIncomeTurnover) * 100).toFixed(0)}
                  />
                </div>
              </div>)
            );
          })}
        </div>
        <div className="col-md-4">
          <h4>CategoryWise Expense</h4>
          {category.map((category) => {
            const amount = allTransection
              .filter(
                (transaction) =>
                  transaction.type === "expense" &&
                  transaction.category === category
              )
              .reduce((acc, transaction) => acc + transaction.amount, 0);
            return (
              amount > 0 && 
             ( <div className="card">
                <div className="card-body">
                  <h5>{category}</h5>
                  <Progress  strokeColor={"blue"}
                    percent={((amount / totalExpenseTurnover) * 100).toFixed(0)}
                  />
                </div>
              </div>)
            );
          })}
        </div>
      </div>
      
    </>
  );
};

export default Analytics;
