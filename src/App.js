import React, {useState} from 'react';
import Country from './components/Country';
import NewCountry from './components/NewCountry';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';
import NotifContainer from "./components/Notif/NotifContainer";

function App() {
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

    const [notifications, setNotifications] = useState([]);

    const createNotification = (title, message) => {
        setNotifications(prevState => [...prevState, {title: title, message: message}])
    }
    const handleAdd = (name) => {
        const id = countries.length === 0 ? 1 : Math.max(...countries.map(country => country.id)) + 1;
        const mutableCountries = [...countries].concat({ id: id, name: name, gold: 0, silver: 0, bronze: 0 });
        setCountries(mutableCountries)
        createNotification("Added Country", `${name} was added successfully!`);
    }
    const handleDelete = (countryId) => {
        const mutableCountries = [...countries].filter(c => c.id !== countryId);
        setCountries(mutableCountries);
        createNotification("Removed Country", `Successfully removed a country!`);

    }
    const handleIncrement = (countryId, medalName) => {
        let cArr = [...countries];
        const cid = cArr.findIndex(c => c.id === countryId);
        cArr[cid][medalName] += 1;
        setCountries(cArr);
    }
    const handleDecrement = (countryId, medalName) => {
        let cArr = [...countries];
        const cid = cArr.findIndex(c => c.id === countryId);
        cArr[cid][medalName] -= 1;
        setCountries(cArr);
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
                <Row>
                    { countries.map(country =>
                        <Col className="mt-3" key={ country.id }>
                            <Country
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