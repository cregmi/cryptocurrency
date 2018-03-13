import React from 'react';
import { debounce } from 'lodash';
import { Link } from 'react-router-dom';
import './search.css';
export default class Search extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			searchTerm:'',

		}
		this.onChange = this.onChange.bind(this);
		this.makeAPIcall = debounce(this.makeAPIcall.bind(this), 500)

	}

	onChange(event){
		this.setState({searchTerm: event.target.value}, this.makeAPIcall());
	}

	makeAPIcall(){
		const {searchTerm} = this.state;
		this.props.searchCoins(searchTerm);
	}

	componentWillUnmount(){
		this.makeAPIcall.cancel();
	}

	render(){
		const {filteredResult} = this.props;
		let show = filteredResult.length > 0 ? true: false;
		return(
			<div style={{position:'relative'}}>
				<input type="text" onChange={this.onChange} placeholder="Search..."/>
				{show && <div className="resultArea">
					<ul>
						{filteredResult.map(item =>
							<li key={item.id}><Link to={`/detail/${item.id}`}>{item.id}</Link></li>
						)}
					</ul>
					</div>
				}
			</div>
		)
	}
}