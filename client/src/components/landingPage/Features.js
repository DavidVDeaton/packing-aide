import FeatureCard from "./FeatureCard";

export default function Features(){
    return(
        <div id="featuresContent">
            <h3 className="section-heading center-align">Features</h3>
            <div className="three-column-even">
                <div className="step1">
                    <FeatureCard image={"../../images/boxes.png"} description={"feature one"}/>
                </div>
                <div className="step2">
                    <FeatureCard image={"../../images/boxes.png"} description={"feature two"}/>
                </div>
                <div className="step3">
                    <FeatureCard image={"../../images/boxes.png"} description={"feature three"}/>
                </div>
            </div>
        </div>
    )
}