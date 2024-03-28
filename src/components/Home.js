import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { DataContext } from './auth/ContextProvider';

const Home = ({ featuredProducts }) => {
  const {userData}=useContext(DataContext)
  const isLoggedIn = userData&&Object.keys(userData).length > 0;
  return (

    <div className='home-container'>
      <section className='home-body'>
        <div>
          <h1>Welcome to Our Store</h1>
          <p style={{fontWeight:'bold'}}>Discover amazing deals on your favorite products</p>
         { !isLoggedIn&&<Link to="/login" className="shop-now">
              <span>Shop Now</span>
            </Link>}
        </div>
      </section>
    </div>
  );
};

export default Home;
