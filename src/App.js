//import { useState, useEffect } from 'react';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
//import 'bootstrap/dist/css/bootstrap.css';
import web3 from './web3';
import lottery from './lottery';
import styles from './mystyle.module.css';
import pic1 from './images/pic1.jpg';
import pic2 from './images/pic2.jpg';
import pic3 from './images/pic3.jpg';

class App extends Component {
  state = {
    beneficiary: '',
    CurrentUser: '',
    biddersItem1: [],
    biddersItem2: [],
    biddersItem3: [],
    balance: '',
    value: '',
    message: '',
    address: ''
  };
 
  
  async componentDidMount() {
    const beneficiary = await lottery.methods.getOwnerAddr().call();//Παίρνει την διευθυνση του ιδιοκτιτη.
    const CurrentUser = await window.ethereum.request({ method: "eth_requestAccounts" });//Παίρνει τον χρηστη που ειναι τωρα συνδεδεμενος.
    const balance = await web3.eth.getBalance(lottery.options.address);//Το bαlance του contract.
    const Reveal1 = await lottery.methods.Reveal(0).call();//Εμφανίζει το τρέχον αριθμό bid.
    const Reveal2 = await lottery.methods.Reveal(1).call();
    const Reveal3 = await lottery.methods.Reveal(2).call();
    const [name, setName] = "";

    this.setState({ beneficiary, CurrentUser, balance , Reveal1, Reveal2, Reveal3, name, setName});
  }

  //to message εξαφανιζεται μετα απο 6sec
  componentDidUpdate(){
    setTimeout(() => this.setState({message:''}), 6000);
  }
  
  biditem1 = async () => {  
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: 'Pay 0.01 ether to bid...' });
    await lottery.methods.biditem1().send({
          from:accounts[0],
          value: '10000000000000000',
          gas: 300000,
          gasPrice: null
    });

    this.setState({ message: 'You have bid for the car!' });    
  };

  biditem2 = async () => {  
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: 'Pay 0.01 ether to bid...' });
    await lottery.methods.biditem2().send({
          from:accounts[0],
          value: '10000000000000000',
          gas: 300000,
          gasPrice: null
        }); 
    this.setState({ message: 'You have bid for the phone!' });
  };

  biditem3 = async () => {  
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: 'Pay 0.01 ether to bid...' });
    await lottery.methods.biditem3().send({
          from:accounts[0],
          value: '10000000000000000',
          gas: 300000,
          gasPrice: null
    });  
    this.setState({ message: 'You have bid for the computer!' });
  };

  DeclareWinners = async () => {
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: 'Waiting on transaction success...' });
    await lottery.methods.DeclareWinners().send({
      from: accounts[0],
      gas: 300000,
      gasPrice: null
    });
    this.setState({ message: 'The winners have picked!' });
  };

  withdraw = async () => {
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: 'Wait...' });
    await lottery.methods.withdraw().send({
      from: accounts[0],
      gas: 300000,
      gasPrice: null
    });
    this.setState({ message: 'Done!' });
  };

  reveal = async () => {
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: 'Wait...' });
    await lottery.methods.Reveal(1).send({
      from: accounts[0],
      gas: 300000,
      gasPrice: null
    });
    this.setState({ message: 'Done!' });
  };

  amIwinner = async () => {
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: 'Wait...' });
    await lottery.methods.AmIWinner().send({
      from: accounts[0],
      gas: 300000,
      gasPrice: null
    });
    this.setState({ message: 'Done!' });
  };

  ChangeOwner = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: 'Wait...' });
    await lottery.methods.transferOwnership(this.state.value).send({
      from: accounts[0],
      gas: 300000,
      gasPrice: null
    });
    this.setState({ message: 'Done!' });
  };

  Reset = async () => {
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: 'Wait...' });
    await lottery.methods.reset().send({
      from: accounts[0],
      gas: 300000,
      gasPrice: null
    });
    this.setState({ message: 'Done!' });
  };

  Destroy = async () => {
    const accounts = await web3.eth.getAccounts();
    this.setState({ message: 'Wait...' });
    await lottery.methods.destroySmartContract().send({
      from: accounts[0],
      gas: 300000,
      gasPrice: null
    });
    this.setState({ message: 'Done!' });
  };
  

  render() {
    
    return (
    
      <div className={styles.main}>
        <Helmet>
        <title>Lottery</title>
        </Helmet>
        <h2 style={{textAlign: 'center'}}>Lottery - Ballot</h2>
        
        <hr />
        <div className={styles.allitems}>
          <div className={styles.items}>
            <h4>Car</h4>         
            <img src={pic1} alt="car"/>
            <br></br>
            <button onClick={this.biditem1}>Bid</button> 
            <h3>{this.state.Reveal1}</h3>{/* Εμφανίζει το τρέχον αριθμό bid. */} 
          </div>

          <div className={styles.items}>
            <h4>Phone</h4>      
            <img src={pic2} alt="smartphone"/>
            <br></br>
            <button onClick={this.biditem2}>Bid</button>
            <h3>{this.state.Reveal2}</h3>{/* Εμφανίζει το τρέχον αριθμό bid. */} 
          </div>

          <div className={styles.items}>
            <h4>Computer</h4>       
            <img src={pic3} alt="pc"/>
            <br></br>
             <button onClick={this.biditem3}>Bid</button>
             <h3>{this.state.Reveal3}</h3>{/* Εμφανίζει το τρέχον αριθμό bid. */} 
          </div>
        </div>

        <hr />

        <p style={{textAlign: 'center'}}>
          Current contract balance: {' '}
          {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>

        <p  style={{display: 'inline-block'}}>
          Current account: 
          <br></br>        
          <span className={styles.accounts}>{this.state.CurrentUser}</span> 
        </p>

        <p style={{float: 'right'}}>
          Owner's account: 
          <br></br>
          <span className={styles.accounts}>{this.state.beneficiary}</span>
        </p>
        
        <hr />
        <div className={styles.ButtonsLeft}>
         <button onClick={this.reveal}>Reveal</button>
         <button onClick={this.amIwinner}>AmIWinner</button>
        </div>
        
        <div className={styles.ButtonsRight}>
         <button onClick={this.withdraw}>Withdraw</button>
         <button onClick={this.DeclareWinners}>Declare Winner</button>
        </div>  

        <br></br>

        <div className={styles.OwnersButtons}>
          <form onSubmit={this.ChangeOwner}>          
            <div>
            <label>Place an account address: </label>
            <br></br>
            <input
              type="text" 
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
            </div>
            <button>Change Owner</button>
          </form>
          
          <button style={{paddingLeft: '24px'}} onClick={this.Reset}>Reset</button>
          <button style={{paddingLeft: '24px'}} onClick={this.Destroy}>Destroy</button>
        </div>
        <p id='result'></p>
        <h1>{this.state.message}</h1>

      </div>

      
    );
  }
}

export default App;
