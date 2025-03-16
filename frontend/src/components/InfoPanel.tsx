import { Grid2, Typography, Paper } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import BuildIcon from '@mui/icons-material/Build';

const InfoPanel = () => (
    <Paper sx={{
        p: 2,
        backgroundColor: 'rgba(30, 30, 35, 0.95)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 2,
        mb: 2
    }}>
        <Grid2 container spacing={2} flexDirection={'column'}>
            <Grid2>
                <Typography variant="h6" sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: 'primary.main',
                    mb: 1
                }}>
                    <InfoIcon /> How Weapon Discarding Works
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                    This tool helps you identify which weapons can be safely discarded after reaching max rank,
                    and which ones you should keep because they're needed to craft other weapons.
                </Typography>
            </Grid2>
            <Grid2 container spacing={2}>
                <Grid2>
                    <Paper sx={{
                        p: 1,
                        backgroundColor: 'success.dark',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        fontSize: '0.9rem'
                    }}>
                        <DeleteIcon sx={{ fontSize: '1.2rem' }} />
                        <Typography variant="body2">
                            <strong>Discardable Weapons</strong> can be safely sold after reaching max rank
                        </Typography>
                    </Paper>
                </Grid2>
                <Grid2>
                    <Paper sx={{
                        p: 1,
                        backgroundColor: 'error.dark',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        fontSize: '0.9rem'
                    }}>
                        <BuildIcon sx={{ fontSize: '1.2rem' }} />
                        <Typography variant="body2">
                            <strong>Required Weapons</strong> are needed as components for crafting other weapons
                        </Typography>
                    </Paper>
                </Grid2>
            </Grid2>
            <Grid2>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Hover over the status badge on each weapon card to see which weapons require it as a crafting component.
                </Typography>
            </Grid2>
        </Grid2>
    </Paper>
);

export default InfoPanel; 