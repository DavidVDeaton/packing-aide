export default function FeatureCard(props){
    return(
        <div class="featureCard">
            <img src={props.image} class="featureImage"/>
            <p class="featureDescription">{props.description}</p>
        </div>
    )
}