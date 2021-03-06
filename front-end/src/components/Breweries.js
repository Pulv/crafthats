import React, { Component } from 'react';
import chunk from 'lodash.chunk';
import axios from 'axios';

import ItemSelector from './ItemSelector';
import PageSelector from './PageSelector';


export default class Breweries extends Component {
    constructor (props) {
        super (props);
        this.state = {
            breweries: [],
            page: 0,
            numPages: 0,
            totalCount: 0,
            pgSize: 9,
            pathname: "/Breweries"
        }
        this.apiUrl = 'https://backend-staging-183303.appspot.com/breweries';
    }

    /* Mounting
        These methods are called when an instance of a component is being created and inserted into the DOM:
            * constructor()
            * componentWillMount()
            * render()
            * componentDidMount()
     */

    componentDidMount () {
        this.callAPI()
    }

    handlePageChange = (page, e) => {
        e.preventDefault()
        console.log("in handlePageChange")
        //return <Redirect to={{pathname: this.state.pathname, state: {page: page}}} push={true} />;
        this.setState({page: page})
    }

    handlePrev = (e) => {
        e.preventDefault()
        if (this.state.page > 0) {
            this.setState({page: this.state.page - 1})
        }
    }

    handleNext = (e) => {
        e.preventDefault()
        if (this.state.page < this.state.numPages - 1) {
            this.setState({page: this.state.page + 1})
        }
    }

    sort = (order, e) => {
        if (e) {
            e.preventDefault()
        }
        let limit = this.state.pgSize
        let offset = this.state.page * this.state.pgSize
        let self = this
        axios.get(self.apiUrl+"?order="+order+"&limit="+limit+"&offset="+offset)
            .then((res) => {
                // Set state with result
                self.setState({breweries: res.data.records, totalCount: res.data.totalCount, numPages: res.data.totalCount/self.state.pgSize});
            })
            .catch((error) => {
                console.log(error)
            });
    }

    callAPI = () => {
        console.log("in callAPI")
        let limit = this.state.pgSize
        let offset = this.state.page * this.state.pgSize
        let self = this

        axios.get(self.apiUrl+"?limit="+limit+"&offset="+offset)
            .then((res) => {
                // Set state with result
                self.setState({breweries: res.data.records, totalCount: res.data.totalCount, numPages: res.data.totalCount/self.state.pgSize});
            })
            .catch((error) => {
                console.log(error)
            });
    }

    /* Updating
        An update can be caused by changes to props or state. These methods are called when a component is being re-rendered:
            * componentWillReceiveProps()
            * shouldComponentUpdate()
            * componentWillUpdate()
            * render()
            * componentDidUpdate()
     */

    componentDidUpdate(prevState, nextState) {
        if (nextState.page !== this.state.page) {
            if (this.state.order !== "") {
                this.sort(this.state.order)
            } else {
                this.callAPI()
            }
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
        }
    }

    /* Unmounting
        This method is called when a component is being removed from the DOM:
            * componentWillUnmount()
     */

    /* More information about the React.Component lifecyle here: https://reactjs.org/docs/react-component.html */
    render () {
        // Create an array of X components with 1 for each brewery gathered from API call
        let breweryComponents = this.state.breweries.map(function(brewery) {
            return (
                <ItemSelector item={brewery} navigateTo="/Brewery"/>
            );
        })

        return (
            <div className="container">
                <strong>{"Sort By: "}</strong>
                <div className="button btn-group">
                    <button type="button" className="btn btn-default" onClick={(e) => this.sort("asc", e)} >Ascending</button>
                    <button type="button" className="btn btn-default" onClick={(e) => this.sort("desc", e)} >Descending</button>
                </div>
                {/* Break array into separate arrays and wrap each array containing 3 components in a row div */}
                { chunk(breweryComponents, 3).map(function(row) {
                    return (
                        <div className="row">
                            { row }
                        </div>
                    )
                })}
                <PageSelector handlePageChange={this.handlePageChange}
                              handlePrev={this.handlePrev}
                              handleNext={this.handleNext}
                              numPages={this.state.numPages}
                              navigateTo="/Breweries"/>
            </div>
        );
    }
}