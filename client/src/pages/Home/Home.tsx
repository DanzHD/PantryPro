import Header from "./Header.tsx";
import "../Home/_home.scss"
import "../../styles/_index.scss"
import Text from "../../Components/Text/Text.tsx";
import Button from "../../Components/Button/Button.tsx";
import Card from "./Card.tsx";

/**
 *
 * The landing page of the web app
 */
function Home() {

  return (
    <>
      <div className="home">

        <Header sticky />
        <section className="home__intro">


          <Text centered heading>Your All-In-One Advanced Food Tracking Application</Text>
          <Text styles={{color: "white"}} centered >A food tracking application to reduce food wastage, leveraging AI
            technologies for smart food tracking and meal creation
          </Text>

          <Button>Get Started</Button>

        </section>

        <section className="home__features">
          <div className="heading">

            <Text heading>Features</Text>
          </div>
          <span className="cards">

            <Card
              image="image"
              alt="Recipe creation"
              descriptionHeading="Recipe Creation"
              descriptionText="Automatically generates recipes with available ingredients"
            />
            <Card
              image="image"
              alt="Food Tracking"
              descriptionHeading="Food Tracking"
              descriptionText= "Automatically track your available foods with computer vision technologies"
            />
            <Card
              image="image"
              alt="Alert"
              descriptionHeading="Expiry Alerts"
              descriptionText="Receive alerts when your food is about to expire"
            />
          </span>
        </section>

      </div>


    </>
  )

}

export default Home
