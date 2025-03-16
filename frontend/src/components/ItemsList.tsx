import { useCallback, useEffect, useMemo, useState } from 'react';
import { Grid2, Typography, TextField, InputAdornment, Tooltip, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import VirtualizedGrid from './VirtualizedGrid';
import InfoPanel from './InfoPanel';
import itemsController from '../api/controllers/items.controller';
import { WarframeWeapon } from '../types/weapon.types';

function ItemsList() {
    const [items, setItems] = useState<WarframeWeapon[]>();
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    const [showInfo, setShowInfo] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = useCallback(async () => {
        const items = await itemsController.getItems();
        setItems(items);
    }, []);

    const filteredItems = useMemo(() => {
        if (!items) return [];
        if (!debouncedQuery.trim()) return items;

        const query = debouncedQuery.toLowerCase().trim();
        return items.filter(item =>
            item.name.toLowerCase().includes(query)
        );
    }, [items, debouncedQuery]);

    if (!items) return <div>Loading...</div>;

    return (
        <Grid2 container sx={{
            height: '100%',
            flexDirection: 'column',
            gap: 2,
            overflow: 'hidden'
        }}>
            {showInfo && <InfoPanel />}

            <Grid2 container sx={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flexShrink: 0,
                gap: 2
            }}>
                <Grid2 container alignItems="center" spacing={2}>
                    <Grid2>
                        <TextField
                            size='small'
                            placeholder="Search weapons..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            sx={{
                                width: '300px',
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                    },
                                    '& fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.1)',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.2)',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'primary.main',
                                    },
                                },
                                '& input': {
                                    color: 'white',
                                },
                            }}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    </Grid2>
                    <Grid2>
                        <Tooltip title={showInfo ? "Hide info" : "Show info"}>
                            <IconButton
                                onClick={() => setShowInfo(!showInfo)}
                                sx={{ color: 'primary.main' }}
                            >
                                <InfoIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid2>
                </Grid2>
                <Grid2>
                    <Typography fontWeight={'bold'}>
                        Item Count: {filteredItems.length}
                    </Typography>
                </Grid2>
            </Grid2>

            <Grid2 sx={{
                flexGrow: 1,
                minHeight: 0,
                position: 'relative',
                overflow: 'hidden'
            }}>
                {filteredItems.length === 0 ? (
                    <Grid2 container justifyContent="center" sx={{ py: 4 }}>
                        <Typography variant="h6" color="text.secondary">
                            No weapons found matching "{searchQuery}"
                        </Typography>
                    </Grid2>
                ) : (
                    <VirtualizedGrid items={filteredItems} />
                )}
            </Grid2>
        </Grid2>
    );
}

export default ItemsList;
