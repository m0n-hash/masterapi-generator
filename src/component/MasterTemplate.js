import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router";
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({})

class MasterTemplate extends React.Component{
    constructor(props){
        super(props);
        this.state ={};
    }

    render(){
        const {classes,theme}=this.props;

        return (
            <div className={classes.root}>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

MasterTemplate.propTypes={
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
}

const mapStateToProps = (state) =>{
    return{
        mag : state
    }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles, {withTheme : true})(MasterTemplate)));