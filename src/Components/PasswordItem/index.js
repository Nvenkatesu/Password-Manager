import './index.css'

const PasswordItem = props => {
  const {details, onDelete, istrue} = props
  const {id, website, username, password, backgroundClassname} = details
  const initial = website[0].toUpperCase()
  const deleteItem = () => {
    onDelete(id)
  }

  return (
    <li className="list-item">
      <div className="details">
        <div className={`initial ${backgroundClassname}`}>
          <p className="initial-name">{initial}</p>
        </div>
        <div className="details-container">
          <p className="website-title">{website}</p>
          <p className="username">{username}</p>
          {!istrue && (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="stars"
            />
          )}
          {istrue && <p className="password">{password}</p>}
        </div>
      </div>

      <button type="button" className="delete-button" onClick={deleteItem}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default PasswordItem
