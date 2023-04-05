import { Card, CardContent, CardMedia, Typography } from "@mui/material"
export default function FeatureCard(props){
    return(
        <Card className="featureCard">
            <CardMedia image="" titles="" sx={{height: 1, width: 1, border: 2}} />
           <CardContent>
                <Typography variant="body1">
                    {props.description}
                </Typography>
           </CardContent>
        </Card>
    )
}

// <img src={props.image} class="featureImage"/>
// <p class="featureDescription">{props.description}</p>