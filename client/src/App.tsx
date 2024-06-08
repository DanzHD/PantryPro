import "./styles/_index.scss"
import Text from "./Components/Text/Text.tsx";
import Button from "./Components/Button/Button.tsx";

function App() {

  return (
      <>
        <Text italicize bold danger heading centered>Hello World</Text>
        <div style={{display: "flex", justifyContent: "center", alignContent: 'center'}}>

          <Button> Button </Button>
        </div>
      </>
  )


}

export default App
