import React from 'react';
import { withRouter } from "react-router";
import {connect} from 'react-redux';
import { withStyles, Icon, Button, IconButton, Divider, Grid, Typography, InputBase, Paper  } from '@material-ui/core';
import {primary,secondary,action,background,text} from '../config/Theme';
import LoadingDialog from '../component/Dialogs/LoadingDialog';
import ErrorDialog from '../component/Dialogs/ErrorDialog';
import {GIT_URL, STORAGE_KEYS} from '../config/Constant';

const electron = window.electron;
const {dialog}=window.electron.remote;
const git=window.git;
const fs=window.fs;

const styles = theme => ({
    root: {
        backgroundColor:background.dark,
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden'
    },
    container:{
        padding:5,
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    },
    textField:{
        width: 'calc(100% - 8px)',
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        marginLeft: theme.spacing.unit, 
    },
    cardBox:{
        // backgroundImage:'url(/res/bg.png)',
        backgroundColor: background.default,
        borderRadius:3,
        margin:'40px',
        boxShadow: '0px 0px 0px 0px #e9f0ed2b,1px 1px 2px 0.2px #2d885780',
        transition: '0.3s',
    },
    media: {
        width: 'calc(100%)',
        paddingTop: '20px',
        margin: 'auto',
        height: 140,
    },
    cardActions:{
        display: 'inline-block',
        width: '100%',
    },
    txtContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        width: 'calc(100%)',
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    margin: {
        margin: theme.spacing.unit,
    },
    inputContainer: {
        margin: '30px 0 0 0',
        padding: '2px 2px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    input: {
        marginLeft: 8,
        flex: 1,
    },
    iconButton: {
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop:0,
        paddingBottom:0
    },
    iconPadding:{
        paddingTop:10,
        paddingBottom:10
    },
    divider: {
        backgroundColor: theme.palette.primary.main,
        width: 1,
        height: 28,
        margin: 4,
    },
    logo: {
        width: 120,
        height: 120,
        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)'
    },
    errorTxt: {
        color: action.warn,
        paddingLeft: '4px'
    },
    errorIcon: {
        color: action.warn,
        fontSize: '16px'
    },
    img: {
        width: '150px',
        height: '150px',
        borderRadius: '80px',
    }
});

class ApiCreatePage extends React.Component{
    constructor(props){
        super(props);

        this.state={
            name:"",
            projectDirectory:"",
            showLoading:false,
            showError:false
        };
    }

    browseDirectory(loadDirectory){
        var _this=this;
        //TODO: to remove default path
        dialog.showOpenDialog({ 
            properties: ['openDirectory','createDirectory','promptToCreate'],
            defaultPath :'D:\\Yoe Tha\\Web\\Master Api (spring-boot)\\api-generator\\react',
            message :"Git Clone" 
        },function(filePaths,bookMarks){
            if(filePaths===null || filePaths===undefined || filePaths.length<=0)
                return;
            
            _this.setState({
                projectDirectory:filePaths[0]
            },()=>{
                if(loadDirectory)
                    loadDirectory(_this,filePaths[0]);
            })
        });
    }

    gitClone(){
        var _this=this;

        if(!_this.state.name){
            _this.setState({nameError:true});
            return;
        }
        if(!_this.state.projectDirectory){
            _this.setState({directoryError:true});
            return;
        }

        _this.setState({showLoading:true},()=>{
            var targetDirectory=_this.state.projectDirectory+"\\"+_this.state.name;

            if(!fs.existsSync(targetDirectory))
                fs.mkdirSync(targetDirectory);
            
            git.Clone(GIT_URL,targetDirectory).then(function(repository){
                _this.setState({showLoading:false},()=>{
                    _this.loadDirectory(_this,targetDirectory);
                });
            },function(error){
                console.log(error);
                _this.setState({
                    showLoading:false,
                    showError:true,
                    errorMessage:"Error occur when cloning git repository!"
                })
            }); 
        });
    }

    loadDirectory(_this, targetDirectory){
        sessionStorage.setItem(STORAGE_KEYS.CURRENT_API,JSON.stringify({"projectDirectory":targetDirectory}));
        
        _this.props.history.push('/');
    }

