import React, {Component} from "react";
import DatePicker from './DatePicker';



export default class FilterElement extends Component{
    state = {};
     handleChangeFilterType = (e) => {
         this.props.tva.setFilterType(this.props.entityName, this.props.k, this.props.config[e.target.value], e.target.value)
     };
     handleChangeActive = (e) => {
         this.props.tva.setFilterActive(this.props.entityName, this.props.k, e.target.checked)
     };
     handleChangeCond = (e) => {
         this.props.tva.setFilterCond(this.props.entityName, this.props.k, e.target.value)
     };
     handleChangeValue = (e) => {
         //if(this.props.filter.variants){
         //    this.props.tva(this.props.k)
         //}else {
             this.props.tva.setFilterValue(this.props.entityName, this.props.k, this.props.filter.date ? e : e.target.value)
         //}
     };

    render(){

        let p = this.props;
        //let s = this.state;
        let f = p.filter;

        let value;
        let valueClass = 'filter-input'+((f.cond || f.date)?'':' wide');
        if(f.variants && f.variants.length>0){
            //console.log('value ', f.value, f.variants, f.variants[f.value]);
            let title = f.value;
            for(let v of f.variants){
                if(title === v.value){
                    title = v.name;
                    break;
                }
            }

            value = (
                <select ref="value"
                        onChange={this.handleChangeValue}
                        className={valueClass}
                        title={title}
                        value={f.value}>
                    {f.variants.map((i,k) =>
                        <option key={k} value={i.value}>{i.name}</option>)
                    }
                </select>
            )
        }else if(f.date){
            value =  <DatePicker className={valueClass}
                                 onChange={()=>{}}
                                 dpprops={{language:'ru', dateFormat: 'dd.mm.yy',onSelect:this.handleChangeValue}}
                                 value={f.value?f.value:' '}/>;
        }else{
            value =  <input ref="value"
                            onChange={this.handleChangeValue}
                            value={f.value?f.value:''}
                            className={valueClass}/>;
        }
        return (
            <div className="filter-container" title={f.name}>
                <input ref="active" type="checkbox" className="filter-on"
                       onChange={this.handleChangeActive} checked={!!f.active}/>
                <select ref='type' className="filter-type"
                        value={f.type}
                        onChange={this.handleChangeFilterType}>
                    {p.config.map((l, i) =>
                        <option key={i} value={i}>{l.name}</option>)
                    }
                </select>
                {(f.cond || f.date)?(
                    <select ref="condition"
                            value={f.cond}
                            onChange={this.handleChangeCond}
                            className="filter-condition">
                        <option key={0} value=">">{">"}</option>
                        <option key={1} value=">=">{">="}</option>
                        <option key={2} value="<">{"<"}</option>
                        <option key={3} value="<=">{"<="}</option>
                        <option key={4} value="=">{"="}</option>
                        <option key={5} value="<>">{"<>"}</option>
                    </select>
                ):''
                }
                {value}
            </div>
        )
    }
}