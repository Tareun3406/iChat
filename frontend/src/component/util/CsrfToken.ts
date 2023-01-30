import React from "react";

const CsrfToken = (setCsrf:   React.Dispatch<React.SetStateAction<string>>) => {
    fetch("/getCsrfTk")
        .then((response) => {
            return response.text();
        }).then((text) => {
            setCsrf(text);
    })
}

export default CsrfToken;