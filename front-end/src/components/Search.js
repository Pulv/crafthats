import React, { Component } from 'react';
import axios from 'axios';
import Fuse from 'fuse.js';
import {Redirect} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import { RingLoader } from 'react-spinners';


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allData: [],
            results: [],
            searchTerm: "",
            totalCount: 0,
            numPages: 0,
            pgSize: 9,
            loading: false,
            navigate: false
        }
        this.apiUrl = 'https://backend-staging-183303.appspot.com/';
    }

    handleSearch = (e) => {
        e.preventDefault()
        this.setState({ searchTerm: this.input.value });
        this.callAPI()
    }

    callAPI = () => {
        let self = this
        let beerKeys = ["abv", "ibu", "brewery", "name", "style", "organic"]
        let breweryKeys = ["beers", "city", "country", "description", "established", "name", "state", "styles"]
        let reviewKeys = ["beer_name", "brewery_name", "comment", "date", "rating"]
        let styleKeys = ["abv_max", "abv_min", "breweries", "beers", "description", "ibu_max", "ibu_min", "name", "srm"]

        this.setState({loading: true})
        axios.all([
            axios.get(self.apiUrl+"/beers?limit=500"),
            axios.get(self.apiUrl+"/breweries?limit=500"),
            axios.get(self.apiUrl+"/styles?limit=500"),
            axios.get(self.apiUrl+"/reviews?limit=500")
        ])
            .then(axios.spread((beers, breweries, styles, reviews) => {
                // Set state with result
                this.setState({loading: false})
                let allRecords = beers.data.records.concat(breweries.data.records).concat(styles.data.records).concat(reviews.data.records)
                let allKeys = beerKeys.concat(breweryKeys).concat(styleKeys).concat(reviewKeys)
                self.searchData(allRecords, allKeys)
            }))
            .catch((error) => {
                console.log(error)
            });
    }

    searchData = (records, keys) => {
        let options = {
            shouldSort: true,
            threshold: 0.2,
            maxPatternLength: 16,
            minMatchCharLength: 1,
            keys: keys
        };
        let fuse = new Fuse(records, options);
        let result = fuse.search(this.state.searchTerm);
        this.setState({ results: result, navigate: true, loading: false });
    }


    render() {

        if (this.state.navigate) {
            this.setState({navigate: false})
            return <Redirect to={{pathname: '/SearchResults', state: {results: this.state.results, searchTerm: this.state.searchTerm}}} push={true} />;
        }
        return (
            <form className="navbar-form navbar-right" onSubmit={this.handleSearch}>
                <div>
                    <div className='sweet-loading'>
                        <RingLoader
                            color={'#003b6f'}
                            loading={this.state.loading}
                        />
                    </div>
                    {this.state.loading ? "Loading..." : ""}
                </div>
                <div className="form-group">
                    <div className="input-group">
                        <input type="text"
                               className="form-control"
                               placeholder="Search"
                               aria-label="Search"
                               ref={(element) => { this.input = element }} />
                            <div className="input-group-btn">
                                <button className="btn btn-default" type="submit">
                                    <i className="glyphicon glyphicon-search"/>
                                </button>
                            </div>
                    </div>
                </div>
            </form>
        );
    }
}

export default withRouter(Search);