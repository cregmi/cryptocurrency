import React from 'react';
import './currency.css';

import { Link } from 'react-router-dom';

const IMAGE_URL = 'https://files.coinmarketcap.com/static/img/coins/16x16/';

export default function Currency({currencies, inDollars}){
	const listOfCurrencies = currencies.map(eachCoin => {
		const symbol = eachCoin.symbol.toLowerCase();
		return(
			<tr key={eachCoin.id} className="currencies">
				<td>{eachCoin.rank}</td>
				<td style={{ fontSize:'1.2rem'}}><Link to={`/detail/${eachCoin.id}`}><img src={`https://www.livecoinwatch.com/images/icons32/${symbol}.png`} style={{paddingRight:'10px'}}/>{eachCoin.name}</Link></td>
				<td>{inDollars ? "$" : "€"} {seperateByCommas(eachCoin.market_cap_usd)}</td>
				<td> {inDollars ? "$" : "€"} {seperateByCommas(eachCoin["24h_volume_usd"])}</td>
				<td>{inDollars ? "$" : "€"} {eachCoin.price_usd}</td>
				<td>{seperateByCommas(eachCoin.available_supply)}</td>
				
				<td className={eachCoin.percent_change_24h.startsWith('-') ? "decreasing" : "increasing"}>{eachCoin.percent_change_24h}</td>
			</tr>
		)
	}
	)
	return listOfCurrencies;
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