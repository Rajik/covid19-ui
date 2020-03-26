import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import ReactLeafletSearch from "react-leaflet-search";
import LocateControl from "./LocateControl";

export default class SimpleExample extends Component {
    state = {
        lat: 51.505,
        lng: -0.09,
        zoom: 13,
    }

    render() {
        const position = [this.state.lat, this.state.lng];
        const locateOptions = {
            position: 'topright',
            strings: {
                title: 'Show me where I am, yo!'
            },
            onActivate: () => {} // callback before engine starts retrieving locations
        }
        const myPopup = (searchInfo) => {
            console.log(searchInfo);
            return (
                <Popup>
                    <div>
                        <p>{searchInfo.info}</p>
                        <button onClick={() => { console.log(`saving lat:${searchInfo.latLng.lat} lng:${searchInfo.latLng.lng}`)}}> + Add </button>
                    </div>
                </Popup>
            );
        };
        return (
            <div id="map">
                <Map center={position} zoom={this.state.zoom}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                    <ReactLeafletSearch position="topleft" popUp={myPopup} closeResultsOnClick={true}/>
                    <LocateControl options={locateOptions} startDirectly />
                </Map>
            </div>
        )
    }
}
