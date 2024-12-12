import { observer } from "mobx-react";
import React from "react";
import { useLocation, useParams } from "react-router-dom";


export const HomePage = observer(() => {
    const params = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchParamsArray = [...searchParams.entries()];
    return (
        <div>Home Page
            {searchParamsArray.length ? <div>, search params: {JSON.stringify(searchParamsArray)}</div> : ""}
            {Object.keys(params).length ? <div>, path params: {JSON.stringify(params)}</div> : ""}
        </div>
    );
});