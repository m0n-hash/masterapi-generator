import React from 'react';
import { withRouter } from "react-router";
import {connect} from 'react-redux';
import { withStyles, Divider } from '@material-ui/core';

const styles=theme=>({});

class ApiGeneratorPage extends React.Component{
    constructor(props){
        super(props);

        this.state={
            
        };
    }

    componentDidMount(){
        console.log(this.props.location);
    }

    handledrop=(item,_this)=>{
        _this.setState({
            lastDroppedItem:item
        })
    }

    render(){
        return(
            <div>
                Api Generator Page
                <Divider style={{ margin: '20px 0'}} />                
                <div style={{ overflow: 'hidden', clear: 'both' }}>
                    
                </div>
                <div style={{ overflow: 'hidden', clear: 'both' }}>
                    
                </div>
            </div>
        )
    }
}

export default withRouter(connect()(withStyles(styles)(ApiGeneratorPage)));