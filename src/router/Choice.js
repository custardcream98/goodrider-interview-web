import React, { useState, useEffect } from "react";
import MyCard from "../components/MyCard";

function Choice() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const select = (index) => {
        setSelectedIndex(index);
    }

    return (
        <>
            <MyCard index={1} select={select}/>
            <MyCard index={2} select={select}/>
            <MyCard index={3} select={select}/>
            <MyCard index={4} select={select}/>
            <MyCard index={5} select={select}/>
            {selectedIndex}
        </>
    )
}

export default Choice;