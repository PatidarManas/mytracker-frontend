import React, { useState } from "react";
import "./Page.scss";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const Page = () => {
  const url = "http://localhost:4000";
  const history = useNavigate();
  const location = useLocation();
  const incomearr= location.state.user.income;
  const expensearr= location.state.user.expense;
  var i = Number(0);
  for (var j = 0; j < location.state.user.income.length; j++) {
    i += Number(location.state.user.income[j][1]);
  }
  var e = 0;
  for (var j = 0; j < location.state.user.expense.length; j++) {
    e += Number(location.state.user.expense[j][1]);
  }
  console.log(i);
  const [income, setincome] = useState(i);
  const [inc, setinc] = useState(0);
  const [inctext, setinctext] = useState("");
  const [expense, setexpense] = useState(e);
  const [exp, setexp] = useState(0);
  const [exptext, setexptext] = useState("");
  const [balance, setbalance] = useState(income - expense);
  async function addincome() {
    try {
      setincome(Number(income) + Number(inc));
      setbalance(Number(balance) + Number(inc));
      incomearr.push([inc,inctext])
      incomeclear();
      await axios
        .post(`${url}/addincome`, {
          id: location.state.user._id,
          title: inctext,
          amount: inc,
        })
        .then((res) => {
          if (res.data == "error") {
            alert("error occured");
            history("../");
          }
        });
    } catch (error) {
      alert(error);
    }
  }
  async function addexpense() {
    try {
      setexpense(Number(expense) + Number(exp));
      setbalance(Number(balance) - Number(exp));      
      expensearr.push([exp,exptext]);
      expenseclear();
      await axios
        .post(`${url}/addexpense`, {
          id: location.state.user._id,
          title: exptext,
          amount: exp,
        })
        .then((res) => {
          if (res.data == "error") {
            alert("error occured");
            history("../");
          }
        });
    } catch (error) {
      alert(error);
    }
  }
  function incomeclear() {
    document.getElementById("inputText").value = "";
    document.getElementById("inputText1").value = "";
  }
  function expenseclear() {
    document.getElementById("expenseinput1").value = "";
    document.getElementById("expenseinput2").value = "";
  }
  function closeexpense(){
    document.getElementById("Expenses").style.display="none"
  }
  function closeincome(){
    document.getElementById("Incomes").style.display="none"
  }
  function openincome(){
    document.getElementById("Incomes").style.display="flex"
  }
  function openexpense(){
    document.getElementById("Expenses").style.display="flex"
  }
  async function deleteincome(ele,index){
    try {
      await axios.post(`${url}/removeincome`,{
        date:ele.date,amount:ele.amount,title:ele.title
      }).then(()=>{
        delete incomearr[index-1];
        setincome(Number(income) - Number(ele.amount));
        setbalance(Number(balance) - Number(ele.amount))
      })
    } catch (error) {
      alert(error)
    }
  }
  async function deleteexpense(ele,index){
    try {
      await axios.post(`${url}/removeexpense`,{
        date:ele.date,amount:ele.amount,title:ele.title
      }).then(()=>{
        delete expensearr[index-1];
        setexpense(Number(expense) - Number(ele.amount));
        setbalance(Number(balance) + Number(ele.amount));
      })
    } catch (error) {
      alert(error)
    }
  }
  return (
    <div className="content">
      <div className="bar">
        <div className="logo">My Tracker</div>
        <div className="btns">
          <a onClick={openincome}>Incomes</a>
          <a onClick={openexpense}>Expenses</a>
        </div>
        <div className="Name">{location.state.user.name}</div>
      </div>
      <div className="main-box">
        <div className="left">
          <h1 >Total Income : Rs {income}</h1>
          <h1 >Total Expenses : Rs {expense}</h1>
          {
            balance>0 ?<h1 className="green">Balance : Rs {balance}</h1> : <h1 className="red"> Balance : Rs {balance}</h1>
            
          }
        </div>
        <div className="right">
          <div className="up">
            <div className="add">
              <h3>Add New Income</h3>
              <div className="form">
                <input
                  id="inputText"
                  type="number"
                  placeholder="Amount(monthly)"
                  onChange={(e) => setinc(e.target.value)}
                />
                <input
                  id="inputText1"
                  type="text"
                  placeholder="Title"
                  onChange={(e) => setinctext(e.target.value)}
                />
                <button onClick={(e) => addincome(e)}>Add</button>
                <button className="clrbtn" onClick={incomeclear}>Clear</button>
              </div>
            </div>
            <button className="button" onClick={openincome}>Income Details</button>
          </div>
          <div className="down">
            <div className="add">
              <h3>Add New Expense</h3>
              <div className="form">
                <input
                  type="text"
                  id="expenseinput1"
                  placeholder="Amount"
                  onChange={(e) => setexp(e.target.value)}
                />
                <input
                  type="text"
                  id="expenseinput2"
                  placeholder="Title"
                  onChange={(e) => setexptext(e.target.value)}
                />
                <button onClick={addexpense}>Add</button>
                <button className="clrbtn" onClick={expenseclear}>Clear</button>
              </div>
            </div>
            <button className="button" onClick={openexpense}>Expenses Details</button>
          </div>
        </div>
      </div>
      <div className="Incomes" id="Incomes">
        <div className="box">
        <button className="close" onClick={closeincome}>Close</button>
        <h1>Incomes details</h1>
          <div className="c1">
            <h4>Date</h4>
            <h4>Amount</h4>
            <h4>Title</h4>
            <h4>Action(not working)</h4>
          </div>
          {incomearr.map((ele,index) => {
            return (
              <div className="c2">
                <h4>{ele[0]}</h4>
                <h4>{ele[1]}</h4>
                <h4>{ele[2]}</h4>
                <button >Delete</button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="Expenses" id="Expenses" >
        <div className="box">
        <button className="close" onClick={closeexpense}>Close</button>
        <h1>Expenses details</h1>
          <div className="c1">
            <h4>Date</h4>
            <h4>Amount</h4>
            <h4>Title</h4>
            <h4>Action(not working)</h4>

          </div>
          {expensearr.map((ele,index) => {
            return (
              <div className="c2">
                <h4>{ele[0]}</h4>
                <h4>{ele[1]}</h4>
                <h4>{ele[2]}</h4>
                <button >Delete</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
