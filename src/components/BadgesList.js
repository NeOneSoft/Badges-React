import React from 'react';

import { Link } from 'react-router-dom';

import './styles/BadgesList.css';
import Gravatar from './Gravatar';

/*
class BadgesList extends React.Component{
    render(){
        if(this.props.badges.length === 0){
            return (
                <div>
                    <h3>No badges were found</h3>
                    <Link className="btn btn-primary" to="/badges/new">
                        Creat new badge
                    </Link>
                </div>
            )
        }
        return (
            < ul className="list-unstyled">
                {this.props.badges.map((badge) => {
                     return(
                        <li key={badge.id}>
                            <div className="card mb-3 w-100">
                                <div className="row no-gutters">
                                    <div className="col-md-4">
                                    <img src={badge.avatarUrl} className="Badge__avatar" alt="Avatar" />
                                    <Gravatar
                                        className="Badge__avatar"
                                        //src={this.props.badge.avatarUrl}
                                        email={this.props.badge.email}
                                        alt={`${this.props.badge.firstName} ${this.props.badge.lastName}`}
                                    />
                                    
                                    </div>
                                    <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{badge.firstName} {badge.lastName}</h5>
                                        <p className="card-text"><i className="fab fa-twitter">@</i>{badge.twitter}</p>
                                        <p className="card-text"><small className="text-muted">{badge.jobTitle}</small></p>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </ul>        
        );
    }
}

export default BadgesList;
*/

class BadgesListItem extends React.Component {
    render() {
      return (
        <div className="BadgesListItem">
          <Gravatar
            className="Badge__avatar"
            //src={this.props.badge.avatarUrl}
            email={this.props.badge.email}
            alt={`${this.props.badge.firstName} ${this.props.badge.lastName}`}
          />
          <div>
            <div className="card-body">
                <h5 className="card-title">{this.props.badge.firstName} {this.props.badge.lastName}</h5>
                <p className="card-text"><i className="fab fa-twitter">@</i>{this.props.badge.twitter}</p>
                <p className="card-text"><small className="text-muted">{this.props.badge.jobTitle}</small></p>
            </div>
          </div>
        </div>
      );
    }
  }
  
  function useSearchBadges(badges){
    const [ query, setQuery] = React.useState('');
      const [ filteredBadges, setFilteredBadges ] = React.useState(badges)
  
      React.useMemo(() => {
        const result = badges.filter(badge => {
        return `${badge.firstName} ${badge.lastName}`
        .toLowerCase()
        .includes(query.toLowerCase());
      });
  
      setFilteredBadges(result)
    }, [ badges, query ]);
  
    return {query, setQuery, filteredBadges}
  }
  
  function BadgesList (props) {
      const badges = props.badges;
  
      const { query, setQuery, filteredBadges } = useSearchBadges(badges);
  
      if (filteredBadges.length === 0){
        return( 
          <div>
            <div className="form-group">
            <label>Filter Badges</label>
            <input type="text" className="form-control" 
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
              }}
            />
          </div>
            <h3>No badges were found</h3>
            <Link className="btn-btn-primary" to="badges/new">
              Create new badge
            </Link>
          </div>
        )
      }
      return (
        <div className="BadgesList">
          <div className="form-group">
            <label>Filter Badges</label>
            <input type="text" className="form-control" 
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
              }}
            />
          </div>
          <ul className="list-unstyled">
            {filteredBadges.map(badge => {
              return (
                <li key={badge.id}>
                  <Link className="text-reset text-decoration-none" 
                  to={`/badges/${badge.id}`}
                  >
                  <BadgesListItem badge={badge} />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      );
  }
  
  export default BadgesList; 