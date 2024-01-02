import { Head } from "@inertiajs/react";
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
} from "@mui/material";

export default function OwnRecommendationList(props) {
    console.log(props.recommends);
    const imgPath = "../img/icons/" + props.profile.icon;

    return (
        <div>
            <div className="ml-10 h-screen w-1/4 flex items-center">
                <Card sx={{ maxWidth: 200 }}>
                    <CardMedia
                        sx={{ height: 140 }}
                        image={imgPath}
                        title="user icon"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {props.profile.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {props.profile.text}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
