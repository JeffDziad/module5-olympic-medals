import React from 'react';
import Badge from 'react-bootstrap/Badge';
import { DashSquare, PlusSquare } from 'react-bootstrap-icons';

function Medal(props) {
    return (
        <React.Fragment>
            <div style={{ textTransform: "capitalize"}}>
                { props.medal.name } Medals
            </div>
            <div className="medal-count">
                <DashSquare
                    onClick={ () => props.country[props.medal.name] > 0 && props.onDecrement(props.country.id, props.medal.name) }
                    className="me-2 icon-btn" />
                <Badge bg="primary" text="light">
                    { props.country[props.medal.name] }
                </Badge>
                <PlusSquare
                    onClick={ () => props.onIncrement(props.country.id, props.medal.name) }
                    className="ms-2 icon-btn" />
            </div>
        </React.Fragment>
    );
}

export default Medal;
