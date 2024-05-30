const ToggleSwitch = () => {
    return (<>
        <label className="switch">
            <input type="checkbox"/>
            <div className="button">
                <div className="light"></div>
                <div className="dots"></div>
                <div className="characters"></div>
                <div className="shine"></div>
                <div className="shadow"></div>
            </div>
        </label>

    </>);
}

export default ToggleSwitch;