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
import {queries} from "@testing-library/react";
import country from "./components/Country";

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

    useEffect( () => {
        async function grabCountries() {
            const res = await fetch(endpoint);
            const c = await res.json();
            setCountries(c);
        }
        grabCountries();
    }, []);

    const createNotification = (title, message) => {
        setNotifications(prevState => [...prevState, {id: notifId, title: title, message: message}])
        setNotifId(prevState => prevState+1);
    }
    const handleAdd = async (name) => {
        // const id = countries.length === 0 ? 1 : Math.max(...countries.map(country => country.id)) + 1;
        // const mutableCountries = [...countries].concat({ id: id, name: name, gold: 0, silver: 0, bronze: 0 });
        // setCountries(mutableCountries)
        // createNotification("Added Country", `${name} was added successfully!`);

        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name: name})
            });
            const successfulEntry = await res.json();
            setCountries([...countries, successfulEntry]);
            createNotification("Added Country", `Successfully added ${successfulEntry.name}!`);
        } catch (error) {
            createNotification("Action Failed", `Failed to add the country, ${name}. Please view the console for more details...`);
            console.error(error);
        }
    }
    const handleDelete = async (countryId) => {
        // const mutableCountries = [...countries].filter(c => c.id !== countryId);
        // setCountries(mutableCountries);
        // createNotification("Removed Country", `Successfully removed a country!`);

        try {
            await fetch(`${endpoint}/${countryId}`, {
                method: "DELETE"
            }).then(() => {
                setCountries([...countries.filter((c) => c.id !== countryId)]);
                createNotification("Removed Country", `Successfully removed the selected country!`);
            });
        } catch (error) {
            createNotification("Action Failed", `Failed to remove the country. Please view the console for more details...`);
            console.error(error);
        }
    }
    const handleIncrement = (countryId, medalName) => {
        // let cArr = [...countries];
        // const cid = cArr.findIndex(c => c.id === countryId);
        // cArr[cid][medalName] += 1;
        // setCountries(cArr);
        console.log("Not yet implemented...");
    }
    const handleDecrement = (countryId, medalName) => {
        // let cArr = [...countries];
        // const cid = cArr.findIndex(c => c.id === countryId);
        // cArr[cid][medalName] -= 1;
        // setCountries(cArr);
        console.log("Not yet implemented...");
    }
    const getAllMedalsTotal = () => {
        let sum = 0;
        medals.forEach(medal => { sum += countries.reduce((a, b) => a + b[medal.name], 0); });
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