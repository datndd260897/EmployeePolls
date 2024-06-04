import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/authedUser';
import './Header.css';

const Header = (prop) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    prop.dispatch(logout());
    navigate('/');
  };

  return (
    <header className="header-container">
      <div className="user-section">
        <img
          src={prop.authedUser.avatarURL}
          alt="User Avatar"
          className="user-avatar"
        />
        <span className="username">{prop.authedUser.name}</span>
        {prop.authedUser.id ? (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className="login-button" onClick={() => navigate('/login')}>
            UserLogin
          </button>
        )}
      </div>
    </header>
  );
};

export default connect((state) => ({
  authedUser: state.authedUser,
}))(Header);
