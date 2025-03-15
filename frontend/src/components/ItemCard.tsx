import { Card, Grid2, Typography } from "@mui/material";
import Items from "warframe-items";

export default function ItemCard({ item }) {
    return (
        <Grid2 container>
            <Grid2>
                <Typography variant="h6">{item.name}</Typography>
            </Grid2>
        </Grid2>
    )
}
