import React from 'react'
import Button from '@material-ui/core/Button'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import {makeStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import {LOGOUT} from '../constants/actionTypes'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}))

const mapDispatchToProps = dispatch => ({
    onClickLogout: () => dispatch({type: LOGOUT}),
})

const MenuPopper = ({onClickLogout}) => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)
    const anchorRef = React.useRef(null)

    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen)
    }

    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return
      }

      setOpen(false)
    }

    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault()
        setOpen(false)
      }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open)
    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus()
      }

      prevOpen.current = open
    }, [open])

    return (
      <div className={classes.root}>
          <Button
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : null}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            Account Settings
          </Button>
          <Popper open={open} anchorEl={anchorRef.current} role={null} transition disablePortal>
            {({TransitionProps, placement}) => (
              <Grow
                {...TransitionProps}
                style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                      <MenuItem onClick={handleClose}>My account</MenuItem>
                      <MenuItem onClick={onClickLogout}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
    )
}

export default connect(null, mapDispatchToProps)(MenuPopper)
