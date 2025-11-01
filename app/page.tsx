import { Box, Container, Typography, Button } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import ComputerIcon from '@mui/icons-material/Computer';

export default function Home() {
  return (
    <main>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center" color="white">
            <ComputerIcon sx={{ fontSize: 80, mb: 2 }} />
            <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
              St. Catharines Computer Repair
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
              Expert Laptop & PC Service in the Niagara Region
            </Typography>
            <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap">
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  '&:hover': { bgcolor: 'grey.100' },
                }}
                startIcon={<PhoneIcon />}
              >
                Call Now
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': { borderColor: 'grey.100', bgcolor: 'rgba(255,255,255,0.1)' },
                }}
              >
                Our Services
              </Button>
            </Box>
            <Typography variant="body1" sx={{ mt: 4, opacity: 0.8 }}>
              🚀 Site under development - Coming Soon!
            </Typography>
          </Box>
        </Container>
      </Box>
    </main>
  );
}