    handleError = () => {
        this.setState({ showError: !this.state.showError});
    };

    onChangeText = (key,value) =>{
        this.setState({[key] : value});
    }

    render(){
        const {classes} = this.props;

        return(
            <div className={classes.root}>
                <ErrorDialog title="Oops!" description={this.state.errorMessage} showError={this.state.showError} handleError={this.handleError} />
                <LoadingDialog showLoading={this.state.showLoading} message="Cloning git repository..." />
                <Grid className={classes.container} container spacing={24} alignItems="center" justify="center">
                    <Grid style={{padding:'22px'}} className={classes.cardBox} item xs={12} sm={8} md={6} lg={4}>
                    <Grid container justify="center">
                        <img src="/resources/logo.png" alt="Logo" title="Logo" className={classes.img} />
                    </Grid>
                    <Grid item xs={12}>
                        <Divider style={{ margin: '20px 0'}} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography style={{ color: text.main, textAlign: 'center', margin: '0px 0px 8px 0px'}} variant="h4">
                            GENERATOR!
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Paper className={classes.inputContainer} elevation={1}>
                            <Icon className={classes.iconButton} color="primary">spa</Icon>
                            <Divider className={classes.divider} />
                            <InputBase
                                autoFocus
                                name="name"
                                style={{color:text.dark}}
                                className={classes.input} 
                                placeholder="(project name)"
                                onChange={(event) => this.onChangeText(event.target.name, event.target.value)}
                            />
                        </Paper>
                        {this.state.nameError ? (
                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '2px'}}>
                                <Icon className={classes.errorIcon}>warning</Icon>
                                <Typography className={classes.errorTxt} variant="caption">
                                    Invalid project.
                                </Typography>
                            </div>
                        ) : (
                            <Typography variant="caption">
                            </Typography>
                        )}
                        <Paper className={classes.inputContainer} elevation={1}>
                            <Icon className={classes.iconButton} color="primary">laptop_chromebook</Icon>
                            <Divider className={classes.divider} />
                            <InputBase
                                autoFocus
                                name="directory"
                                style={{color:text.dark}}
                                className={classes.input} 
                                placeholder="(project directory)"
                                readOnly={true}
                                value={this.state.projectDirectory}
                            />
                            <IconButton className={[classes.iconButton,classes.iconPadding]} aria-label="password" onClick={()=>this.browseDirectory()}>
                                <Icon color="primary">create_new_folder</Icon>
                            </IconButton>
                        </Paper>
                        {this.state.directoryError ? (
                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '2px'}}>
                                <Icon className={classes.errorIcon}>warning</Icon>
                                <Typography className={classes.errorTxt} variant="caption">
                                    Invalid directory.
                                </Typography>
                            </div>
                        ) : (
                            <Typography variant="caption">
                            </Typography>
                        )}
                        <Button style={{marginTop: '30px', marginBottom: '20px'}} color="primary" variant="contained" size="large" className={classes.button} onClick={() => this.gitClone()}>
                            <Icon className={classes.iconButton} >cloud_download</Icon>
                            Git Clone
                        </Button>
                        <Divider style={{ margin: '20px 0'}} />
                        <Button style={{marginTop: '30px', marginBottom: '20px'}} color="secondary" variant="contained" size="large" className={classes.button} onClick={() => this.browseDirectory(this.loadDirectory)}>
                            <Icon className={classes.iconButton} >folder</Icon>
                            Load
                        </Button>

                        <Typography style={{ color: text.main, textAlign: 'center', margin: '0px 0px 8px 0px'}} variant="subtitle1">
                            Copyright © 2019 {new Date().getFullYear()<=2019?"":"-" + new Date().getFullYear()} by <a style={{color:primary.main, textDecoration: 'none'}} rel="noopener noreferrer" target="_blank" href="http://www.sundewmyanmar.com/">SUNDEW MYANMAR</a>. <br/>
                            All rights reserved.
                        </Typography>
                        
                    </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withRouter(connect()(withStyles(styles)(ApiCreatePage)));