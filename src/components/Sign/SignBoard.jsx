import React, { useRef, useState } from "react"
import { useParams, useNavigate } from "react-router-dom";
import { base64ToBlob } from "../../utils/helpers";
import dao from "../../ajax/dao";
import { Button } from "@mui/material";

import SignaturePad from 'react-signature-canvas';

export default function SignBoard({ orders, setOrders, order }) {
    const sigPad = useRef({});
    const params = useParams()
    const navigate = useNavigate()
    const [prevSignature, setPrevSignature] = useState();

    const clearSig = () => {
        sigPad.current.clear();
        sigPad.current.on();
    };

    const saveSig = async () => {
        setPrevSignature(sigPad.current.toDataURL()); //saving the PNG signature image as a base64 string
        sigPad.current.off();

        const blob = await base64ToBlob(sigPad.current.toDataURL())
        const now = new Date()
        const selected = orders.find(x => x.uuid === order)
        const index = orders.findIndex(x => x.uuid === order)
        setOrders([
            ...orders.slice(0, index),
            { ...selected, pu_signed_at: now.toISOString(), pu_signature_image: sigPad.current.toDataURL().split(",")[1] },
            ...orders.slice(index + 1)
        ])
        sendToServer(blob);
        navigate("/")
    };

    //Function to send blob to server
    //Can separate function definition later in refactoring!

    const sendToServer = async (signatureBlob) => {
        console.log(signatureBlob);
        const formData = new FormData();
        formData.append('signature', signatureBlob);
        console.log(formData.get('signature'));
        try {
            const res = await dao.signOrder(params.orderId, formData)
            console.log(res.data);

            if (res.status === 201) {
                alert(
                    'Saved! Clear the canvas then check with the show last save function!'
                );
            }
        } catch (error) {
            console.error(error);
            alert(
                'Could not save the signature: ', error.message
            )

        }

    };

    const lastSig = () => {
        if (prevSignature === undefined) {
            alert('No signature has been saved!');
        } else {
            clearSig();
            sigPad.current.fromDataURL(prevSignature);
        }
    };


    return (
        <>
            <div className='sigCanvas'>
                <SignaturePad ref={sigPad} canvasProps={{ className: 'sigPad' }} />
            </div>
            <div>
                <div className='buttonGroup'>
                    <Button onClick={clearSig}>Clear</Button>
                    <Button onClick={saveSig}>Sign</Button>
                    <Button onClick={lastSig}>Show last save</Button>
                </div>
            </div>
        </>
    )
}
