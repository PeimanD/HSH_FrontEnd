import React from 'react';

const ApplicationContext = React.createContext();
class ApplicationProvider extends React.Component {
    state = {
        activeThermo: 0,
        thermostats: [{
            masterDevId: "fakeMId",
            thermostatId: "fakeTId",
            schedule: [],
            status: true,
            mode: "yourmother",
            authedUsers: []
        }],
        currentUser : ""
    }

    updateUser = userId => {
        this.setState(
            {currentUser : userId}
        );
    }

    render() {
        return (
            <ApplicationContext.Provider value={{...this.state, updateUser}}>
                {this.props.children}
            </ApplicationContext.Provider>
        )
    }
}

const ApplicationConsumer = ApplicationContext.Consumer;
export { ApplicationConsumer, ApplicationProvider }
