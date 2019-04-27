import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { itemsFetchData } from '../actions/items';
import './App.css';
import logo from './logo.svg';

class App extends Component {
    componentDidMount() {
        this.props.fetchData('https://api.myjson.com/bins/vqyfg');
    }

    render() {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading </p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }

        return (
            <div className="App"> 
             <header className="App-header">
                 <img src={logo} className="App-logo" alt="logo" />
                 <span><b id="title_">StackLine</b></span>
            </header>
                
                    
                        <div className="ProductPane">
                            <div className="ProductInfo">
                              <img src={this.props.items[0].image} className="P-img" alt="sharkninja" />
                              <h3 className="P-name">{this.props.items[0].title}</h3>
                              <p className="P-desc">{this.props.items[0].subtitle}</p>
                            </div>
                            <div className="ProductTags">
                              <ul>
                              {this.props.items[0].tags.map((tag) => (
                                <li>{tag}</li>
                                
                                ))}
                              </ul>

                            </div>
                            <div className="cols">
                              <ul>
                                <li>Overview</li>
                                <li>Sales</li>
                              </ul>
                            </div>
                          </div>
                       
                        <div className="ProductAnalytics">
                            <div className="ProductsSalesChart">
                            </div>
                            <div className="ProductSalesStats">
                                <table>
                                    <tr>
                                      <th>
                                      Week Ending
                                      </th>
                                      <th>
                                      Retail Sales
                                      </th>
                                      <th>
                                      Wholesale Sales
                                      </th>
                                      <th>
                                      Units sold
                                      </th>
                                      <th>
                                      Retailer Margin
                                      </th>
                                    </tr>
                                     
                                      
                                    <tbody id="tbody">
                                       {this.props.items[0].sales.map((sales) => (
                                             <tr>
                                               <td> {sales.weekEnding}</td>
                                               <td>{sales.retailSales}</td>
                                               <td>{sales.wholesaleSales}</td>
                                               <td>{sales.unitsSold}</td>
                                               <td>{sales.retailerMargin}</td>
                                              </tr>
                                             
                                              
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>


        




                
            </div>
        );
    }
}

App.propTypes = {
    fetchData: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        items: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
