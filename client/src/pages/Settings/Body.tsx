import "./_settings.scss"
import Text from "../../Components/Text/Text.tsx";
import Switch from "../../Components/Switch/Switch.tsx";
import {useAuthContext} from "../../Context/AuthContext/useAuthContext.tsx";
import {FormEvent, useEffect, useRef, useState} from "react";
import {getLoggedInUser, updateUserSettings} from "../../api/user.tsx";
import Button from "../../Components/Button/Button.tsx";
import {UpdateSettingsDto} from "../../dto/UpdateSettingsDto.tsx";
import {toast} from "react-toastify";

function Body() {
  const emailSwitchRef = useRef<HTMLInputElement>(null)
  const [errorFetchingSettings, setErrorFetchingSettings] = useState(false)

  const {accessToken} = useAuthContext()

  useEffect(() => {
    if (!accessToken) {
      return
    }
    /* Getting the users current settings */
    getLoggedInUser({token: accessToken})
      .then(({allowEmailNotifications}) => {
        console.log(allowEmailNotifications)
        if (emailSwitchRef.current) {


          emailSwitchRef.current.checked = allowEmailNotifications
        }
        console.log(allowEmailNotifications)
      })
      .catch(() => {
        setErrorFetchingSettings(true)
      })
      .finally(() => {

    })
  }, [accessToken]);



  function handleUpdateSettings(e: FormEvent) {
    e.preventDefault();
    const settingsTarget = e.target as HTMLFormElement
    const switchValue = settingsTarget['emailAlertSetting'].checked
    const updateSettingsDto = new UpdateSettingsDto(switchValue)
    updateUserSettings({token: accessToken, updateSettingsDto: updateSettingsDto})
      .then(() => {
        toast("Settings successfully saved")
      })
  }


  if (errorFetchingSettings) {
    return <Text heading bold centered>Error: Something went wrong... Please try again later</Text>
  }

  return <div className="settings-body">
    <div className="settings-body__content">
      <div className="settings-title">
        <Text heading centered>Settings</Text>
      </div>


      <form onSubmit={handleUpdateSettings}>

        <div className="settings__list">
          <div className="settings__item">
            <div className="settings__text">

              <Text subheading>Email Notification</Text>
              <Text>We use emails to provide alerts for when food is about to expire</Text>
            </div>
            <div className="settings__switch">

              <Switch ref={emailSwitchRef} name="emailAlertSetting" small />
            </div>
          </div>
        </div>
        <div className="settings__save">

          <Button centered>Save</Button>
        </div>
      </form>

    </div>
  </div>
}

export default Body