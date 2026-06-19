import React, { useState } from 'react'

const useConfirm = (title, message) => {
    const [promise, setPromise] = useState(null)

    const confirm = () => new Promise((resolve, reject) => {
        setPromise({resolve});
    })

    const onConfirm = () => {
        promise?.resolve(true);
        setPromise(null);
    }

    const onCancel = () => {
        promise?.resolve(false);
        setPromise(null);
    }

    const ConfirmDialog = () => {
        if (promise === null) {return (<div></div>)}
        return (
            <div className="fixed top-0 left-0 z-1000 w-screen h-screen bg-black/25">
                <div className="w-full h-full absolute top-0 left-1/2 -translate-x-1/2 container flex align-middle justify-center">
                    <div className="card bg-base-100 h-fit w-fit sm:min-w-95 mx-5 my-auto">
                        <div className="card-body">
                            <h2 className="card-title">{title}</h2>
                            <p className='my-2'>{message}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary" onClick={onConfirm}>Ok</button>
                                <button className="btn btn-soft" onClick={onCancel}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return [ConfirmDialog, confirm];
}


export default useConfirm;