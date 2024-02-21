import React from 'react';
import Medal from './Medal';
import { TrashFill } from 'react-bootstrap-icons';
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
                    {/* this will render save/reset buttons if the page/saved medal counts are not equal
          otherewise, the delete country button will be rendered */}
                    { renderSaveButton() ?
                        <React.Fragment>
                            {/* TODO: use Bootstrap stying / icons */}
                            <button onClick={ () => onSave(country.id) }>save</button>
                            <button onClick={ () => onReset(country.id) }>reset</button>
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
                                onIncrement={ props.onIncrement }
                                onDecrement={ props.onDecrement } />
                        </ListGroup.Item>
                    ) }
                </ListGroup>
            </Card.Body>
        </Card>
    );
}

export default Country;
