import {
  Box,
  Container,
  Grid,
  Typography,
  Link as MuiLink,
  Stack,
  Divider,
  IconButton,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Link from 'next/link';

const serviceLinks = [
  { label: 'Laptop Repair', href: '/services/laptop-repair' },
  { label: 'Screen Replacement', href: '/services/screen-replacement' },
  { label: 'Data Recovery', href: '/services/data-recovery' },
  { label: 'Virus Removal', href: '/services/virus-removal' },
  { label: 'Computer Diagnostics', href: '/services/diagnostics' },
];

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

const locationLinks = [
  { label: 'St. Catharines', href: '/locations/st-catharines' },
  { label: 'Niagara Falls', href: '/locations/niagara-falls' },
  { label: 'Welland', href: '/locations/welland' },
  { label: 'Port Colborne', href: '/locations/port-colborne' },
  { label: 'Fonthill', href: '/locations/fonthill' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'grey.900',
        color: 'grey.300',
        pt: 6,
        pb: 3,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="white" gutterBottom fontWeight="bold">
              St. Catharines Computers
            </Typography>
            <Stack spacing={1.5} sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <LocationOnIcon sx={{ mr: 1, fontSize: 20 }} />
                <Typography variant="body2">
                  2 Pelham Town Square<br />
                  Fonthill, ON L0S 1E0
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PhoneIcon sx={{ mr: 1, fontSize: 20 }} />
                <MuiLink href="tel:9058924555" color="inherit" underline="hover">
                  (905) 892-4555
                </MuiLink>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EmailIcon sx={{ mr: 1, fontSize: 20 }} />
                <MuiLink href="mailto:info@stcatharinescomputers.com" color="inherit" underline="hover">
                  info@stcatharinescomputers.com
                </MuiLink>
              </Box>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <IconButton
                size="small"
                href="https://facebook.com"
                target="_blank"
                sx={{ color: 'grey.300', '&:hover': { color: 'primary.main' } }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                size="small"
                href="https://twitter.com"
                target="_blank"
                sx={{ color: 'grey.300', '&:hover': { color: 'primary.main' } }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                size="small"
                href="https://linkedin.com"
                target="_blank"
                sx={{ color: 'grey.300', '&:hover': { color: 'primary.main' } }}
              >
                <LinkedInIcon />
              </IconButton>
            </Stack>
          </Grid>

          {/* Services */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="white" gutterBottom fontWeight="bold">
              Our Services
            </Typography>
            <Stack spacing={1} sx={{ mt: 2 }}>
              {serviceLinks.map((link) => (
                <MuiLink
                  key={link.href}
                  component={Link}
                  href={link.href}
                  color="inherit"
                  underline="hover"
                  sx={{ display: 'block' }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="white" gutterBottom fontWeight="bold">
              Quick Links
            </Typography>
            <Stack spacing={1} sx={{ mt: 2 }}>
              {quickLinks.map((link) => (
                <MuiLink
                  key={link.href}
                  component={Link}
                  href={link.href}
                  color="inherit"
                  underline="hover"
                  sx={{ display: 'block' }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Stack>
          </Grid>

          {/* Service Areas */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="white" gutterBottom fontWeight="bold">
              Service Areas
            </Typography>
            <Stack spacing={1} sx={{ mt: 2 }}>
              {locationLinks.map((link) => (
                <MuiLink
                  key={link.href}
                  component={Link}
                  href={link.href}
                  color="inherit"
                  underline="hover"
                  sx={{ display: 'block' }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'grey.800' }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" color="grey.400">
            © {currentYear} St. Catharines Computers. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            <MuiLink component={Link} href="/privacy" color="grey.400" underline="hover">
              Privacy Policy
            </MuiLink>
            <MuiLink component={Link} href="/terms" color="grey.400" underline="hover">
              Terms of Service
            </MuiLink>
            <MuiLink component={Link} href="/sitemap" color="grey.400" underline="hover">
              Sitemap
            </MuiLink>
          </Stack>
        </Box>

        <Typography variant="body2" color="grey.500" sx={{ mt: 2, textAlign: 'center' }}>
          Built with ❤️ by{' '}
          <MuiLink href="https://www.jtgsystems.com" target="_blank" color="primary.main" underline="hover">
            JTG Systems
          </MuiLink>
        </Typography>
      </Container>
    </Box>
  );
}
