import React from 'react';
import s7Logo from './Images/S7Logo.png';
import EK from './Images/{EK}.png';
import EY from './Images/{EY}.png';
import FV from './Images/{FV}.png';
import MH from './Images/{MH}.png';
import SU from './Images/{SU}.png';
import TG from './Images/{TG}.png';

function Ticket(props) {
    const {ticket} = props
    const [firstFlight, returnFlight] = ticket.segments

    const companyLogo = (code) => {
        switch (code) {
            case 'EK': return EK;
            case 'EY': return EY;
            case 'FV': return FV;
            case 'MH': return MH;
            case 'SU': return SU;
            case 'TG': return TG;
            default: return s7Logo;
        }
    }

    const flightDuration = (time) => {
        const hours = Math.trunc( time/60)
        const minutes = time- hours * 60
        return `${hours}ч ${minutes}м`
    }

    const numberOfStops = (flight) => {
        if(!flight.stops.length) return 'Без пересадок'
        else if( flight.stops.length === 1) return `1 пересадка`
        else return `${flight.stops.length} пересадки`
    }

    const departureTime = (date) => {
        const departureDate = new Date(date)
        const hours = departureDate.getUTCHours()
        let minutes = departureDate.getUTCMinutes()
        if(minutes < 10 ) minutes = '0' + minutes
        return `${hours}:${minutes}`
    }

    const arrivingTime = (date, duration) => {
        const arrivingDate = new Date(Date.parse(date) + duration * 60 * 1000)
        const hours = arrivingDate.getUTCHours()
        let minutes = arrivingDate.getUTCMinutes()
        if(minutes < 10 ) minutes = '0' + minutes
        return `${hours}:${minutes}`
    }

    return (
        <div className='ticket'>
            <div className="ticket-header">
                <div className="ticket-price">
                    {ticket.price} P
                </div>
                <img src={companyLogo(ticket.carrier)} alt="s7 logo"/>
            </div>
            <div className="row">
                <div className="col-4 mt-2">
                    <div className="top-row">{firstFlight.origin}-{firstFlight.destination}</div>
                    <div className="bottom-row">{departureTime(firstFlight.date)} - {arrivingTime(firstFlight.date, firstFlight.duration )}</div>
                </div>
                <div className="col-4 mt-2">
                    <div className="top-row">в пути</div>
                    <div className="bottom-row">{flightDuration(firstFlight.duration)}</div>
                </div>
                <div className="col-4 mt-2">
                    <div className="top-row">{numberOfStops(firstFlight)}</div>
                    <div className="bottom-row">{firstFlight.stops.join(', ')}</div>
                </div>
                <div className="col-4 mt-2">
                    <div className="top-row">{returnFlight.origin}-{returnFlight.destination}</div>
                    <div className="bottom-row">{departureTime(returnFlight.date)} - {arrivingTime(returnFlight.date, returnFlight.duration )}</div>
                </div>
                <div className="col-4 mt-2">
                    <div className="top-row">в пути</div>
                    <div className="bottom-row">{flightDuration(returnFlight.duration)}</div>
                </div>
                <div className="col-4 mt-2">
                    <div className="top-row">{numberOfStops(returnFlight)}</div>
                    <div className="bottom-row">{returnFlight.stops.join(', ')}</div>
                </div>
            </div>
        </div>
    );
}

export default Ticket;