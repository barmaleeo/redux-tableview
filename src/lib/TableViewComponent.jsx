import React, {Component} from 'react'
import './tableViewStyle.scss'
import FilterElement from "./FilterElement";

export default class TableViewComponent extends Component{

    currentDetail = 0;

    componentDidMount(){
        console.log(this.config.entity + ' did mount', this.props);
        if(this.props.init.init) {
            //this.props.tva.loadDetail({id:this.reload}, this.config.entity, this.config.root)
            this.reload();
        }
    }
    componentWillReceiveProps(p){
        console.log(this.config.entity + ' will receive props');

         if(!this.props.init.init && p.init.init){
             console.log('tableview Reload!!!');
             this.reload();
         }
    };
    componentWillMount(){
        console.log(this.config.entity + ' will mount', this.props);
    }
    componentWillUnmount(){
        console.log(this.config.entity + ' will unmount');
    }
    handleClickRow = (i,k) => {
        console.log(i,k);
        this.currentDetail = i.id;
        this.props.tva.loadDetail(i, this.config.entity, this.config.root)

    };
    reloadDetail = () => {
        if(this.props.tva) {
            this.props.tva.loadDetail({id: this.currentDetail}, this.config.entity, this.config.root)
        }
    };
    reload = () => {
        if(this.props.tva) {
            this.props.tva.reload(this.config.entity, this.props.entity.filters,
                this.props.entity.limit, this.config.root, this.props.loadParams)
        }
    };
    handleClickChecked = (n, checked, e) => {
        e.stopPropagation();
        this.props.tva.setChecked(this.config.entity, n, checked, this.config.root)

    };
    handleClickDummy = (e) => {
        e.stopPropagation();
    };
    getChecked = (idOnly) => {
        const items = [];
        for(const i of this.props.entity.items){
            if(i.checked){
                items.push(idOnly?i.id:i);
            }
        }
        return items;
    };
    getForAction = (n) => {
        if(n){
            return [n];
        }else{
            return this.getChecked(true)
        }

    };
    closeDetail = () =>{
        if(this.props.tva) {
            this.props.tva.closeDetail(this.config.entity, this.config.root)
        }
    };
    handleChangeLimit = (e) => {
        if(this.props.tva) {
            this.props.tva.changeLimit(this.config.entity, e.target.value, this.config.root)
        }
    };

    getDetailContent(e){
        return (
            <div className={'table-view-detail ' + this.props.className}>
                <div className="tv-header">
                    {typeof this.renderDetailHeader === "function" && this.renderDetailHeader()}
                    <button className="btn btn-default btn-sm"
                            onClick={this.closeDetail}>Закрыть</button>
                </div>
                <div className="tv-body">
                    {typeof this.renderDetails === "function" && this.renderDetails()}
                </div>
                {e.selectedItem && (e.selectedItem.loading || e.loadDetail) && <div className="tv-detail-progress"/>}
            </div>)

    }

    render(){
        const e = this.props.entity;
        if(e === undefined){
            return null;
        }
        if(e && e.showDetail){
            return this.getDetailContent(e)
        }
        const limit = (e.limit?e.limit:0);
        let checked = 0;
        for(const i of e.items) {
            checked += i.checked ? 1 : 0;
        }
        return(
            <div className={'table-view-outher ' + this.props.className}>
                {e.showCustom>0 && this.config.customMode !== 'tableTop' && this.renderCustom(e)}
                {(
                    !(e.showCustom > 0)
                    || this.config.customMode === 'stacked'
                    || this.config.customMode === 'tableTop')   &&

                    <div className="tv-o-main">

                        <div className="tv-table">
                            {e.showCustom > 0 && this.config.customMode === 'tableTop' && this.renderCustom(e)}
                            <div className="table-scroll">
                                <table className="table table-sm table-bordered table-condensed">
                                    <tbody>
                                    {e.items.map((i, k) => this.renderRow(i, k))}
                                    </tbody>
                                </table>
                                {e.loading && <div className="progress-loading-block abs">ЗАГРУЖАЕМ ДАННЫЕ</div>}
                            </div>
                        </div>
                        <div className="tv-right-panel">
                            <fieldset>
                                <legend>Лимит ({e.items.length} записей)</legend>
                                <input className="tv-rp-limit"
                                       onChange={this.handleChangeLimit}
                                       value={limit}/>
                            </fieldset>
                            <fieldset>
                                <legend>Выбрано ({checked} записей)</legend>
                                <div>
                                    <button className="btn btn-sm btn-primary"
                                            onClick={this.props.tva.setChecked.bind(this, this.config.entity, 0, true)}>
                                        выбрать все
                                    </button>
                                    <button className="btn btn-sm btn-primary"
                                            onClick={this.props.tva.setChecked.bind(this, this.config.entity, 0, false)}>
                                        отменить все
                                    </button>
                                </div>
                            </fieldset>
                            <fieldset>
                                <legend>Фильтры</legend>
                                {e.filters.map((f, k) => <FilterElement filter={f}
                                                                        entityName={this.config.entity}
                                                                        k={k}
                                                                        key={k}
                                                                        config={e.filterTypes}
                                                                        tva={this.props.tva}/>)}
                                <button className="btn btn-block btn-default"
                                        onClick={this.reload}>Обновить
                                </button>
                            </fieldset>
                            {this.renderActions &&
                            <fieldset>
                                <legend>Действия</legend>
                                {this.renderActions()}
                            </fieldset>
                            }
                        </div>
                    </div>
                }
            </div>
        )
    }
}