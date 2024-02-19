import Notif from "./Notif";
import {ToastContainer} from "react-bootstrap";

export default function NotifContainer(props) {

    return (
        <ToastContainer style={{padding: "10px"}} position="top-end">
            {props.notifications.map((n => <Notif key={n.id} title={n.title} message={n.message}/>))}
        </ToastContainer>
    );
}