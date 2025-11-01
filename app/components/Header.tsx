'use client';

import * as React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
  useScrollTrigger,
  Slide,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PhoneIcon from '@mui/icons-material/Phone';
import ComputerIcon from '@mui/icons-material/Computer';
import Link from 'next/link';

interface Props {
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <ComputerIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
        St. Catharines Computers
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.href} disablePadding>
            <ListItemButton
              component={Link}
              href={item.href}
              sx={{ textAlign: 'center' }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton
            component="a"
            href="tel:9058924555"
            sx={{
              textAlign: 'center',
              bgcolor: 'primary.main',
              color: 'white',
              mx: 2,
              borderRadius: 1,
              '&:hover': { bgcolor: 'primary.dark' },
            }}
          >
            <ListItemText primary="(905) 892-4555" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <HideOnScroll>
        <AppBar component="nav" elevation={0} sx={{ bgcolor: 'white', borderBottom: 1, borderColor: 'divider' }}>
          <Container maxWidth="lg">
            <Toolbar disableGutters>
              <ComputerIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'primary.main' }} />
              <Typography
                variant="h6"
                component={Link}
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontWeight: 700,
                  color: 'text.primary',
                  textDecoration: 'none',
                }}
              >
                St. Catharines Computers
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="menu"
                  onClick={handleDrawerToggle}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              </Box>

              <ComputerIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, color: 'primary.main' }} />
              <Typography
                variant="h6"
                component={Link}
                href="/"
                sx={{
                  flexGrow: 1,
                  display: { xs: 'flex', md: 'none' },
                  fontWeight: 700,
                  color: 'text.primary',
                  textDecoration: 'none',
                }}
              >
                STC Computers
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                {navItems.map((item) => (
                  <Button
                    key={item.href}
                    component={Link}
                    href={item.href}
                    sx={{ mx: 1, color: 'text.primary' }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>

              <Button
                variant="contained"
                startIcon={<PhoneIcon />}
                href="tel:9058924555"
                sx={{ display: { xs: 'none', md: 'flex' } }}
              >
                (905) 892-4555
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <Toolbar /> {/* Spacer */}

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
