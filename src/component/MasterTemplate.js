import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router";
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import withState from 'recompose/withState';
import toRenderProps from 'recompose/toRenderProps';
import { APP_NAME, STORAGE_KEYS,MAIN_MENU } from '../config/Constant';

const WithState = toRenderProps(withState('anchorEl', 'updateAnchorEl', null));
const fs=window.fs;
const util=window.util;
const drawerWidth = 363;

const readDir=util.promisify(fs.readdir);
const readFile=util.promisify(fs.readFile);

const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        overflow: 'hidden',
        position: 'absolute',
        display: 'flex',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0
    },
    defaultMenu:{
        paddingTop:5,
        paddingBottom:5,
        borderRadius:1
    },
    listMenu:{
        padding:0,
    },
    listLabel:{
        color:theme.palette.primary.contrastText,
        fontSize:'14px',
    },
    menuContainer:{
        borderBottom: '1px solid #9cb6b9',
    },
    appBar: {
        backgroundColor: theme.palette.background.dark,
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    appBarIcon: {
        marginRight: 8,
        // backgroundColor: '#eafffe',
        // padding: 4,
        borderRadius: 8,
        // border: '1px solid ' + theme.palette.primary.main
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        backgroundColor:theme.palette.background.dark,
        position: 'relative',
        whiteSpace: 'nowrap',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    toggleMenu:{
        backgroundColor:'#d4e5e7',
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    scrollMenu:{
        overflowY: 'auto',
        overflowX:'auto',
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        overflow: 'auto'
    },
    grow: {
        flexGrow: 1,
    },
    menuIcon:{
        color: theme.palette.text.dark,
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    welcomeGrid:{
        height:'56px'
    },
    welcomeImage: {
        // backgroundColor: theme.palette.primary.main,
        backgroundImage: 'url("/resources/api.png")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto',
        backgroundPosition: 'center',
        backgroundSize:'100% 100%'
    },
    welcomeText: {
        color: 'white',
        borderLeft: '3px solid #00838f',
        paddingLeft: theme.spacing.unit,
    },
    welcomeBackground: {
        background: 'rgba(2, 95, 10, 0.78)',
    }
})

class MasterTemplate extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            projectMenus:[]
        };
    }

    handleClick = (menu) => {
        var openObj={active:menu.name};

        if(!menu.isDirectory){
            var data=btoa(JSON.stringify(menu));
            this.props.history.push("/?data=abc");
            /*{
                pathname: '/',
                search:`?q=${data}`
            }*/
            this.setState(openObj);
            
            return;
        }

        openObj["open"+menu.name]=!this.state["open"+menu.name];
        console.log(openObj);
        this.setState(openObj);
    };

    componentDidMount(){
        const currentApi=JSON.parse(sessionStorage.getItem(STORAGE_KEYS.CURRENT_API));
        
        this.setState({currentApi:currentApi},()=>{
            this.readDir();
        });
    }

    async readDir(){
        var projectMenus=await this.loadDirectory(this.state.currentApi.projectDirectory+"\\src\\main\\java\\com\\sdm",0);
        
        this.setState({
            projectMenus:projectMenus
        })
    }

    async loadDirectory(dir, idx){
        var arr=[];
        
        const result = await readDir(dir).then((data)=>{
            return data;
        });
        
        for(var i=0;i<result.length;i++){
            var file=result[i];
            if(fs.lstatSync(dir+"\\"+file).isDirectory()){
                var subDirectory=await this.loadDirectory(dir+"\\"+file, idx+1);
                arr.push({name:file,path:dir+"\\"+file,isDirectory:true,subDirectory:subDirectory, idx:idx});
            }else
                arr.push({name:file,path:dir+"\\"+file,isDirectory:false, idx:idx});
        }

        return arr.sort((a, b) => b.isDirectory - a.isDirectory && a.name > b.name ? -1 : 1);
    }

    toggleSideMenu=()=>{
        this.setState({
            hideMenu:!this.state.hideMenu
        });
    }

    renderMenus=(menus)=>{
        const {theme}=this.props;
        return menus.map(menu=>{
            return(
                <WithState>
                    {({anchorEl, updateAnchorEl})=>{
                        const open=Boolean(anchorEl);
                        const handleClose=()=>{
                            updateAnchorEl(null);
                        };

                        return (
                            <List component="nav" className={[this.props.classes.listMenu]}>
                            <ListItem 
                                button key={menu.path} onClick={event=>{
                                        if(this.state.hideMenu && menu.isDirectory){
                                            updateAnchorEl(event.currentTarget);
                                        }
                                        this.handleClick(menu);
                                    }
                                } style={{paddingLeft: 12+(theme.spacing.unit * 3 * menu.idx), backgroundColor:this.state.active===menu.name?theme.palette.background.default:theme.palette.background.dark}}
                                className={this.props.classes.defaultMenu}>

                                <ListItemIcon>
                                    <Icon style={{ color:this.props.theme.palette.primary.main, fontSize: 22 }}>{menu.isDirectory?"folder":"description"}</Icon>
                                </ListItemIcon>
                                <ListItemText style={this.state.hideMenu?{display:"none", paddingLeft:"0px"}:{display:"block",paddingLeft:"0px"}} classes={{ primary: this.props.classes.listLabel }} inset='false' primary={menu.name} />
                                <div style={this.state.hideMenu?{display:"none"}:{display:"block"}}>
                                    {/*TODO: active menu css */}
                                    <div style={this.state.active===menu.name?{marginRight:0}:{marginRight:0}}>
                                    {
                                        menu.isDirectory?
                                            (this.state["open"+menu.name] ? 
                                            <Icon style={{ color:this.props.theme.palette.primary.main, fontSize: 22}}>expand_less</Icon> : 
                                            <Icon style={{ color:this.props.theme.palette.primary.main, fontSize: 22}}>expand_more</Icon>):""
                                    }
                                    </div>
                                </div>
                            </ListItem>
                            {
                                (menu.subDirectory && menu.subDirectory.length>0)?
                                    <Menu id="render-props-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
                                        {
                                            menu.subDirectory.map(childMenu => {
                                                return (
                                                    <MenuItem className={this.props.classes.defaultMenu} onClick={()=>{
                                                            handleClose();
                                                            this.handleClick(childMenu);
                                                        }}>
                                                        <ListItemIcon>
                                                            <Icon style={{ color:this.props.theme.palette.primary.main, fontSize: 22 }}>{childMenu.icon}</Icon>
                                                        </ListItemIcon>
                                                        <ListItemText classes={{ primary: this.props.classes.listLabel }} inset='false' primary={childMenu.name} />
                                                    </MenuItem>
                                                );
                                            })
                                        }
                                    </Menu>:""
                            }
                            <Collapse style={this.state.hideMenu?{display:"none"}:{display:"block"}} in={this.state["open"+menu.name]} timeout="auto" unmountOnExit>
                                {
                                    (menu.subDirectory && menu.subDirectory.length>0)?this.renderMenus(menu.subDirectory):""
                                }
                            </Collapse>
                            </List>
                        );
                    }}
                </WithState>
            )
        })
    }

    render(){
        const {classes,theme}=this.props;

        return (
            <div className={classes.root}>
                {/*App Bar */}
                <AppBar position="absolute"
                    className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" component="h1" style={{color:theme.palette.primary.main}} noWrap>
                            {APP_NAME}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Drawer style={this.state.hideMenu?{width:55}:{width:drawerWidth}} variant="permanent" classes={{
                        paper: classes.drawerPaper,
                    }}>
                    <div className={classes.toolbar} />
                    <div className={classes.welcomeImage}>
                        <div className={classes.welcomeBackground} style={this.state.hideMenu?{padding: theme.spacing.unit+3}:{padding: theme.spacing.unit * 3}}>
                            <Grid
                                container
                                spacing={16}
                                alignItems="center"
                                direction="row"
                                justify="space-between"
                                className={classes.welcomeGrid}>
                                {/* 
                                <div style={this.state.hideMenu?{display:"none"}:{display:"block"}}>
                                    <Typography style={{ color: 'white'}} variant="subtitle1" gutterBottom>
                                        --Api Name Here--
                                    </Typography>
                                </div>
                                
                                <IconButton onClick={() => this.toggleSideMenu()}> 
                                    <Icon className={classes.menuIcon}>menu</Icon>
                                </IconButton>
                                 */}
                            </Grid>
                        </div>
                    </div>
                    <div className={classes.scrollMenu}>
                        {this.renderMenus(this.state.projectMenus)}
                    </div>
                </Drawer>
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