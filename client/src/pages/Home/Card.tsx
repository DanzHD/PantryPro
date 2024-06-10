import "./_card.scss"
import Text from "../../Components/Text/Text.tsx";

function Card({
  image,
  alt,
  descriptionHeading,
  descriptionText
}: {
  image: string,
  alt: string,
  descriptionHeading: string,
  descriptionText: string

}) {

  return (
    <>
      <div className="card">
        <div className="card__image">
          <img alt={alt} src={image}/>
        </div>
        <div className="card__description">

          <Text subheading>{descriptionHeading}</Text>
          <Text>{descriptionText}</Text>
        </div>
      </div>
    </>
  )
}

export default Card