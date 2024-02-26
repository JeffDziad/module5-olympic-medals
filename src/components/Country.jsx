import React from 'react';
import Medal from './Medal';
import { TrashFill, Save, ArrowCounterclockwise } from 'react-bootstrap-icons';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

function Country(props) {
    const { country, medals, onIncrement, onDecrement, onDelete, onSave, onReset } = props;
    const getMedalsTotal = (country, medals) => {
        let sum = 0;
        medals.forEach(medal => { sum += country[medal.name].page_value; });
        return sum;
    }
    const renderSaveButton = () => {
        let unsaved = false;
        medals.forEach(medal => {
            if (country[medal.name].page_value !== country[medal.name].saved_value) {
                unsaved = true;
            }
        });
        return unsaved;
    }
    return (
        <Card>
            <Card.Body>
                <Card.Title className="d-flex justify-content-between">
        <span>
        { props.country.name }
            <Badge bg="secondary" text="light" pill className="ms-2">
          { getMedalsTotal(props.country, props.medals) }
        </Badge>
        </span>
                    { renderSaveButton() ?
                        <React.Fragment>
                            <Save style={{cursor: "pointer"}} onClick={ () => onSave(country.id) }></Save>
                            <ArrowCounterclockwise style={{cursor: "pointer"}} onClick={ () => onReset(country.id) }>reset</ArrowCounterclockwise>
                        </React.Fragment>
                        :
                        <TrashFill onClick={() => onDelete(country.id)} className='icon-btn' style={{ color:'red' }} />
                    }
                </Card.Title>
                <ListGroup variant="flush">
                    { props.medals.map(medal =>
                        <ListGroup.Item className="d-flex justify-content-between" key={ medal.id }>
                            <Medal
                                country={ props.country }
                                medal={ medal }
                                onIncrement={ onIncrement }
                                onDecrement={ onDecrement } />
                        </ListGroup.Item>
                    ) }
                </ListGroup>
            </Card.Body>
        </Card>
    );
}

export default Country;
