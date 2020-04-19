import React, { useState } from "react";
import PlacesAutocomplete, { geocodeByAddress } from "react-places-autocomplete";
import { Alert, Input,InputGroup, InputGroupAddon, InputGroupText, } from 'reactstrap';
import { distance } from '../../../utils';
import { GoogleApiWrapper } from "google-maps-react";

const RenderAddress = ({ maxDistance, ...props }) => {
    const { field, form: { setFieldValue, errors } } = props;
    const [address, setAddress] = useState("");

    const handleSelect = address => {
        geocodeByAddress(address).then(results => {
            setAddress(results[0].formatted_address)
            let { lat, lng } = results[0].geometry.location;
            lat = lat();
            lng = lng();
            const dist = { distance: distance(33.937217, -117.22578099999998, lat, lng).toFixed(2) }
            setFieldValue(field.name, { ...results[0], ...dist });
        })
            .catch(error => console.error(error));
    };

    return (
        <><h6 className="text-muted">Address</h6><PlacesAutocomplete
                style={{ width: "100%" }}
                value={address}
                onChange={(address) => setAddress(address)}
                onSelect={handleSelect}
            >
                {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading
                }) => (
                        <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                            <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="icon-magnifier" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                {...getInputProps({
                                    placeholder: "Enter Address ...",
                                    className: "location-search-input"
                                })}
                            /></InputGroup>
                            <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active
                                        ? "suggestion-item--active"
                                        : "suggestion-item";
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                        ? { backgroundColor: "#fafafa", cursor: "pointer" }
                                        : { backgroundColor: "#ffffff", cursor: "pointer" };
                                    return (
                                        <div
                                            {...getSuggestionItemProps(suggestion, {
                                                className,
                                                style
                                            })}
                                        >
                                            <span>{suggestion.description}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
            </PlacesAutocomplete>
            {errors[field.name] && <Alert color="danger">
                Address outside of {maxDistance} miles max delivery zone. 
                </Alert>
            }

        </>
    );
}


export default GoogleApiWrapper({ apiKey: process.env.REACT_APP_GOOGLE_API })(RenderAddress);
