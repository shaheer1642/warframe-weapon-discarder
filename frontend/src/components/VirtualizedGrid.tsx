import { memo, useRef } from 'react';
import { Box } from '@mui/material';
import { VariableSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import ItemCard from './ItemCard';
import { WarframeWeapon } from '../types/weapon.types';

// Constants for grid layout
const CARD_WIDTH = 350;
const GRID_GAP = 24;
const MIN_ROW_HEIGHT = 700; // Minimum height to accommodate most content

interface VirtualizedGridProps {
    items: WarframeWeapon[];
}

const VirtualizedGrid = memo(({ items }: VirtualizedGridProps) => {
    const listRef = useRef<VariableSizeList>(null);

    const getColumnCount = (width: number) => {
        return Math.max(1, Math.floor((width + GRID_GAP) / (CARD_WIDTH + GRID_GAP)));
    };

    const Row = memo(({ index, style, data }: {
        index: number;
        style: React.CSSProperties;
        data: { items: WarframeWeapon[]; columnCount: number; containerWidth: number };
    }) => {
        const { items, columnCount, containerWidth } = data;
        const startIndex = index * columnCount;
        const rowItems = items.slice(startIndex, startIndex + columnCount);
        const availableWidth = containerWidth - GRID_GAP;
        const cardWidth = Math.min(CARD_WIDTH, (availableWidth - (GRID_GAP * (columnCount - 1))) / columnCount);

        return (
            <div style={{
                ...style,
                display: 'flex',
                gap: GRID_GAP,
                minHeight: MIN_ROW_HEIGHT,
                height: 'auto',
            }}>
                {rowItems.map((item, i) => (
                    <div key={item.uniqueName || i} style={{
                        width: cardWidth,
                        minHeight: MIN_ROW_HEIGHT - GRID_GAP,
                        height: '100%'
                    }}>
                        <ItemCard item={item} />
                    </div>
                ))}
            </div>
        );
    });

    return (
        <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            '& .react-window-list': {
                overflowX: 'hidden !important',
                overflowY: 'auto !important',
                '::-webkit-scrollbar': {
                    width: '8px',
                },
                '::-webkit-scrollbar-track': {
                    background: 'rgba(0, 0, 0, 0.1)',
                },
                '::-webkit-scrollbar-thumb': {
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '4px',
                    '&:hover': {
                        background: 'rgba(255, 255, 255, 0.3)',
                    },
                },
            }
        }}>
            <AutoSizer>
                {({ height, width }: { height: number; width: number; }) => {
                    const columnCount = getColumnCount(width);
                    const rowCount = Math.ceil(items.length / columnCount);

                    return (
                        <VariableSizeList
                            ref={listRef}
                            className="react-window-list"
                            height={height}
                            width={width}
                            itemCount={rowCount}
                            itemSize={() => MIN_ROW_HEIGHT}
                            itemData={{ items, columnCount, containerWidth: width }}
                            overscanCount={2}
                        >
                            {Row}
                        </VariableSizeList>
                    );
                }}
            </AutoSizer>
        </Box>
    );
});

export default VirtualizedGrid; 