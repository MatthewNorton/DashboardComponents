import { FlowObjectDataArray } from 'flow-component-model';
import * as React from 'react';
import { calculateValue } from './common-functions';
import './css/MenuBar.css';
import {MenuBar} from './MenuBar';

export class MenuBarItem extends React.Component<any, any> {

    subMenu: string = null;

    constructor(props: any) {
        super(props);
        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.triggerMenuItem = this.triggerMenuItem.bind(this);
    }

    // if the menuName key has a field name then it will be shown
    openMenu(fieldName: string) {
        this.subMenu = fieldName;
        this.forceUpdate();
    }

    closeMenu() {
        this.subMenu = null;
        this.forceUpdate();
    }

    triggerMenuItem(tenant: string, flowId: string, player: string, interactive: boolean) {
        if (interactive && interactive === true) {
            (this.props.parent as MenuBar).launchFlowTab(tenant, flowId, player, null);
        } else {
            (this.props.parent as MenuBar).launchFlowSilent(tenant, flowId, player, null);
        }
        this.closeMenu();
    }

    render() {
        let action: Function;
        let menuIcon: string = 'glyphicon glyphicon-triangle-bottom';

        switch (this.props.menuItem.properties.type.value.toUpperCase()) {
            case 'NAVIGATE':
                action = this.props.parent.openPage;
                break;

            case 'OPEN':
                action = this.props.parent.openTab;
                break;

            case 'FUNCTION':
                action = this.props.parent.executeFunction;
                break;

            case 'OUTCOME':
                action = this.props.parent.openOutcome;
                break;

            case 'MENU':
                action = this.openMenu;
                if (this.subMenu !== null) {
                    menuIcon = 'glyphicon glyphicon-triangle-top';
                    action = this.closeMenu;
                }
                break;

            case 'LABEL':
            default:
                break;
        }

        // prep any shown menus
        const SubMenus: JSX.Element[] = [];
        if (this.subMenu !== null) {
            const subMenuItems: FlowObjectDataArray = this.props.parent.fields[calculateValue(this.props.parent, this.props.menuItem.properties.value.value)].value;
            for (const item of subMenuItems.items) {
                SubMenus.push(
                            <div
                                className="menu-bar-sub-menu"
                            >
                                <span className={'glyphicon glyphicon-' + item.properties.icon.value} />
                                <span
                                    className={'menu-bar-menu'}
                                    title={item.properties.caption.value as string}
                                    onClick={() => this.triggerMenuItem(item.properties.tenant.value as string, item.properties.flow_id.value as string, item.properties.player.value as string, item.properties.interactive.value as boolean)}
                                >
                                    {item.properties.caption.value}
                                </span>
                            </div>,
                            );
            }
        }

        const hot = this.props.menuItem.properties.name.value === this.props.currentPage ? ' hot ' : '';
        let span: JSX.Element;
        switch (this.props.menuItem.properties.type.value.toUpperCase()) {
            case 'IMAGE':
                    span = (
                        <img className="menu-bar-image" src={calculateValue(this.props.parent, this.props.menuItem.properties.value.value)} />
                        );
                    break;

            case 'MENU':
                    span = (
                        <div>
                            <div
                                onClick={(e) => { action(calculateValue(this.props.parent, this.props.menuItem.properties.value.value)); }}
                                style={{whiteSpace: 'nowrap'}}
                            >
                                <span className={menuIcon} style={{color: '#ccc'}} />
                                <span
                                    className={'menu-bar-menu' + hot}
                                    title={this.props.menuItem.properties.label.value}
                                >
                                    {this.props.menuItem.properties.label.value}
                                </span>
                            </div>
                            <div
                                style={{position: 'absolute', zIndex: 1000, marginTop: '10px'}}
                            >
                                {SubMenus}
                            </div>

                        </div>
                    );
                    break;

            case 'OUTCOME':
            case 'FUNCTION':
            case 'OPEN':
            case 'NAVIGATE':

                    if (this.props.menuItem.properties.icon.value && this.props.menuItem.properties.icon.value.length > 0) {
                        span = (
                            <span
                                className={'glyphicon glyphicon-' + this.props.menuItem.properties.icon.value + hot + ' menu-bar-button'}
                                title={this.props.menuItem.properties.label.value}
                                onClick={() => action(calculateValue(this.props.parent, this.props.menuItem.properties.value.value))}
                             />
                            );
                    } else {
                        span = (
                            <span
                                className={'menu-bar-link' + hot} title={this.props.menuItem.properties.label.value}
                                onClick={() => action(calculateValue(this.props.parent, this.props.menuItem.properties.value.value))}
                            >
                                {this.props.menuItem.properties.label.value}
                            </span>
                            );
                    }
                    break;

            case 'LABEL':
            default:
                span = <span className={'menu-bar-label'}>{calculateValue(this.props.parent, this.props.menuItem.properties.label.value)}</span>;
        }
        return span;
    }

}
