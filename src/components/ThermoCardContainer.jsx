import axios from "axios";
import React, { Component } from 'react';
import ThermoCard from "./ThermoCard.jsx";

class ThermoCardContainer extends Component {
    state = {
        user: null
    };

    async componentWillMount() {
        //set host as enviornment variable
        let host = "http://localhost:3000";
        const { data } = await axios.get(host + "/api/users/me");
        //format data

        this.setState({ user: data.user });
    };

    render() {
        let thermostatLinks = () => {
            return (
                <div>
                    <ThermoCard />
                    <ThermoCard />
                    <ThermoCard />
                    <ThermoCard />
                </div>
            );
        }

        return (
            <div>

            </div>
        );
    }
}

export default ThermoCardContainer;