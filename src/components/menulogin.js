import React from 'react';
import { IconButton, Whisper, Dropdown } from 'rsuite';
import MenuIcon from '@mui/icons-material/Menu';
import { Popover } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';

export default function MenuLogin({
  isPanelClose,
  handleClose,
  handleClick,
  anchorEl,
  auth,
  signOut,
  setIsCategorySet,
  open,
}) {
  const renderMenu = ({ onClose, left, top, className }, ref) => {
    const handleSelect = (eventKey) => {
      onClose();
      console.log(eventKey);
    };
    return (
      <Popover ref={ref} className={className} style={{ left, top }} full>
        <Dropdown.Menu onSelect={handleSelect} placement='leftStart'>
          <Dropdown.Item eventKey={0}>List (soon)</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item
            eventKey={1}
            onClick={() => {
              signOut();
              handleClose();
              setIsCategorySet(false);
            }}
          >
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Popover>
    );
  };

  return (
    <Whisper placement="leftStart" trigger="click" speaker={renderMenu}>
    <IconButton className='menuUser' style={{color: 'var(--primary-color) !important', borderRadius: '20% !important'}} appearance="primary" icon={<MenuIcon style={{ color: 'white' }} />} circle />
  </Whisper>
  );
}
