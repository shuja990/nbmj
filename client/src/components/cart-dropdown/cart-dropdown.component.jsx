import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
import CartIcon from '../cart-icon/cart-icon.component'
import {selectCartHidden} from '../../redux/cart/cart.selectors'
import {connect} from 'react-redux'
import CustomButton from '../custom-button/custom-button.component';
import './cart-dropdown.styles.scss';
import { selectCartItems } from '../../redux/cart/cart.selectors'
import {withRouter} from 'react-router-dom';
import CartItem from '../cart-item/cart-item.component'
import { createStructuredSelector } from 'reselect';
import {toggleCartHidden} from '../../redux/cart/cart.actions';
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

function TemporaryDrawer({cartItems,history,dispatch,color}) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
          <ListItem style={{display:"flex"}}>
          <ListItem style={{cursor:"pointer"}} onClick={toggleDrawer(anchor, false)}>Close</ListItem>
          <ListItem>
    <CustomButton onClick={() => {
            history.push('/checkout');
            dispatch(toggleCartHidden())
            }}>GO TO CHECKOUT</CustomButton>
      </ListItem>
      </ListItem>
        {
        cartItems.length?
        cartItems.map((text, index) => (
          <ListItem button key={text}>
            <CartItem key={index} item={text}/>
          </ListItem>
        ))
            : <span className="empty-message">Your Cart is empty</span>
    }
      </List>

      <Divider />
    </div>
  );

  return (
    <div>
        <React.Fragment key={'bottom'}>
          <Button onClick={toggleDrawer('bottom', true)}><CartIcon color={color}/></Button>
          <Drawer anchor={'bottom'} open={state['bottom']} onClose={toggleDrawer('bottom', false)}>
            {list('bottom')}
          </Drawer>
        </React.Fragment>
    </div>
  );
}
const mapStateToProps = createStructuredSelector ({
    cartItems: selectCartItems,
    hidden: selectCartHidden,
})
export default withRouter(connect(mapStateToProps)(TemporaryDrawer));