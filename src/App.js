import React, { Component } from 'react';
import Layout from './components/Layout';
import Detail from './components/Detail/detail';
import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

const ROOT_URL = 'https://api.coinmarketcap.com/v1/ticker/';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			result: null,
			limit: 15,
			filteredResult:null,
			initialLoading:true
		}
		this.getData = this.getData.bind(this);
		this.loadMoreCoins = this.loadMoreCoins.bind(this);
		
	}

	//fetch data from remote API
	getData(){
		const {limit} = this.state;
		fetch(`${ROOT_URL}?limit=${limit}`)
			.then(res => res.json())
			.then(data => this.setState(prevState => {
				return {result: data}
			}))
	}

	//load more coins
	loadMoreCoins(){
		let oldresult = [...this.state.result];
		const start = this.state.limit;
		const URL = 'https://api.coinmarketcap.com/v1/ticker/?start=';
		fetch(`${URL}${start}&limit=15`)
			.then(res => res.json())
			.then(data => {
				this.setState({result: [...oldresult, ...data], limit:start+15});
			})

	}

	//search coins
	searchCoins(searchTerm){
		searchTerm = searchTerm.toLowerCase();
		let filteredResult = searchTerm ? this.state.result.filter(item => item["id"].toLowerCase().includes(searchTerm)): [];
		this.setState({filteredResult});


	}


	componentDidMount(){
		//For coding purpose only
		// const {result} = this.state;
		// if (result === null){
		// 	this.getData();
		// }
		if(this.state.initialLoading){
			this.setState({initialLoading: false}, ()=> this.getData());
		}else{
			this.interval = setInterval(this.getData, 40000);
		}
		
	}

	componentWillUnmount(){
		clearInterval(this.interval);
	}
	render() {
		const {result} = this.state;
		return (
		  <div className="App">
		      <BrowserRouter>
		      	<Switch>
		      		<Route path="/" 
		      			exact  
		      			render = {(props)=>
		      				 <Layout {...props} 
		      				 	result={result} 
		      				 	loadMoreCoins={this.loadMoreCoins}
		      				 />}
		      		/>

					{/* Pass the detail object as well to Detail component */}
		      		<Route path="/detail/:coin" 
		      			render = {(props) => 
		      				{
		      					let c = props.match.params.coin; 
		      					let detailCoin = result.filter(item  => item.id === c );
		      					return <Detail {...props} detailCoin = {detailCoin}/>
		      				}
		      			}
		      		/>


		      	{/* Redirects to home for all other urls */}
		      	<Route render = {(props)=>
		      				 <Layout {...props} 
		      				 	result={result} 
		      				 	loadMoreCoins={this.loadMoreCoins}
		      				 />}
		      		/>
		      	</Switch>
		      </BrowserRouter>
		  </div>
		);
	}
}

export default App;
