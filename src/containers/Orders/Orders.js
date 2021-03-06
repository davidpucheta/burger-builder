import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then((res)=>{
                const fetchedOrders = [];
                for (const key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
            
                this.setState({ orders: fetchedOrders, loading: false });
            })
            .catch((err)=>{
                this.setState({ loading: false });
                console.log(err);
            });
    }

    render(){
        return (
            <div>
                {this.state.orders.map(
                    (ord) => (
                        <Order 
                            key={ord.id}
                            ingredients={ord.ingredients}
                            price={ord.price}
                        />
                    )
                )}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);