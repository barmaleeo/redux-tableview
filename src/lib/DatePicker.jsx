import React from 'react';

//import Moment from 'moment';

export default class DatePicker extends React.Component {
    componentDidMount () {
        if ( this.refs.datepicker.classList.contains ( 'hasDatePicker' ) ) return;

        window.$ ( this.refs.datepicker ).datepicker( {...this.props.dpprops} );
    }

    render () {
        return <input
            type="text"
            ref="datepicker"
            {...this.props}/>
    }
}
