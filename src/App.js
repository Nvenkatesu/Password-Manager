import {Component} from 'react'
import {v4} from 'uuid'
import PasswordItem from './Components/PasswordItem'
import './App.css'

class App extends Component {
  state = {
    passwordsList: [],
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    isShow: false,
    searchInput: '',
    isTrue: false,
  }

  onChangeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  addPassword = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    const backgroundColor = ['color1', 'color2', 'color3', 'color4', 'color5']
    const randomNum = Math.ceil(Math.random() * backgroundColor.length - 1)

    const newPassword = {
      id: v4(),
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
      backgroundClassname: backgroundColor[randomNum],
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
      searchInput: '',
    }))
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onDeletePassword = id => {
    const {passwordsList} = this.state
    const deleteFilterList = passwordsList.filter(each => each.id !== id)
    const caseOf = deleteFilterList.length !== 0
    console.log(caseOf)

    this.setState({passwordsList: deleteFilterList, isTrue: caseOf})
  }

  onchangeCheckbox = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  render() {
    const {websiteInput, usernameInput, passwordInput} = this.state
    const {passwordsList, searchInput, isShow} = this.state
    let {isTrue} = this.state

    const serachFilterdList = passwordsList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (serachFilterdList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="bg-container">
        <div className="content-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
          <div className="top-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="img-sm"
            />
            <form className="form-container" onSubmit={this.addPassword}>
              <h1 className="title">Add New Password</h1>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="website"
                />
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Website"
                  onChange={this.onChangeWebsite}
                  value={websiteInput}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="website"
                />
                <input
                  type="text"
                  className="input"
                  placeholder="Enter Username"
                  onChange={this.onChangeUsername}
                  value={usernameInput}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="website"
                />
                <input
                  type="password"
                  className="input"
                  placeholder="Enter Password"
                  onChange={this.onChangePassword}
                  value={passwordInput}
                />
              </div>
              <button className="button" type="submit" data-testid="delete">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="img-lg"
            />
          </div>
          <div className="bottom-container">
            <div className="bottom-top-container">
              <div className="count-container">
                <h1 className="title1">Your Passwords</h1>
                <p className="count">{serachFilterdList.length}</p>
              </div>

              <div className="search-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="search-icon"
                />
                <input
                  type="search"
                  className="search"
                  placeholder="Search"
                  onChange={this.onChangeSearchInput}
                />
              </div>
            </div>
            <hr className="line" />

            <div className="checkbox-container">
              <input
                type="checkbox"
                className="checkbox"
                onChange={this.onchangeCheckbox}
                id="check"
              />
              <label htmlFor="check" className="show-password">
                Show Passwords
              </label>
            </div>

            {isTrue && (
              <ul className="list-container">
                {serachFilterdList.map(each => (
                  <PasswordItem
                    details={each}
                    key={each.id}
                    onDelete={this.onDeletePassword}
                    istrue={isShow}
                  />
                ))}
              </ul>
            )}
            {!isTrue && (
              <div className="no-passwords-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="no-password-img"
                />
                <p className="no-passwords">No Passwords</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
