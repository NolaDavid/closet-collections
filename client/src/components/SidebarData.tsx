import * as React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import ChatIcon from '@material-ui/icons/Chat';
import SearchIcon from '@material-ui/icons/Search';

export const SidebarData = [
  {
    title: 'Home',
    icon: <HomeIcon style={{color: '#7ed957' }}/>,
    link: '/',
    cName: 'nav-text',
  },
  {
    title: 'Closet',
    icon: <MeetingRoomIcon style={{color: '#7ed957' }}/>,
    link: '/closet'
  },
  {
    cName: 'nav-text',
    title: 'Public Outfits',
    icon: <AccessibilityIcon style={{color: '#7ed957' }}/>,
    link: '/outfits'
  },
  {
    cName: 'nav-text',
    title: 'Calendar',
    icon: <EventAvailableIcon style={{color: '#7ed957' }}/>,
    link: '/calendar'
  },
  {
    cName: 'nav-text',
    title: 'Chat Room',
    icon: <ChatIcon style={{color: '#7ed957' }} />,
    link: '/chat'
  },
  {
    title: 'Find A Store',
    icon: <SearchIcon style={{color: '#7ed957' }} />,
    link: '/findastore'
  }
];


