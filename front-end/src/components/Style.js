import React, { Component } from 'react';

export default class Style extends Component {
    constructor (props) {
        super (props);
        this.state = {
            item: this.props.location.state.item
        }
    }

    /* Mounting
     These methods are called when an instance of a component is being created and inserted into the DOM:
     * constructor()
     * componentWillMount()
     * render()
     * componentDidMount()
     */

    /* Updating
     An update can be caused by changes to props or state. These methods are called when a component is being re-rendered:
     * componentWillReceiveProps()
     * shouldComponentUpdate()
     * componentWillUpdate()
     * render()
     * componentDidUpdate()
     */

    /* Unmounting
     This method is called when a component is being removed from the DOM:
     * componentWillUnmount()
     */

    /* More information about the React.Component lifecycle here: https://reactjs.org/docs/react-component.html */

    render() {
        console.log(this.state.item);
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="text-center">
                            <img  className="img-thumbnail .style-image" data-srm={this.state.item.srm} alt={this.state.item.name} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h2 className="sub-header">{this.state.name}</h2>
                        <table className="table table-responsive table-striped">
                            <tbody>
                            <tr>
                                <td>Type:</td>
                                <td>North American Origin Ales</td>
                            </tr>
                            <tr>
                                <td>Description:</td>
                                <td>{this.state.item.description ? this.state.item.description : "No Description Available"}</td>
                            </tr>
                            <tr>
                                <td>IBU Min:</td>
                                <td>{this.state.item.ibu_min}</td>
                            </tr>
                            <tr>
                                <td>IBU Max:</td>
                                <td>{this.state.item.ibu_max}</td>
                            </tr>
                            <tr>
                                <td>ABV Min:</td>
                                <td>{this.state.item.abv_min}</td>
                            </tr>
                            <tr>
                                <td>ABV Max:</td>
                                <td>{this.state.item.abv_max}</td>
                            </tr>
                            <tr>
                                <td>Beers:</td>
                                <td>{this.state.item.beers}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}