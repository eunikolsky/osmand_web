import GeneralInfoTab from "./components/tabs/GeneralInfoTab";
import ElevationTab from "./components/tabs/ElevationTab";
import SpeedTab from "./components/tabs/SpeedTab";
import React from "react";
import {Tab} from "@mui/material";
import PointsTab from "./components/tabs/PointsTab";

export default class TrackTabList {

    state = {
        tabs: null,
        tabList: [],
        defaultTab: 'general',
        graphWidth: 600
    };

    create(ctx) {
        let tabs = {};
        let list = [];

        const hasAltitude = ctx.selectedGpxFile?.analysis?.hasElevationData;
        const hasSpeed = ctx.selectedGpxFile?.analysis?.hasSpeedData;

        tabs.Info = <GeneralInfoTab key='general' width={this.state.graphWidth} srtm={false}/>;
        if (ctx.currentObjectType !== 'cloud_track') {
            tabs.Points = <PointsTab key='points' width={this.state.graphWidth}/>;
        }

        if (hasAltitude) {
            tabs.Elevation = <ElevationTab key='elevation' width={this.state.graphWidth} srtm={false}/>
        }

        if (hasSpeed) {
            tabs.Speed = <SpeedTab key='speed' width={this.state.graphWidth}/>;
        }

        if (ctx.selectedGpxFile?.analysis && ctx.selectedGpxFile.analysis.srtmAnalysis) {
            tabs.SRTM = <GeneralInfoTab key='srtm'
                                        width={this.state.graphWidth} srtm={true}/>;
            tabs["SRTM Ele"] = <ElevationTab key='srtmele' width={this.state.graphWidth} srtm={true}/>
        }

        list = list.concat(Object.keys(tabs).map((item, index) =>
            <Tab value={tabs[item].key + ''} label={item} key={'tab:' + item}/>));

        this.state.tabList = list;
        this.state.tabs = tabs;

        return this.state;
    }
}