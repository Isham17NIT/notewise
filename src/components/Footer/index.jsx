import React from 'react';
import { Box, Container, Typography, IconButton, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#f5f5f5',
        py: 3,
        borderTop: '1px solid #ddd',
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
        <Box>
          <IconButton
            component={Link}
            href="https://github.com/Isham17NIT"
            target="_blank"
            rel="noopener"
            color="inherit"
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            component={Link}
            href="https://www.linkedin.com/in/isham-6b106b325/"
            target="_blank"
            rel="noopener"
            color="inherit"
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            component={Link}
            href="mailto:ishamahuja07@gmail.com"
            color="inherit"
          >
            <EmailIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          © 2025 NoteWise. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
