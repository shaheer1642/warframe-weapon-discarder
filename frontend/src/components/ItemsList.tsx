import { useCallback, useEffect, useMemo, useState } from 'react';
import { Grid2, Typography } from '@mui/material';
import ItemCard from './ItemCard';
import itemsController from '../api/controllers/items.controller';
import { WarframeWeapon } from '../types/weapon.types';
function ItemsList() {
    const [items, setItems] = useState<WarframeWeapon[]>();

    useEffect(() => {
        fetchItems();
    }, [])

    const fetchItems = useCallback(async () => {
        const items = await itemsController.getItems();
        setItems(items);
    }, [])

    if (!items) return <div>Loading...</div>
    if (items.length === 0) return <div>No items found</div>

    return (
        <Grid2 container gap={2} flexDirection={'column'}>
            <Grid2>
                <Typography variant="h5" fontWeight={'bold'}>
                    Item Count: {items.length}
                </Typography>
            </Grid2>
            <Grid2 container gap={2}>
                {items.map((item, i) => (
                    <Grid2 key={i}>
                        <ItemCard item={item} />
                    </Grid2>
                ))}
            </Grid2>
        </Grid2>
    )
}

export default ItemsList
