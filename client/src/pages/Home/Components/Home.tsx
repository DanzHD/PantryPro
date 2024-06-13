import Header from "./Header.tsx";
import "../Styles/_home.scss"
import "../../../styles/_index.scss"
import Text from "../../../Components/Text/Text.tsx";
import Button from "../../../Components/Button/Button.tsx";
import Card from "./Card.tsx";
import Footer from "./Footer.tsx";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {loginRoute} from "../../../App.tsx";



/**
 *
 * The landing page of the web app
 */
function Home() {

  const navigate: NavigateFunction = useNavigate()

  return (
    <>
      <div className="home">

        <Header sticky />
        <section className="home__intro">


          <Text styles={{fontSize: '40px'}} centered heading >Your All-In-One Advanced Food Tracking Application</Text>
          <Text styles={{color: "white", fontSize: '26px'}} centered >A food tracking application to reduce food wastage, leveraging AI
            technologies for smart food tracking and meal creation
          </Text>

          <Button onClick={() => navigate(loginRoute)}>Get Started</Button>

        </section>

        <section className="home__features">
          <div className="heading">

            <Text styles={{fontSize: '40px'}} heading>Features</Text>
          </div>
          <span className="cards">

            <Card
              image="https://plus.unsplash.com/premium_photo-1670963025556-c2d4dc880a45?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Recipe creation"
              descriptionHeading="Recipe Creation"
              descriptionText="Automatically generates recipes with available ingredients"
            />
            <Card
              image="https://plus.unsplash.com/premium_photo-1661317288946-157b70e2edab?q=80&w=2081&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Food Tracking"
              descriptionHeading="Food Tracking"
              descriptionText= "Automatically track your available foods with computer vision technologies"
            />
            <Card
              image="https://plus.unsplash.com/premium_photo-1679086008007-dded8f7d26a5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Alert"
              descriptionHeading="Expiry Alerts"
              descriptionText="Receive alerts when your food is about to expire"
            />
          </span>
        </section>


        <Footer />

      </div>



    </>
  )

}

export default Home
