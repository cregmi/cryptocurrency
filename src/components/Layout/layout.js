import React from 'react';
import { Currency } from '../Currency';
import Search from '../Search';
import './layout.css';


const ROOT_URL = 'https://api.coinmarketcap.com/v1/ticker/';

export default class Layout extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			results: this.props.result,
			inDollars: true,
			sorts:{
				key:undefined,
				order:0,
				ord:false
			}
		}

		
		this.searchCoins = this.searchCoins.bind(this);
	}

	
	//is it the place to change the props
	componentWillReceiveProps(nextProps){
		this.setState({results: nextProps.result});
	}

	//sort
	sortedData(){
		const {key, order, ord} = this.state.sorts;
		const results = [...this.state.results];
		if(key && order){
			function compare(a,b){
				return a[key] - b[key];
 			}

 			results.sort((a,b) => {
 				return compare(a,b) * (order === 1 ? -1 : 1);
 			});
 			this.setState({results});

		}
	}

	sortByKey(key){
		const sorts = (this.state.sorts.key === key)
			? {key, order: (this.state.sorts.order + 1) % 3, ord:!this.state.sorts.ord}
			: {key, order: 1, ord:true};
		this.setState({sorts},
			 () => this.sortedData());
		
	}
	

	/*cache the data; make no requests to API once the data
		is retrieved for 2 minutes; 
		For testing don't retrieve data 
	*/
	checkIfChached(){
		const {results} = this.state;
		if (results === null){
			// make a new request
			return false;
		}else{
			//don't make a new request
			return true;
		}
	}

	

	//filter coins or search coins
	searchCoins(searchTerm){
		searchTerm = searchTerm.toLowerCase();
		let filteredResult = searchTerm ? this.state.results.filter(item => item["id"].toLowerCase().includes(searchTerm)): [];
		this.setState({filteredResult});


	}

	render(){
		const {results, inDollars, sorts, filteredResult} = this.state;
		return (
			<div>
				<h2>Cryptocurrency Market </h2>
				<div className="searchArea">
					<Search searchCoins={this.searchCoins} filteredResult={filteredResult ? filteredResult : []}/>
				</div>
				
				<table>
					<tbody>
					  <tr className="fixedHeader">
					  	<th style={{width:"5%"}}>Rank</th>
					    <th>Name</th>
					    <th>Market Cap <span className="fa fa-fw fa-sort" id="onetwo" onClick={() => this.sortByKey('market_cap_usd')}></span></th>
					    <th>Volume 24hr <span className="sorter"><i className="fa fa-fw fa-sort" onClick={() => this.sortByKey('24h_volume_usd')}></i></span></th>
					    <th>Price <span className="fa fa-fw fa-sort" onClick={() => this.sortByKey('price_usd')}></span></th>
					    <th>Circulating Supply <span className="fa fa-fw fa-sort" onClick={() => this.sortByKey('available_supply')}></span></th>
					    
					    <th style={{width:"10%"}}>Change 24hr <span className="fa fa-fw fa-sort" onClick={() => this.sortByKey('percent_change_24h')}></span></th>
					  </tr>
					 
					
					 	{results && <Currency currencies={results} inDollars={inDollars}/>}

					 
					</tbody>
				</table>
				<button style={{marginTop:'1.5rem', marginBottom: '1rem'}} onClick={this.props.loadMoreCoins}>Load More</button>
			</div>
		)
	}
	
}

