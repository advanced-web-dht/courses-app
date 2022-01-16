import React, { useState, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';

import { UpdateNotificationStatus } from '../../api/client';
import { INotification } from '../../type';

interface NotificationProps {
  notification: INotification;
}

const Notification: React.FC<NotificationProps> = ({ notification }) => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    (async () => {
      if (expanded && !notification.isRead) {
        await UpdateNotificationStatus(notification.id);
      }
    })();
  }, [expanded]);

  const handleChange = () => {
    setExpanded(!expanded);
  };

  return (
    <React.Fragment>
      <Accordion expanded={expanded} onChange={handleChange}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div>
            <Typography component='div' fontWeight='bold'>
              [{notification.class.name} - {notification.topic}]
            </Typography>
            <Typography component='div' variant='subtitle2' fontWeight={500} color='primary'>
              {new Date(notification.createdAt).toLocaleString('vi-VN')}
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant='body2' marginTop={-1}>
            &bull; {notification.message}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Divider />
    </React.Fragment>
  );
};

export default Notification;
