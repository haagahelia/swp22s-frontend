import React from "react"

import Navbar from "../components/Navbar"
import Table from "../components/SignatureTable/Table"

export default function Signature({ orders }) {

    return (
        <div className="container">
            <Navbar />
            <h2>Signatures</h2>
            <Table orders={orders} />
        </div>
    )
}
