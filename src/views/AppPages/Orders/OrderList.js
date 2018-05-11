import React, { Component } from 'react';

class OrderList extends Component {
  constructor(props){
    super(props);
    this.state = {
      'dealerId': null
    }
  }

  componentDidMount(){
    this.props.auth.getProfile((error,user)=>{
      if(user["http://localhost:3013/user_metadata"].dealerIds){
        this.setState({
          'dealerIds': user["http://localhost:3013/user_metadata"].dealerIds
        });
      }
    });
  }
  render(){
    return (
      <div>
        <div>
          This is the OrderList component
        </div>
        <div>

        </div>
      </div>
    )
  }
}

export default OrderList;
