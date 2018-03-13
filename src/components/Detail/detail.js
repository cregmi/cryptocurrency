import React from 'react';
import { Link } from 'react-router-dom';

import './detail.css';

const IMAGE_URL = 'https://files.coinmarketcap.com/static/img/coins/64x64/';


//This component should get single currency of which details needs to be shown
export default class extends React.Component{
	constructor(props){
		super(props);
		this.state={
			userCoin: null,
		}
		this.onCoinChange = this.onCoinChange.bind(this);
	}
	
	
	onCoinChange(event){
		this.setState({userCoin: event.target.value});
	}
	render(){
		const {detailCoin} = this.props;
		return(
			<div style={{paddingTop:'.5em'}}>
				
				{detailCoin.map(coin => <div>
					<div className="mainContainer">
						<div>
							<img src={`https://www.livecoinwatch.com/images/icons64/${coin.symbol.toLowerCase()}.png`} /> 
							<h2>{coin.name} ({coin.symbol})</h2>
						</div>
						<div className="buttonContainer">
							<div className="calculator">
								<span className="currency" style={{display:'block', backgroundColor: 'lightgrey', color:'white', lineHeight:'2.33rem'}}>{coin.symbol}</span>
								<input type="text" value={this.state.userCoin} onChange={this.onCoinChange}/>
								<i class="fa fa-arrow-right" style={{lineHeight:'3rem'}}></i>
								<span className="currency" style={{display:'block', backgroundColor: 'lightgrey', color:'white', lineHeight:'2.33rem'}}>USD</span>
								<input type="text"  value={(this.state.userCoin * coin.price_usd).toFixed(2)}/>
							</div>
							<button onClick={this.props.history.goBack}> Back </button>
						</div>
					</div>
					<div className="tableWrapper">
						<table className="detailTable">
							<tbody>
								<tr>
									<td>Rank</td>
									<td>{coin.rank}</td>
								</tr>
								<tr>
									<td>Price in USD</td>
									<td> $ {coin.price_usd}</td>
								</tr>
							  	<tr>
								    <td>24 hour volume</td>
								    <td> $ {seperateByCommas(coin["24h_volume_usd"])}</td>
							  	</tr>
							  	<tr>
								    <td>Circulating Supply</td>
								    <td>{seperateByCommas(coin.available_supply)}</td>
							  	</tr>
							  	<tr>
							  		<td>Total Supply</td>
							  		<td>{seperateByCommas(coin.total_supply)}</td>
							  	</tr>
							  	<tr>
								    <td>Market Cap</td>
								    <td> $ {seperateByCommas(coin.market_cap_usd)}</td>
							 	 </tr>
							 	 <tr>
								    <td>Maximum Supply</td>
								    <td>{coin.max_supply ? seperateByCommas(coin.max_supply) : 'Not available'}</td>
							 	</tr>
							  	<tr>
								    <td>Percentage Change 1 hour</td>
								    <td className={coin.percent_change_1h.startsWith('-') ? "red" : "green"}>
								    	 <i className={coin.percent_change_1h.startsWith('-') ? "fa fa-arrow-down" : "fa fa-arrow-up"}></i> 
								    	 {coin.percent_change_1h} %
								    </td>
							  	</tr>
							  	<tr>
								    <td>Percentage Change 7 days</td>
								    <td className={coin.percent_change_7d.startsWith('-') ? "red" : "green"}>
								    	 <i className={coin.percent_change_7d.startsWith('-') ? "fa fa-arrow-down" : "fa fa-arrow-up"}></i> 
								    	 {coin.percent_change_7d} %
								    </td>
							  	</tr>
							 	<tr>
								  	<td>Percentage Change 24 hours</td>
								  	<td className={coin.percent_change_24h.startsWith('-') ? "red" : "green"}>
								    	 <i className={coin.percent_change_24h.startsWith('-') ? "fa fa-arrow-down" : "fa fa-arrow-up"}></i> 
								    	 {coin.percent_change_24h} %
								    </td>
							  	</tr>
							 	<tr>
								  	<td>Price in BTC</td>
								  	<td>{coin.price_btc}</td>
							  	</tr>
							  </tbody>
						</table>
					</div>
				</div>
				)}
			
			</div>
		)
	}
}

//seperate numbers by , into three digits
function seperateByCommas(numberToBeSep){
	if(numberToBeSep.includes('.')){
		const[partToReplace] = numberToBeSep.split('.');
		return partToReplace.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
	}else{
		return numberToBeSep.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
}
}