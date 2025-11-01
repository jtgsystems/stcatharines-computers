import { Box, Container, Typography, Button, Grid, Card, CardContent, CardActions, Stack, Chip } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import BuildIcon from '@mui/icons-material/Build';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const services = [
  {
    title: 'Laptop Screen Repair',
    description: 'Professional screen replacement for all laptop brands. Same-day service available.',
    icon: <BuildIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
  },
  {
    title: 'Virus & Malware Removal',
    description: 'Thorough cleaning and protection for your computer. Fast turnaround times.',
    icon: <SecurityIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
  },
  {
    title: 'Data Recovery',
    description: 'Expert data recovery services for hard drives, SSDs, and USB drives.',
    icon: <SpeedIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
  },
];

const features = [
  'Same-Day Repairs Available',
  'Free Diagnostics',
  'Experienced Technicians',
  'Warranty on All Repairs',
  'Competitive Pricing',
  'Local Niagara Business',
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
                Expert Computer Repair in St. Catharines
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                Fast, reliable laptop and PC repair services in the Niagara Region
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    '&:hover': { bgcolor: 'grey.100' },
                  }}
                  startIcon={<PhoneIcon />}
                  href="tel:9058924555"
                >
                  Call (905) 892-4555
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': { borderColor: 'grey.100', bgcolor: 'rgba(255,255,255,0.1)' },
                  }}
                  href="/contact"
                >
                  Get a Quote
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Services Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom fontWeight="bold">
          Our Services
        </Typography>
        <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
          Professional computer repair services you can trust
        </Typography>

        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box sx={{ mb: 2 }}>{service.icon}</Box>
                  <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                    {service.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {service.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                  <Button variant="outlined" href="/services">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom fontWeight="bold">
            Why Choose Us?
          </Typography>
          <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
            Your trusted computer repair experts in the Niagara region
          </Typography>

          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircleIcon sx={{ color: 'success.main', mr: 2, fontSize: 28 }} />
                  <Typography variant="h6">{feature}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Service Areas Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom fontWeight="bold">
          Serving the Niagara Region
        </Typography>
        <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 4 }}>
          We provide computer repair services throughout the Niagara region
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 2 }}>
          {['St. Catharines', 'Niagara Falls', 'Welland', 'Port Colborne', 'Fonthill', 'Grimsby', 'Thorold', 'Fort Erie'].map((location) => (
            <Chip
              key={location}
              label={location}
              variant="outlined"
              sx={{
                fontSize: '1rem',
                py: 2.5,
                px: 1,
                '&:hover': { bgcolor: 'primary.main', color: 'white', borderColor: 'primary.main' },
              }}
            />
          ))}
        </Box>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
            Need Computer Repair Today?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Call us now for fast, professional service
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              fontSize: '1.2rem',
              py: 1.5,
              px: 4,
              '&:hover': { bgcolor: 'grey.100' },
            }}
            startIcon={<PhoneIcon />}
            href="tel:9058924555"
          >
            (905) 892-4555
          </Button>
        </Container>
      </Box>
    </>
  );
}
