import React from 'react';
import Badge from 'react-bootstrap/Badge';
import { DashSquare, PlusSquare } from 'react-bootstrap-icons';

function Medal(props) {
    return (
        <React.Fragment>
            <div style={{ textTransform: "capitalize"}}>
                {
                    ( props.country[props.medal.name].page_value !== props.country[props.medal.name].saved_value) ?
                        <span className="delta">{props.medal.name} Medals: </span>
                        :
                        <span>{props.medal.name} Medals</span>
                }
            </div>
            <div className="medal-count">
                <DashSquare
                    onClick={ () => props.country[props.medal.name].page_value > 0 && props.onDecrement(props.country.id, props.medal.name) }
                    className="me-2 icon-btn" />
                <Badge bg="primary" text="light">
                    {/* use medal count displayed in the web page for medal count totals */}
                    { props.country[props.medal.name].page_value }
                </Badge>
                <PlusSquare
                    onClick={ () => props.onIncrement(props.country.id, props.medal.name) }
                    className="ms-2 icon-btn" />
            </div>
        </React.Fragment>
    );
}

export default Medal;
