import { Box, AppBar, Toolbar, Typography, Container, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import PatreonIcon from '../assets/patreon.svg';

const Footer = styled('footer')(({ theme }) => ({
    padding: theme.spacing(2),
    backgroundColor: 'rgba(30, 30, 35, 0.95)',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing(2),
    flexShrink: 0,
    '& a': {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        }
    }
}));

const Header = styled(AppBar)(({ theme }) => ({
    backgroundColor: 'rgba(30, 30, 35, 0.95)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: 'none',
    flexShrink: 0
}));

interface HomeLayoutProps {
    children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
    return (
        <Box sx={{
            minHeight: '100vh',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: 'background.default',
            overflow: 'hidden'
        }}>
            <Header position="static">
                <Toolbar>
                    <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
                        Warframe Weapons Discarder
                    </Typography>
                </Toolbar>
            </Header>

            <Container maxWidth={false} sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0,
                overflow: 'hidden',
                py: 3
            }}>
                {children}
            </Container>

            <Footer>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                        Contact:
                        <Link href="https://discord.com/users/your_discord_id" target="_blank" sx={{ ml: 1 }}>
                            @mrsofty (Discord)
                        </Link>
                        {' | '}
                        <Link href="mailto:shaheer1642@gmail.com">
                            shaheer1642@gmail.com
                        </Link>
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Link
                        href="https://www.patreon.com/mrsofty"
                        target="_blank"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            color: '#FF424D'
                        }}
                    >
                        <img src={PatreonIcon} alt="Patreon" style={{ height: 20 }} />
                        <Typography variant="body2">
                            Support on Patreon
                        </Typography>
                    </Link>
                    <Typography variant="body2" color="text.secondary">
                        |
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Affiliated with{' '}
                        <Link href="https://discord.gg/yJTJa5jjaK" target="_blank">
                            Warframe Squads
                        </Link>
                    </Typography>
                </Box>
            </Footer>
        </Box>
    );
} 