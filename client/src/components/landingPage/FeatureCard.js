import { Card, CardContent, CardMedia, Typography } from "@mui/material"
export default function FeatureCard(props){
    return(
        <Card /*sx={{width: .25, height: 1}}*/ className="featureCard">
            <CardMedia image="" title="" sx={{height: 1, width: 1, border: 2}}/>
            <CardContent>
                <Typography variant="body1">
                    {props.description}
                </Typography>
            </CardContent>
        </Card>
    )
}

