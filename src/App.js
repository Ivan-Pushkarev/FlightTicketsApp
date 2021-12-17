import './Style.scss';
import airPlane from './Images/airplaneLogo.png';

import CheckBoxFilters from "./CheckBoxFilters";
import Ticket from "./TicketsList";
import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";


const URL = 'https://front-test.beta.aviasales.ru/search'
const initialStops = {
    all: false,
    none: false,
    one: false,
    two: false,
    three: false
}

function App() {
    const [list, setList] = useState([])
    const [showTickets, setShowTickets] = useState(5)
    const [sortOption, setSortOption] = useState('Cheapest')
    const [stops, setStops] = useState(initialStops)

    const fetchData= useCallback(async (URL) => {
       try {
           const searchId = await axios.get(URL)
           const response = await axios.get(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId.data.searchId}`)
           console.log(response.data)
           setList([...list, ...response.data.tickets])
       } catch {
           const repeat = window.confirm("Ошибка соединения с сервером! Хотите повторить попытку?")
           if(repeat) fetchData(URL);
       }
   },[])

    useEffect(() => {
            fetchData(URL).then(() => {
                console.log('data downloaded')
            })
        }, [fetchData]
    )
    // const fetchData = async (URL) => {
    //     try {
    //         const searchId = await axios.get(URL)
    //         const response = await axios.get(`https://front-test.beta.aviasales.ru/tickets?searchId=${searchId.data.searchId}`)
    //         console.log(response.data)
    //         setList([...list, ...response.data.tickets])
    //     } catch {
    //         const repeat = window.confirm("Ошибка соединения с сервером! Хотите повторить попытку?")
    //         if(repeat) fetchData(URL);
    //     }
    // }

    const filterByShowNumber = (el, i) => {
        return i < showTickets
    }

    const filterByStopsNumber = (flight) => {
        if (stops.all || stops.three || stops.two || stops.one || stops.none) {
            const allowedNumberOfStops = []
            if (stops.all) return true
            if (stops.three) allowedNumberOfStops.push(3)
            if (stops.two) allowedNumberOfStops.push(2)
            if (stops.one) allowedNumberOfStops.push(1)
            if (stops.none) allowedNumberOfStops.push(0)
            return allowedNumberOfStops.some(el=> el=== flight.segments[0].stops.length)
        } else return true
    }

    const ticketSort = (a, b) => {
        if (sortOption === 'Cheapest') {
            return a.price - b.price
        }
        if (sortOption === 'Fastest') {
            return a.segments[0].duration - b.segments[0].duration
        }
    }

    return (
        <div className="container py-5 text-center">
            <img src={airPlane} alt="airplane logo"/>
            <div className="row mt-5">
                <CheckBoxFilters stops={stops} setStops={setStops}/>
                <div className='col-6'>
                    <div className="sort-button-wrapper">
                        <button
                            className={sortOption === 'Cheapest' ? 'active' : ''}
                            onClick={() => setSortOption('Cheapest')}
                        >Самый дешевый
                        </button>
                        <button
                            className={sortOption === 'Fastest' ? 'active' : ''}
                            onClick={() => setSortOption('Fastest')}
                        >Самый быстрый
                        </button>
                    </div>
                    {
                        list.filter(filterByStopsNumber)
                            .sort(ticketSort)
                            .filter(filterByShowNumber)
                            .map(el =>
                                <Ticket
                                    key={el.carrier + el.price}
                                    ticket={el}
                                />)
                    }

                    <button
                        className='show-more'
                        onClick={() => setShowTickets(prev => prev + 5)}
                    >показать еще 5 билетов
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
