import React from 'react';

import './styles/BadgeEdit.css'
import header from '../images/platziconf-logo.svg'
import BadgeForm from '../components/BadgeForm'
import Badge from '../components/Badge';
import PageLoading from '../components/PageLoading';
import api from '../api';



class BadgeEdit extends React.Component{
  state = {
    loading: true, //Como comenzamos con una peticion es loading es verdader
    error: null, 
    form: {
      firstName: '',
      lastName: '',
      email: '',
      jobTitle: '',
      twitter: '',
  },
};
componentDidMount() {  //Cuando el componentDidMount ocurra buscamos los datos
  this.fetchData()
}

fetchData = async e =>{ //Cuando pedimos datos es una funcion asincrona
  this.setState({ loading: true, error:null }) //Usamos nuestro patron de peticion

  try { // Hacemos esta peticion
    const data = await api.badges.read(this.props.match.params.badgeId) //Cada una de las variables que insertamos en el path que declaramos en la ruta lo podemos acceder con el objeto params

    this.setState({loading: false, form: data}) // Si los datos funcionan los guardamos dentro del form
  } catch (error) {
    this.setState({ loading: false, error: error})
  }
}
                            //Para levantar el estado declaramos un estado vacio y anadimos una propiedad
                             //Que tambien posee un objeto vacio
  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };
  //Manejamos el evento para enviar los datos
  handleSubmit = async  e => {             
    e.preventDefault();
    this.setState({ loading: true, error: null });

    try {
      await api.badges.update(this.props.match.params.badgeId, this.state.form);
      this.setState({ loading: false}); //Solo creamos informacion ya que no la queremos consumir
      this.props.history.push('/badges'); //Redirige al usuario a badges
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };
  
  render(){     
    if (this.state.loading){
      return <PageLoading />
    }  
        return(
            <React.Fragment>    
                <div className="BadgeEdit__hero">
                    <img className="BadEdit__hero-image img-fluid" 
                    src={header} 
                    alt="Logo" 
                    />
                </div>
                <div className="container">
                  <div className="row">
                    <div className="col-6">
                      <Badge
                        firstName={this.state.form.firstName || 'FIRST_NAME'}
                        lastName={this.state.form.lastName || 'LAST_NAME'}
                        twitter={this.state.form.twitter || 'twitter'}
                        jobTitle={this.state.form.jobTitle || 'JOB_TITLE'}
                        email={this.state.form.email || 'EMAIL' }
                        avatarUrl="https://www.gravatar.com/avatar/21594ed15d68ace3965642162f8d2e84?d=identicon"
                      />
                    </div>

                    <div className="col-6">
                      <h1>Edit Attendant</h1>
                      <BadgeForm 
                        onChange={this.handleChange}
                        onSubmit={this.handleSubmit} // Manejamos el submit para enviar los datos 
                        formValues={this.state.form}
                        error={this.state.error}
                      />
                    </div>
                  </div>
                </div>
            </React.Fragment>
        );
    }
}

export default BadgeEdit;