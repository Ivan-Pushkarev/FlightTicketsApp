import React from 'react';
import checkBoxTrue from './Images/Checkbox.svg';
import checkBoxFalse from './Images/CheckboxFalse.svg';

function CheckBoxFilters(props) {

    const {stops, setStops} = props
    return (
        <div className='offset-2 col-3 d-flex justify-content-end'>
            <div className="filters-wrapper">
                <div className="title">колличество пересадок</div>
                <div className="filter" onClick={()=>setStops({...stops, all: !stops.all})}>
                    <img src={stops.all ? checkBoxTrue : checkBoxFalse} alt="check box"/>
                    <span>Все</span>
                </div>
                <div className="filter" onClick={()=>setStops({...stops, none: !stops.none})}>
                    <img src={stops.none ? checkBoxTrue : checkBoxFalse} alt="check box"/>
                    <span>Без пересадок</span>
                </div>
                <div className="filter" onClick={()=>setStops({...stops, one: !stops.one})}>
                    <img src={stops.one ? checkBoxTrue : checkBoxFalse} alt="check box"/>
                    <span>1 пересадка</span>
                </div>
                <div className="filter" onClick={()=>setStops({...stops, two: !stops.two})}>
                    <img src={stops.two ? checkBoxTrue : checkBoxFalse} alt="check box"/>
                    <span>2 пересадки</span>
                </div>
                <div className="filter" onClick={()=>setStops({...stops, three: !stops.three})}>
                    <img src={stops.three ? checkBoxTrue : checkBoxFalse} alt="check box"/>
                    <span>3 пересадки</span>
                </div>
            </div>
        </div>
    );
}

export default CheckBoxFilters;