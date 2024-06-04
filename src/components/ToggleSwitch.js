import '../style/ToggleSwitch.css'

const ToggleSwitch = ({ toggleAnswered, setToggleAnswered }) => {
  const handleToggle = () => {
    setToggleAnswered(!toggleAnswered)
  }

  return (
    <div className="toggle-switch" onClick={handleToggle}>
      <div className={`switch ${toggleAnswered ? 'answered' : 'new'}`}>
        <div className="toggle" />
      </div>
      <span>{toggleAnswered ? 'Answered questions' : 'New questions'}</span>
    </div>
  )
}

export default ToggleSwitch
