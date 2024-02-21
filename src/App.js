import React, {useEffect, useState} from 'react';
import Country from './components/Country';
import NewCountry from './components/NewCountry';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';
import NotifContainer from "./components/Notif/NotifContainer";
import axios from "axios";

function App() {
    const endpoint = "https://jeffdziad-olympic-medals-api.azurewebsites.net/api/country"
    const [countries, setCountries] = useState([
        { id: 1, name: 'United States', gold: 2, silver: 2, bronze: 3 },
        { id: 2, name: 'China', gold: 3, silver: 1, bronze: 0 },
        { id: 3, name: 'Germany', gold: 0, silver: 2, bronze: 2 },
    ]);
    const [medals] = useState([
        { id: 1, name: 'gold' },
        { id: 2, name: 'silver' },
        { id: 3, name: 'bronze' },
    ]);
    const [notifId, setNotifId] = useState(0);
    const [notifications, setNotifications] = useState([]);

    const createNotification = (title, message) => {
        setNotifications(prevState => [...prevState, {id: notifId, title: title, message: message}])
        setNotifId(prevState => prevState+1);
    }

    // this is the functional equivalent to componentDidMount
    useEffect(() => {
        // initial data loaded here
        async function fetchCountries() {
            const { data : fetchedCountries } = await axios.get(endpoint);
            // we need to save the original medal count values in state
            let newCountries = [];
            fetchedCountries.forEach(country => {
                let newCountry = {
                    id: country.id,
                    name: country.name,
                };
                medals.current.forEach(medal => {
                    const count = country[medal.name];
                    // page_value is what is displayed on the web page
                    // saved_value is what is saved to the database
                    newCountry[medal.name] = { page_value: count, saved_value: count };
                });
                newCountries.push(newCountry);
            });
            setCountries(newCountries);
        }
        fetchCountries();
    }, []);

    const handleAdd = async (name) => {
        const { data: post } = await axios.post(endpoint, { name: name });
        let newCountry = {
            id: post.id,
            name: post.name,
        };
        medals.current.forEach(medal => {
            const count = post[medal.name];
            // when a new country is added, we need to store page and saved values for
            // medal counts in state
            newCountry[medal.name] = { page_value: count, saved_value: count };
        });
        setCountries(countries.concat(newCountry));
        console.log('ADD');
    }
    const handleDelete = async (countryId) => {
        const originalCountries = countries;
        setCountries(countries.filter(c => c.id !== countryId));
        try {
            await axios.delete(`${endpoint}/${countryId}`);
        } catch (ex) {
            if (ex.response && ex.response.status === 404) {
                // country already deleted
                console.log("The record does not exist - it may have already been deleted");
            } else {
                alert('An error occurred while deleting');
                setCountries(originalCountries);
            }
        }
    }

    const handleSave = async (countryId) => {
        const originalCountries = countries;

        const idx = countries.findIndex(c => c.id === countryId);
        const mutableCountries = [ ...countries ];
        const country = mutableCountries[idx];
        let jsonPatch = [];
        medals.current.forEach(medal => {
            if (country[medal.name].page_value !== country[medal.name].saved_value) {
                jsonPatch.push({ op: "replace", path: medal.name, value: country[medal.name].page_value });
                country[medal.name].saved_value = country[medal.name].page_value;
            }
        });
        console.log(`json patch for id: ${countryId}: ${JSON.stringify(jsonPatch)}`);
        // update state
        setCountries(mutableCountries);

        try {
            await axios.patch(`${endpoint}/${countryId}`, jsonPatch);
        } catch (ex) {
            if (ex.response && ex.response.status === 404) {
                // country already deleted
                console.log("The record does not exist - it may have already been deleted");
            } else {
                alert('An error occurred while updating');
                setCountries(originalCountries);
            }
        }
    }
    const handleReset = (countryId) => {
        // to reset, make page value the same as the saved value
        const idx = countries.findIndex(c => c.id === countryId);
        const mutableCountries = [ ...countries ];
        const country = mutableCountries[idx];
        medals.current.forEach(medal => {
            country[medal.name].page_value = country[medal.name].saved_value;
        });
        setCountries(mutableCountries);
    }
    const handleIncrement = (countryId, medalName) => handleUpdate(countryId, medalName, 1);
    const handleDecrement = (countryId, medalName) => handleUpdate(countryId, medalName, -1);
    const handleUpdate = (countryId, medalName, factor) => {
        const idx = countries.findIndex(c => c.id === countryId);
        const mutableCountries = [...countries ];
        mutableCountries[idx][medalName].page_value += (1 * factor);
        setCountries(mutableCountries);
    }

    const getAllMedalsTotal = () => {
        let sum = 0;
        // use medal count displayed in the web page for medal count totals
        medals.current.forEach(medal => { sum += countries.reduce((a, b) => a + b[medal.name].page_value, 0); });
        return sum;
    }

    return (
        <React.Fragment>
            <NotifContainer notifications={notifications}/>
            <Navbar className="navbar-dark bg-dark">
                <Container fluid>
                    <Navbar.Brand>
                        Olympic Medals
                        <Badge className="ms-2" bg="light" text="dark" pill>{ getAllMedalsTotal() }</Badge>
                    </Navbar.Brand>
                    <NewCountry onAdd={ handleAdd } />
                </Container>
            </Navbar>
            <Container fluid>
                <Row className="justify-content-around">
                    { countries.map(country =>
                        <Col xs={12} md={4} key={ country.id } className="p-3 d-flex align-items-center justify-content-center">
                            <Country
                                className="content"
                                country={ country }
                                medals={ medals }
                                onDelete={ handleDelete }
                                onSave={handleSave}
                                onReset={handleReset}
                                onIncrement={ handleIncrement }
                                onDecrement={ handleDecrement } />
                        </Col>
                    )}
                </Row>
            </Container>
        </React.Fragment>
    );
}

export default App;