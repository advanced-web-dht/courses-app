import React, { useMemo, useEffect, useState, useRef } from 'react';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import NotificationsSharp from '@mui/icons-material/NotificationsSharp';
import Popover from '@mui/material/Popover';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import { toast } from 'react-toastify';

import useRequest from '../../hooks/useRequest';
import useToggle from '../../hooks/useToggle';
import NotificationItem from './notification';
import { NotificationContainer, NotificationList } from './style';
import { INotification } from '../../type';

const Notification: React.FC = () => {
  const { data, mutate } = useRequest<INotification[]>({ url: '/notifications' });
  const [isReady, setIsReady] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [unreadNotifications, setUnreadNotifications] = useState<INotification[]>([]);

  const { isOpen, handleClose, handleOpen } = useToggle();

  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const unreads = data?.filter((item) => !item.isRead);
    if (!isReady && data) {
      setIsReady(true);
    } else if (unreads && unreads?.length > unreadNotifications.length) {
      toast.success('Bạn vừa có 1 thông báo mới');
    }
    setUnreadNotifications(unreads || []);
    setNotifications(data || []);
  }, [data]);

  const HandleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const HandleClosePopup = () => {
    handleClose();
    mutate();
  };

  const displayNotifications = useMemo(
    () => (selectedTab === 0 ? unreadNotifications : notifications),
    [isReady, selectedTab, unreadNotifications]
  );

  return (
    <React.Fragment>
      <Tooltip title='Thông báo'>
        <IconButton onClick={handleOpen} ref={buttonRef}>
          <Badge badgeContent={unreadNotifications?.length} color='error'>
            <NotificationsSharp />
          </Badge>
        </IconButton>
      </Tooltip>
      <Popover
        open={isOpen}
        anchorEl={buttonRef.current}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        onClose={HandleClosePopup}
      >
        <Paper sx={{ backgroundColor: '#f4f6f6' }}>
          <NotificationContainer>
            <Tabs value={selectedTab} onChange={HandleChangeTab}>
              <Tab label='Chưa đọc' />
              <Tab label='Tất cả' />
            </Tabs>
            <NotificationList>
              {displayNotifications?.map((item) => (
                <NotificationItem key={item.id} notification={item} />
              ))}
            </NotificationList>
          </NotificationContainer>
        </Paper>
      </Popover>
    </React.Fragment>
  );
};

export default Notification;
