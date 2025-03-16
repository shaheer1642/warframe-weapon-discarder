import {
    Card,
    CardContent,
    CardMedia,
    Chip,
    Grid,
    Typography,
    Box,
    Tooltip,
    LinearProgress,
    Divider
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import { WarframeWeapon } from "../types/weapon.types";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(() => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(30, 30, 35, 0.95)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    overflow: 'hidden',
    '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
    }
}));

const StyledCardContent = styled(CardContent)({
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
    overflowY: 'auto',
    '&:last-child': {
        paddingBottom: '16px'
    },
    '::-webkit-scrollbar': {
        width: '6px',
    },
    '::-webkit-scrollbar-track': {
        background: 'rgba(0, 0, 0, 0.1)',
    },
    '::-webkit-scrollbar-thumb': {
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '3px',
        '&:hover': {
            background: 'rgba(255, 255, 255, 0.3)',
        },
    }
});

const StatBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(0.5)
}));

const StatLabel = styled(Typography)(({ theme }) => ({
    color: theme.palette.grey[400],
    minWidth: 120
}));

const StatValue = styled(Typography)(({ theme }) => ({
    color: theme.palette.common.white,
    fontWeight: 500
}));

const DamageChip = styled(Chip)(({ theme }) => ({
    margin: theme.spacing(0.5),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: theme.palette.common.white
}));

export default function ItemCard({ item }: { item: WarframeWeapon }) {
    const calculateDamagePercentage = (damageType: string) => {
        if (!item.damage || !item.damage.total) return 0;
        const damageValue = item.damage[damageType as keyof typeof item.damage] || 0;
        return (damageValue / item.damage.total) * 100;
    };

    const getDamageTypes = () => {
        if (!item.damage) return [];

        return Object.entries(item.damage)
            .filter(([type, value]) => value > 0 && type !== 'total')
            .map(([type, value]) => ({
                type: type.charAt(0).toUpperCase() + type.slice(1),
                value
            }));
    };

    const damageTypes = getDamageTypes();

    return (
        <StyledCard>
            <CardMedia
                component="img"
                height="180"
                image={item.wikiaThumbnail || ''}
                alt={item.name}
                sx={{ objectFit: 'contain', backgroundColor: 'rgba(0, 0, 0, 0.6)', p: 2 }}
            />
            <StyledCardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold', wordBreak: 'break-word', mr: 1 }}>
                        {item.name}
                    </Typography>
                    <Tooltip title={item.isDiscardable ?
                        "Safe to discard" :
                        `Required for: ${item.requiredForWeapons?.join(', ')}`
                    }>
                        <Chip
                            icon={item.isDiscardable ? <DeleteIcon /> : <LockIcon />}
                            label={item.isDiscardable ? "Discardable" : "Required"}
                            color={item.isDiscardable ? "success" : "error"}
                            size="small"
                            sx={{ flexShrink: 0 }}
                        />
                    </Tooltip>
                </Box>

                <Typography variant="body2" color="grey.400" sx={{ mb: 2 }}>
                    {item.description}
                </Typography>

                <Divider sx={{ my: 2, backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />

                <Grid container spacing={2} sx={{ mt: 'auto' }}>
                    <Grid item xs={12}>
                        <StatBox>
                            <StatLabel variant="body2">Mastery Rank:</StatLabel>
                            <StatValue variant="body2">{item.masteryReq || 0}</StatValue>
                        </StatBox>
                        <StatBox>
                            <StatLabel variant="body2">Fire Rate:</StatLabel>
                            <StatValue variant="body2">{(item.fireRate || 0).toFixed(1)}/sec</StatValue>
                        </StatBox>
                        <StatBox>
                            <StatLabel variant="body2">Critical Chance:</StatLabel>
                            <StatValue variant="body2">{((item.criticalChance || 0) * 100).toFixed(1)}%</StatValue>
                        </StatBox>
                        <StatBox>
                            <StatLabel variant="body2">Critical Multiplier:</StatLabel>
                            <StatValue variant="body2">{(item.criticalMultiplier || 1).toFixed(1)}x</StatValue>
                        </StatBox>
                        <StatBox>
                            <StatLabel variant="body2">Status Chance:</StatLabel>
                            <StatValue variant="body2">{((item.procChance || 0) * 100).toFixed(1)}%</StatValue>
                        </StatBox>
                    </Grid>

                    {damageTypes.length > 0 && (
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" sx={{ color: 'grey.400', mb: 1 }}>
                                Damage Distribution:
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {damageTypes.map(({ type, value }) => (
                                    <Tooltip
                                        key={type}
                                        title={
                                            <Box>
                                                <Typography variant="body2">{type}</Typography>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={calculateDamagePercentage(type.toLowerCase())}
                                                    sx={{ mt: 1 }}
                                                />
                                                <Typography variant="caption">
                                                    {value.toFixed(1)} ({calculateDamagePercentage(type.toLowerCase()).toFixed(1)}%)
                                                </Typography>
                                            </Box>
                                        }
                                    >
                                        <DamageChip
                                            label={`${type}: ${value.toFixed(1)}`}
                                            size="small"
                                        />
                                    </Tooltip>
                                ))}
                            </Box>
                        </Grid>
                    )}

                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                            {item.type && (
                                <Chip
                                    label={item.type}
                                    size="small"
                                    sx={{ backgroundColor: 'primary.main' }}
                                />
                            )}
                            {item.noise && (
                                <Chip
                                    label={item.noise}
                                    size="small"
                                    sx={{ backgroundColor: 'error.main' }}
                                />
                            )}
                            {item.isPrime && (
                                <Chip
                                    label="Prime"
                                    size="small"
                                    sx={{ backgroundColor: 'warning.main' }}
                                />
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </StyledCardContent>
        </StyledCard>
    );
}
