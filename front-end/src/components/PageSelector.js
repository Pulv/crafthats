/**
 * Created by travisreed7 on 10/19/17.
 */
import React, { Component } from 'react';

export default class PageSelector extends Component {
    constructor (props) {
        super (props);
        this.state = {
            attribute1: ''
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
        return (
            <div className="row">
                <div className="col-md-12 container-thumbnail">
                    <div className="text-center">Prev | 1 | 2 | 3 | 4 | Next</div>
                </div>
            </div>
        );
    }
}