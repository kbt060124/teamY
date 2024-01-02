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
        <div className="flex">
            <div className="ml-24 h-screen w-1/4 flex items-center">
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
            <div className="h-screen w-2/4 flex justify-end items-center">
                <div>
                    {props.recommends.map((item) => (
                        <div className="my-5 flex items-center" key={item.id}>
                            {item.icon ? (
                                <img
                                    style={{ maxWidth: 200, height: 140 }}
                                    src={`../img/icons/${item.icon}`}
                                    alt=""
                                />
                            ) : (
                                <img
                                    style={{ maxWidth: 200, height: 140 }}
                                    src={`../img/icons/${item.guest_icon}`}
                                    alt=""
                                />
                            )}
                            <div>
                                {item.name ? (
                                    <div>{item.name}</div>
                                ) : (
                                    <div>{item.guest_name}</div>
                                )}
                                <div>{item.text}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
