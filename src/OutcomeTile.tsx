import { FlowComponent } from 'flow-component-model';
import * as React from 'react';
import './css/OutcomeTile.css';

declare const manywho: any;

class OutcomeTile extends FlowComponent {

    constructor(props: any) {
        super(props);
        this.clicked = this.clicked.bind(this);
    }

    async clicked() {
        const outcome = this.getAttribute('outcome', null);
        if (outcome) {
            await this.triggerOutcome(outcome);
        }
    }

    render() {

        const label: string = this.getAttribute('title', 'Add title attribute');
        const icon: string = this.getAttribute('icon', 'add icon attribute');
        const tooltip: string = this.getAttribute('tooltip', label);
        return (
            <div
                className="outcome-tile"
                onClick={this.clicked}
                title={tooltip}
            >
                <span className="outcome-tile-label">{label}</span>
                <img className="outcome-tile-img" src={icon} />

            </div>
        );
    }
}

manywho.component.register('OutcomeTile', OutcomeTile);

export default OutcomeTile;
