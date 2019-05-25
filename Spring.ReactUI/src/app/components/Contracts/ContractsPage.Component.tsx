import { ContractsViewModel } from "./ContractsPage.ViewModel";
import { observer } from "mobx-react";
import * as React from "react";

interface IContractsPageProps{
    title: string;
    vm: ContractsViewModel;
}

@observer
export class ContractsPageComponent extends React.Component<IContractsPageProps, {}>{
    vm: ContractsViewModel;

    constructor(props: IContractsPageProps){
        super(props);
        this.state = {};
        this.vm = this.props.vm;        
    }

    render(){
        return(
            <div>
                { this.vm.contract }
            </div>
        )
    }

    getContractsCallback = async() => {
        await this.props.vm.loadContracts();
    }
}