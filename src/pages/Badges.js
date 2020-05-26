import React from 'react';
import { Link } from 'react-router-dom';

import './styles/Badges.css';
import conflogo from '../images/badge-header.svg';
import BadgesList from '../components/BadgesList';
import PageLoading from '../components/PageLoading';
import PageError from '../components/PageError';
import MiniLoader from '../components/MiniLoader';
import api from '../api';



class Badges extends React.Component {
    state = {
        loading: true,      //Ya que lo primero que hace la pagina es cargar los datos 
        error: null,        //El error aun no existe 
        data: undefined,
    };

componentDidMount() {
    this.fetchData(); //Comienza la peticion

    this.intervalId = setInterval(this.fetchData, 5000); //Cada 5 segundos volvera a llamar nuestra peticion fetch
}

componentWillUnmount() { //Limpiamos el intervalo cuando el componente ya no este presente
    clearInterval(this.intervalId)
}

fetchData = async () => {  
    this.setState({ loading: true, error: null }) //Comienza con Loading true y cancelando el error

    try {
        const data = await api.badges.list();
        this.setState({ loading: false, data: data}); // Ya sea que obtengamos datos o error suspendemos el loading
    } catch (error) {
        this.setState({ loading: false, error: error});
    }
}

render() {
    if (this.state.loading === true && !this.state.data) {
        return <PageLoading />;
    }

    if (this.state.error) {
        return <PageError error={this.state.error} />
    }
    return (
        <React.Fragment>
                <div className="Badges">
                    <div className="Badges__hero">
                    <div className="Badges__container">
                        <img className="Badges_conf-logo" 
                        src={conflogo} 
                        alt="Conf Logo"></img>
                    </div>
                    </div>
                </div>

                <div className="Badge__container">
                    <div className="Badges__list">
                        <div className="Badges__container">
                            <div className="Badges__buttons">
                                <Link to="/badges/new" className="btn btn-primary">
                                    New Badge
                                </Link>
                            </div>      
                        <BadgesList badges={this.state.data} />
                        
                        {this.state.loading && <MiniLoader />}
                        </div>
                    </div>

                </div>
        </React.Fragment>
    );
  }
}
export default Badges;