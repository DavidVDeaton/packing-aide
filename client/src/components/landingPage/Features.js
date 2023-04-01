import FeatureCard from "./FeatureCard";

export default function Features(){
    return(
        <div id="featuresContent">
            <h3 id="featuresTitle">Features</h3>
            <div id="featureCards">
                <FeatureCard image={"../../images/boxes.png"} description={"feature one"}/>
                <FeatureCard image={"../../images/boxes.png"} description={"feature two"}/>
                <FeatureCard image={"../../images/boxes.png"} description={"feature three"}/>
            </div>
        </div>
    )
}