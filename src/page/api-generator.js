import React from 'react';
import { withRouter } from "react-router";
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core';
import { useDrag, useDrop } from 'react-dnd';

const styles=theme=>({});
const dragStyle = {
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    cursor: 'move',
    float: 'left',
}
const dropStyle = {
    height: '12rem',
    width: '12rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
}
class ApiGeneratorPage extends React.Component{
    constructor(props){
        super(props);

        this.state={};
    }

    componentDidMount(){
        this.testDrag();
    }

    testDrag(){
        /*
        const [{ isDragging }, drag] = useDrag({
            item: { name : "DO", type: "DOButton" },
            end: dropResult => {
              if (dropResult) {
                alert(`You dropped 'DO' into ${dropResult.name}!`)
              }
            },
            collect: monitor => ({
              isDragging: monitor.isDragging(),
            }),
        })
        const opacity = isDragging ? 0.4 : 1;

        this.setState({
            isDragging:isDragging,
            drag:drag,
            opacity:opacity
        });*/
    }

    render(){
        //DRAG

        //DROP
        /*
        const [{ canDrop, isOver }, drop] = useDrop({
            accept: "DO BUTTON",
            drop: () => ({ name: 'Dustbin' }),
            collect: monitor => ({
              isOver: monitor.isOver(),
              canDrop: monitor.canDrop(),
            }),
        })
        const isActive = canDrop && isOver
        let backgroundColor = '#222'
        if (isActive) {
            backgroundColor = 'darkgreen'
        } else if (canDrop) {
            backgroundColor = 'darkkhaki'
        }*/

        return(
            <div>
                Api Generator Page
                {/*
                <div style={{ overflow: 'hidden', clear: 'both' }}>
                    <div ref={drop} style={{ ...dropStyle, backgroundColor }}>
                    {isActive ? 'Release to drop' : 'Drag a box here'}
                    </div>
                </div>
                 */}
                <div style={{ overflow: 'hidden', clear: 'both' }}>
                    
                    <button ref={this.state.drag} style={{ ...dragStyle, opacity:this.state.opacity }}></button>
                    
                </div>
            </div>
        )
    }
}

export default withRouter(connect()(withStyles(styles)(ApiGeneratorPage)));